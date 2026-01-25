import { useState, useEffect } from 'react';
import { Terminal, CheckCircle, Loader2 } from 'lucide-react';

interface AnalysisProgressProps {
  isOpen: boolean;
  gameName: string;
  accountId: string;
  onComplete: () => void;
}

const analysisSteps = [
  { text: 'Inicializando ambiente seguro…', duration: 800 },
  { text: 'Conectando aos módulos disponíveis…', duration: 1200 },
  { text: 'Validando integridade da conta…', duration: 1000 },
  { text: 'Sincronizando permissões…', duration: 1500 },
  { text: 'Consultando base de dados remota…', duration: 1300 },
  { text: 'Analisando compatibilidade de módulos…', duration: 1100 },
  { text: 'Detectando recursos disponíveis…', duration: 1400 },
  { text: 'Validando certificados de segurança…', duration: 900 },
  { text: 'Preparando desbloqueio…', duration: 1000 },
  { text: 'Finalizando análise…', duration: 600 },
];

export function AnalysisProgress({ isOpen, gameName, accountId, onComplete }: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setCompletedSteps([]);
      setProgress(0);
      return;
    }

    let stepIndex = 0;
    let totalDuration = 0;
    const totalTime = analysisSteps.reduce((acc, step) => acc + step.duration, 0);

    const runStep = () => {
      if (stepIndex >= analysisSteps.length) {
        onComplete();
        return;
      }

      setCurrentStep(stepIndex);
      const step = analysisSteps[stepIndex];
      totalDuration += step.duration;

      setTimeout(() => {
        setCompletedSteps(prev => [...prev, stepIndex]);
        setProgress(Math.round((totalDuration / totalTime) * 100));
        stepIndex++;
        runStep();
      }, step.duration);
    };

    runStep();
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg card-cyber p-6 animate-fade-in">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 animate-glow-pulse">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Análise em Andamento
            </h2>
            <p className="text-sm text-muted-foreground font-mono">
              {gameName} • ID: {accountId}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progresso</span>
            <span className="font-mono text-primary">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal logs */}
        <div className="bg-background/50 rounded-lg border border-border p-4 h-64 overflow-y-auto scrollbar-cyber">
          <div className="space-y-2">
            {analysisSteps.map((step, index) => {
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index && !isCompleted;

              return (
                <div
                  key={index}
                  className={`flex items-start gap-2 text-sm font-mono transition-all duration-300 ${
                    index > currentStep ? 'opacity-30' : 'opacity-100'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-4 w-4 text-secondary flex-shrink-0 mt-0.5" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5 animate-spin" />
                  ) : (
                    <span className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span className={`${
                    isCompleted ? 'text-secondary' : isCurrent ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    <span className="text-muted-foreground">[{String(index + 1).padStart(2, '0')}]</span>{' '}
                    {step.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4 font-mono">
          Não feche esta janela durante a análise
        </p>
      </div>
    </div>
  );
}
