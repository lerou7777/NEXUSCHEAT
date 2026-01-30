import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel, PageHeader } from '@/components/ui/cyber-elements';
import { LoadingPhase, TerminalLog } from '@/components/TerminalLog';
import { CheckSquare, Square } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

type VerifyStep =
  | 'input'
  | 'loading1'
  | 'avatar'
  | 'loading2'
  | 'summary'
  | 'loading3';

interface CheckItem {
  id: string;
  label: string;
  checked: boolean;
}

const finalExecutionLogs = [
  'Applying final execution parameters…',
  'Confirming selected flags…',
  'Stabilizing session context…',
  'Execution window prepared.',
];

export default function RobloxVerify() {
  const [step, setStep] = useState<VerifyStep>('input');
  const [userId, setUserId] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [checkItems, setCheckItems] = useState<CheckItem[]>([
    { id: 'integrity', label: 'Account Integrity', checked: true },
    { id: 'region', label: 'Region Compatibility', checked: true },
    { id: 'chat', label: 'Chat Accessibility', checked: true },
    { id: 'restricted', label: 'Restricted Mode', checked: true },
  ]);

  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showInsufficientBalance, setShowInsufficientBalance] =
    useState(false);

  const navigate = useNavigate();

  // ===============================
  // 🔍 VERIFY USER (BACKEND)
  // ===============================
  const handleVerify = async () => {
    if (!userId) return;

    setStep('loading1');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/avatar/${userId}`
      );

      if (!res.ok) {
        throw new Error('Request failed');
      }

      const data = await res.json();

      // ✅ backend retorna avatarUrl
      if (data.avatarUrl) {
        setAvatarUrl(data.avatarUrl);
        setStep('avatar');
      } else {
        // ⚠️ se não vier avatar, segue fluxo
        setAvatarUrl(null);
        setStep('loading2');
      }
    } catch (err) {
      console.error('Avatar error:', err);
      // ⚠️ erro NÃO trava o fluxo
      setAvatarUrl(null);
      setStep('loading2');
    }
  };

  // ===============================
  // 🧍 AVATAR CONFIRMATION
  // ===============================
  const handleAvatarConfirm = (confirmed: boolean) => {
    if (confirmed) {
      setStep('loading2');
    } else {
      setUserId('');
      setAvatarUrl(null);
      setStep('input');
    }
  };

  const toggleCheckItem = (id: string) => {
    setCheckItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // ===============================
  // 🧾 INPUT
  // ===============================
  if (step === 'input') {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <PageHeader
          title="Account Identification Required"
          subtitle="Enter a valid Roblox User ID to proceed"
        />

        <div className="max-w-md mx-auto">
          <Panel>
            <label className="text-label mb-2 block">
              Roblox User ID
            </label>

            <input
              type="text"
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value.replace(/\D/g, ''))
              }
              placeholder="Numeric ID only"
              className="w-full bg-input border border-border rounded px-4 py-3 font-mono text-sm"
            />

            <button
              onClick={handleVerify}
              disabled={!userId}
              className="btn-cyber-solid w-full mt-4"
            >
              Verify Identifier
            </button>
          </Panel>
        </div>
      </div>
    );
  }

  // ===============================
  // ⏳ LOADING 1
  // ===============================
  if (step === 'loading1') {
    return (
      <div className="py-12">
        <LoadingPhase phase={1} />
      </div>
    );
  }

  // ===============================
  // 🧍 AVATAR
  // ===============================
  if (step === 'avatar' && avatarUrl) {
    return (
      <div className="py-12 text-center">
        <div className="avatar-frame w-48 h-48 mx-auto mb-6 bg-secondary overflow-hidden">
          <img
            src={avatarUrl}
            alt="Roblox Avatar"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="mb-4">Is this your character?</p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleAvatarConfirm(true)}
            className="btn-cyber-solid"
          >
            Yes, continue
          </button>
          <button
            onClick={() => handleAvatarConfirm(false)}
            className="btn-cyber"
          >
            No, cancel
          </button>
        </div>
      </div>
    );
  }

  // ===============================
  // ⏳ LOADING 2
  // ===============================
  if (step === 'loading2') {
    return (
      <div className="py-12">
        <LoadingPhase
          phase={2}
          onComplete={() => setStep('summary')}
        />
      </div>
    );
  }

  // ===============================
  // 📋 SUMMARY
  // ===============================
  if (step === 'summary') {
    return (
      <div className="max-w-md mx-auto">
        <Panel>
          {checkItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleCheckItem(item.id)}
              className="flex gap-3 items-center cursor-pointer"
            >
              {item.checked ? (
                <CheckSquare className="text-primary" />
              ) : (
                <Square />
              )}
              <span>{item.label}</span>
            </div>
          ))}

          <button
            onClick={() => setStep('loading3')}
            className="btn-cyber-solid w-full mt-6"
          >
            Continue
          </button>
        </Panel>
      </div>
    );
  }

  // ===============================
  // ⏳ FINAL EXECUTION
  // ===============================
  if (step === 'loading3') {
    return (
      <>
        <TerminalLog
          logs={finalExecutionLogs}
          onComplete={() => setShowCreditModal(true)}
        />

        <Dialog open={showCreditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Credits Required</DialogTitle>
              <DialogDescription>
                This action requires 10 credits.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              {!showInsufficientBalance ? (
                <>
                  <button
                    onClick={() => setShowCreditModal(false)}
                    className="btn-cyber"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowInsufficientBalance(true)}
                    className="btn-cyber-solid"
                  >
                    Use Credits
                  </button>
                </>
              ) : (
                <button
                  onClick={() =>
                    navigate('/modules/roblox/checkout', {
                      state: {
                        userId,
                        avatarUrl,
                      },
                    })
                  }
                  className="btn-cyber-solid w-full"
                >
                  Add Credits
                </button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return null;
}
