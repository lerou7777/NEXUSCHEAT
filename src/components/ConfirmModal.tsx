import { Coins, Lock } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  credits: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ isOpen, credits, onConfirm, onCancel }: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-sm card-cyber p-6 animate-fade-in">
        <div className="text-center mb-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/30 mb-4">
            <Lock className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground mb-2">
            Confirmar operação
          </h2>
          <p className="text-sm text-muted-foreground">
            Para concluir o desbloqueio será necessário utilizar <span className="font-bold text-primary">{credits} créditos</span> do sistema.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-muted/30 border border-border/50 rounded-lg p-4 mb-6">
          <Coins className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            Os créditos serão debitados imediatamente após a confirmação.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 btn-cyber-primary"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
