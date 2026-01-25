import { CheckCircle, Shield, Globe, Server, Cpu, Unlock } from 'lucide-react';

interface ResultsPanelProps {
  isOpen: boolean;
  gameName: string;
  accountId: string;
  onUnlock: () => void;
  onClose: () => void;
}

export function ResultsPanel({ isOpen, gameName, accountId, onUnlock, onClose }: ResultsPanelProps) {
  if (!isOpen) return null;

  const results = [
    { icon: Server, label: 'Integridade', value: 'Estável', color: 'text-secondary' },
    { icon: Shield, label: 'Compatibilidade', value: 'Confirmada', color: 'text-secondary' },
    { icon: Globe, label: 'Região', value: 'Global', color: 'text-primary' },
    { icon: Cpu, label: 'Módulos', value: 'Disponíveis', color: 'text-primary' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg card-cyber p-6 animate-fade-in border-secondary/30">
        {/* Success header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 border border-secondary/30 mb-4 glow-green">
            <CheckCircle className="h-8 w-8 text-secondary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Análise concluída com sucesso
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {gameName} • <span className="font-mono text-primary">{accountId}</span>
          </p>
        </div>

        {/* Info box */}
        <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground text-center">
            Sua conta é compatível com os módulos selecionados e está pronta para desbloqueio.
          </p>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-muted/30 border border-border/50 rounded-lg p-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <result.icon className={`h-4 w-4 ${result.color}`} />
                <span className="text-xs text-muted-foreground">{result.label}</span>
              </div>
              <p className={`text-sm font-semibold ${result.color}`}>
                {result.value}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onUnlock}
            className="flex-1 btn-cyber-primary flex items-center justify-center gap-2"
          >
            <Unlock className="h-4 w-4" />
            Finalizar desbloqueio
          </button>
        </div>
      </div>
    </div>
  );
}
