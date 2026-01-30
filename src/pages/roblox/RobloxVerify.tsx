import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

type VerifyStep = 'input' | 'loading1' | 'avatar' | 'loading2' | 'summary' | 'loading3';

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
  const [avatarUrl, setAvatarUrl] = useState('');
  const [checkItems, setCheckItems] = useState<CheckItem[]>([
    { id: 'integrity', label: 'Account Integrity', checked: true },
    { id: 'region', label: 'Region Compatibility', checked: true },
    { id: 'chat', label: 'Chat Accessibility', checked: true },
    { id: 'restricted', label: 'Restricted Mode', checked: true },
  ]);
  
  // Modal states
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showInsufficientBalance, setShowInsufficientBalance] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerify = async () => {
    if (!userId) return;
    setAvatarUrl(`https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=420&height=420&format=png`);
    setStep('loading1');
  };

  const handleAvatarConfirm = (confirmed: boolean) => {
    if (confirmed) {
      setStep('loading2');
    } else {
      setStep('input');
      setUserId('');
    }
  };

  const toggleCheckItem = (id: string) => {
    setCheckItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleContinueSummary = () => {
    setStep('loading3');
  };

  const handleFinalLoadingComplete = () => {
    setShowCreditModal(true);
  };

  const handleUseCredits = () => {
    setShowInsufficientBalance(true);
  };

  const handleAddCredits = () => {
    setShowCreditModal(false);
    navigate('/modules/roblox/checkout', { 
      state: { ...location.state, userId } 
    });
  };

  const handleCancelModal = () => {
    setShowCreditModal(false);
    setShowInsufficientBalance(false);
  };

  // Input Step
  if (step === 'input') {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <PageHeader 
          title="Account Identification Required" 
          subtitle="Enter a valid Roblox User ID to proceed"
        />

        <div className="max-w-md mx-auto">
          <Panel>
            <p className="text-sm text-muted-foreground mb-6">
              To proceed, a valid Roblox User ID is required. This identifier will be 
              used only during the current session.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-label mb-2 block">Roblox User ID</label>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter numeric ID"
                  className="w-full bg-input border border-border rounded px-4 py-3 font-mono text-sm 
                           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50
                           placeholder:text-muted-foreground/50"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Numeric identifier only (e.g., 123456789)
                </p>
              </div>

              <button
                onClick={handleVerify}
                disabled={!userId}
                className="btn-cyber-solid w-full"
              >
                Verify Identifier
              </button>
            </div>
          </Panel>

          <Panel className="mt-4">
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• User ID is publicly accessible information</p>
              <p>• No credentials are required or stored</p>
              <p>• Session data is volatile and non-persistent</p>
            </div>
          </Panel>
        </div>
      </div>
    );
  }

  // Loading Phase 1
  if (step === 'loading1') {
    return (
      <div className="py-12 animate-fade-in-up">
        <LoadingPhase phase={1} onComplete={() => setStep('avatar')} />
      </div>
    );
  }

  // Avatar Confirmation
  if (step === 'avatar') {
    return (
      <div className="py-12 animate-fade-in-up">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-medium text-foreground mb-6">Character Confirmation</h2>
          
          <div className="avatar-frame w-48 h-48 mx-auto mb-6 bg-secondary">
            <img
              src={avatarUrl}
              alt="Roblox Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>

          <p className="text-muted-foreground mb-6">Is this your character?</p>

          <div className="flex gap-4 justify-center">
            <button onClick={() => handleAvatarConfirm(true)} className="btn-cyber-solid px-8">
              Yes, continue
            </button>
            <button onClick={() => handleAvatarConfirm(false)} className="btn-cyber px-8">
              No, cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading Phase 2
  if (step === 'loading2') {
    return (
      <div className="py-12 animate-fade-in-up">
        <LoadingPhase phase={2} onComplete={() => setStep('summary')} />
      </div>
    );
  }

  // Verification Summary with Checkboxes
  if (step === 'summary') {
    return (
      <div className="space-y-8 animate-fade-in-up">
        <PageHeader 
          title="Verification Summary" 
          subtitle="Review and confirm verification parameters"
        />

        <div className="max-w-md mx-auto">
          <Panel>
            <div className="space-y-4">
              {checkItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleCheckItem(item.id)}
                  className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-secondary/30 transition-colors"
                >
                  {item.checked ? (
                    <CheckSquare className="w-5 h-5 text-primary" />
                  ) : (
                    <Square className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className={item.checked ? 'text-foreground' : 'text-muted-foreground'}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="divider" />

            <button onClick={handleContinueSummary} className="btn-cyber-solid w-full">
              Continue
            </button>
          </Panel>
        </div>
      </div>
    );
  }

  // Loading Phase 3 - Final Execution
  if (step === 'loading3') {
    return (
      <>
        <div className="py-12 animate-fade-in-up">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium text-foreground mb-2">
                Preparing Execution
              </h2>
              <p className="text-sm text-muted-foreground">
                Finalizing session parameters...
              </p>
            </div>
            <TerminalLog 
              logs={finalExecutionLogs} 
              onComplete={handleFinalLoadingComplete} 
              speed={350} 
            />
          </div>
        </div>

        {/* Credit Modal */}
        <Dialog open={showCreditModal} onOpenChange={handleCancelModal}>
          <DialogContent className="border-primary/30 bg-background max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground text-lg">
                Action Requires Credits
              </DialogTitle>
              <DialogDescription className="text-muted-foreground pt-2">
                This action requires <span className="text-primary font-mono">10</span> credits to proceed.
                <br />
                Credits are consumed only for this session.
              </DialogDescription>
            </DialogHeader>

            {showInsufficientBalance && (
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 my-2">
                <p className="text-destructive text-sm font-medium">Insufficient balance</p>
                <p className="text-muted-foreground text-xs mt-1">
                  Available credits: <span className="font-mono">0</span>
                </p>
              </div>
            )}

            <DialogFooter className="flex gap-2 sm:gap-2">
              {!showInsufficientBalance ? (
                <>
                  <button onClick={handleCancelModal} className="btn-cyber px-6">
                    Cancel
                  </button>
                  <button onClick={handleUseCredits} className="btn-cyber-solid px-6">
                    Use Credits
                  </button>
                </>
              ) : (
                <button onClick={handleAddCredits} className="btn-cyber-solid w-full">
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
