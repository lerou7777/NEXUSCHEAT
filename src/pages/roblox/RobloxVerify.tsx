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
  const navigate = useNavigate();

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

  // ===============================
  // 🔍 VERIFY USER (AVATAR OPCIONAL)
  // ===============================
  const handleVerify = async () => {
    if (!userId) return;

    setStep('loading1');

    const API_URL = import.meta.env.VITE_API_URL;

    if (!API_URL) {
      console.error('❌ VITE_API_URL não definida');
      setAvatarUrl(null);
      setStep('loading2');
      return;
    }

    const requestUrl = `${API_URL}/avatar/${userId}`;
    console.log('🔍 Avatar request:', requestUrl);

    try {
      const res = await fetch(requestUrl);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();

      if (data?.avatarUrl) {
        setAvatarUrl(data.avatarUrl);
        setStep('avatar'); // mostra avatar
        return;
      }
    } catch (error) {
      console.warn('⚠️ Avatar opcional, seguindo fluxo:', error);
      setAvatarUrl(null);
    }

    // 🚀 SEMPRE CONTINUA
    setStep('loading2');
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
    return <LoadingPhase phase={1} />;
  }

  // ===============================
  // 🧍 AVATAR (OPCIONAL)
  // ===============================
  if (step === 'avatar') {
    return (
      <div className="py-12 text-center">
        {avatarUrl ? (
          <div className="w-48 h-48 mx-auto mb-6 overflow-hidden rounded bg-secondary">
            <img
              src={avatarUrl}
              alt="Roblox Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-48 h-48 mx-auto mb-6 flex items-center justify-center rounded bg-secondary">
            <span className="text-sm opacity-70">
              Avatar unavailable
            </span>
          </div>
        )}

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
      <LoadingPhase
        phase={2}
        onComplete={() => setStep('summary')}
      />
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
  // ⏳ FINAL EXECUTION → PAGAMENTO
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
                      state: { userId, avatarUrl },
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
