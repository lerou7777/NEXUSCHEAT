import { useState, useEffect, useCallback } from 'react';

interface TerminalLogProps {
  logs: string[];
  onComplete?: () => void;
  speed?: number;
}

export function TerminalLog({ logs, onComplete, speed = 400 }: TerminalLogProps) {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < logs.length) {
      const timer = setTimeout(() => {
        setDisplayedLogs(prev => [...prev, logs[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, speed + Math.random() * 300);

      return () => clearTimeout(timer);
    } else if (currentIndex === logs.length && onComplete) {
      const completeTimer = setTimeout(onComplete, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [currentIndex, logs, onComplete, speed]);

  const getLogClass = (log: string) => {
    if (log.toLowerCase().includes('warning') || log.toLowerCase().includes('adaptive')) {
      return 'warning';
    }
    if (log.toLowerCase().includes('success') || log.toLowerCase().includes('complete')) {
      return 'success';
    }
    return '';
  };

  return (
    <div className="bg-secondary/30 rounded-lg p-4 font-mono text-xs space-y-1.5 min-h-[200px]">
      <div className="flex items-center gap-2 text-muted-foreground mb-3">
        <span className="w-2 h-2 rounded-full bg-status-online animate-pulse" />
        <span>Terminal Output</span>
      </div>
      {displayedLogs.map((log, index) => (
        <div 
          key={index} 
          className={`terminal-log-line ${getLogClass(log)} animate-fade-in-up`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <span className="text-primary mr-2">›</span>
          {log}
        </div>
      ))}
      {currentIndex < logs.length && (
        <div className="terminal-log-line flex items-center">
          <span className="text-primary mr-2">›</span>
          <span className="w-2 h-4 bg-primary animate-terminal-blink" />
        </div>
      )}
    </div>
  );
}

interface LoadingPhaseProps {
  phase: 1 | 2;
  onComplete: () => void;
}

const phase1Logs = [
  'Initializing session…',
  'Forwarding request to module…',
  'Resolving account reference…',
  'Fetching public avatar data…',
  'Synchronizing response…',
  'Session established.',
];

const phase2Logs = [
  'Reinitializing session layer…',
  'Adjusting execution parameters…',
  'Monitoring response latency…',
  'Warning: adaptive timing enabled…',
  'Synchronizing secondary modules…',
  'Validating account integrity…',
  'Checking region compatibility…',
  'Analyzing chat accessibility…',
  'Scanning restriction indicators…',
  'Warning: verification depth increased…',
  'Processing final validation…',
  'Analysis complete.',
];

export function LoadingPhase({ phase, onComplete }: LoadingPhaseProps) {
  const logs = phase === 1 ? phase1Logs : phase2Logs;
  const speed = phase === 1 ? 400 : 600;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-lg font-medium text-foreground mb-2">
          {phase === 1 ? 'Establishing Connection' : 'Analyzing Account'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {phase === 1 
            ? 'Please wait while we establish a secure session...' 
            : 'Performing comprehensive account analysis...'}
        </p>
      </div>
      <TerminalLog logs={logs} onComplete={onComplete} speed={speed} />
    </div>
  );
}
