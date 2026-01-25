import { AlertCircle, Wallet } from 'lucide-react';

interface InsufficientCreditsModalProps {
  isOpen: boolean;
  onAddCredits: () => void;
  onClose: () => void;
}

export function InsufficientCreditsModal({ isOpen, onAddCredits, onClose }: InsufficientCreditsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm card-cyber p-6 animate-fade-in border-destructive/30">
        <div className="text-center mb-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 border border-destructive/30 mb-4">
            <AlertCircle className="h-7 w-7 text-destructive" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            Saldo insuficiente
          </h2>
          <p className="text-sm text-muted-foreground">
            Sua conta não possui créditos suficientes para concluir o desbloqueio no momento.
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-center text-muted-foreground">
            <span className="font-semibold text-foreground">Recarregue agora</span> para liberar imediatamente os módulos disponíveis.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onAddCredits}
            className="flex-1 btn-cyber-secondary flex items-center justify-center gap-2"
          >
            <Wallet className="h-4 w-4" />
            Adicionar saldo via PIX
          </button>
        </div>
      </div>
    </div>
  );
}
