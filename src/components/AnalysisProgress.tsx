import { useEffect, useState } from 'react';
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
  {
    text: 'Validando integridade da conta…',
    duration: 1200,
    alert: true, // 🔴
  },
  { text: 'Sincronizando permissões…', duration: 1500 },
  { text: 'Consultando base de dados remota…', duration: 1300 },
  {
    text: 'Verificando restrições de acesso…',
    duration: 1400,
    alert: true, // 🔴
  },
  { text: 'Detectando recursos disponíveis…', duration: 1400 },
  { text: 'Validando certificados de segurança…', duration: 900 },
  { text: 'Preparando desbloqueio…', duration: 1000 },
  { text: 'Finalizando análise…', duration: 600 },
];

export function AnalysisProgress({
  isOpen,
  gameName,
  accountId,
  onComplete,
}: AnalysisProgressProps) {
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
    let elapsedTime = 0;

    const totalTime = analysisSteps.reduce(
      (acc, step) => acc + step.duration,
      0
    );

    const runStep = () => {
      if (stepIndex >= analysisSteps.length) {
        // 🎬 trava cinematográfica em 92%
        setProgress(92);
        setTimeout(() => {
          setProgress(100);
          setTimeout(onComplete, 400);
        }, 1000);
        return;
      }

      const step = analysisSteps[stepIndex];
      setCurrentStep(stepIndex);

      const extraDelay = step.alert ? 300 : 0; // 🐢 tensão sutil
      elapsedTime += step.duration;

      setTimeout(() => {
        setCompletedSteps(prev => [...prev, stepIndex]);

        const calculatedProgress = Math.round(
          (elapsedTime / totalTime) * 100
        );

        setProgress(prev =>
          calculatedProgress > prev ? calculatedProgress : prev
        );

        stepIndex++;
        runStep();
      }, step.duration + extraDelay);
    };

    runStep();
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg card-cyber p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted border border-border">
            <Terminal className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Análise em andamento
            </h2>
            <p className="text-sm text-muted-foreground font-mono">
              {gameName} • ID: {accountId}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Progresso</span>
            <span className="font-mono text-foreground">{progress}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground/80 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Logs */}
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
                    <CheckCircle className="h-4 w-4 text-foreground mt-0.5" />
                  ) : isCurrent ? (
                    <Loader2 className="h-4 w-4 text-foreground mt-0.5 animate-spin" />
                  ) : (
                    <span className="w-4 h-4" />
                  )}

                  <span
                    className={
                      step.alert && (isCompleted || isCurrent)
                        ? 'text-red-500'
                        : isCompleted || isCurrent
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }
                  >
                    <span className="text-muted-foreground">
                      [{String(index + 1).padStart(2, '0')}]
                    </span>{' '}
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
