import { useState } from 'react';
import { X, Search, AlertCircle } from 'lucide-react';

interface AnalysisModalProps {
  isOpen: boolean;
  gameName: string;
  onClose: () => void;
  onStartAnalysis: (accountId: string) => void;
}

export function AnalysisModal({ isOpen, gameName, onClose, onStartAnalysis }: AnalysisModalProps) {
  const [accountId, setAccountId] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountId.trim()) {
      setError('Digite o ID da conta para continuar');
      return;
    }
    setError('');
    onStartAnalysis(accountId.trim());
    setAccountId('');
  };

  const handleClose = () => {
    setAccountId('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md card-cyber p-6 animate-fade-in border-primary/30">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 rounded-lg hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Análise Técnica
            </h2>
            <p className="text-sm text-muted-foreground">{gameName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="accountId" className="block text-sm font-medium text-foreground mb-2">
              ID da Conta
            </label>
            <input
              type="text"
              id="accountId"
              value={accountId}
              onChange={(e) => {
                setAccountId(e.target.value);
                if (error) setError('');
              }}
              placeholder="Insira o ID da conta"
              className="w-full px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 font-mono transition-all"
            />
            <p className="text-xs text-muted-foreground mt-2">
              O ID é utilizado apenas para análise automatizada do sistema.
            </p>
            {error && (
              <div className="flex items-center gap-2 mt-2 text-destructive text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn-cyber-primary"
          >
            Executar análise
          </button>
        </form>
      </div>
    </div>
  );
}
