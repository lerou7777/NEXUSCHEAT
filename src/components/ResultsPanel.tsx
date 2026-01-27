import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle,
  Shield,
  Globe,
  Server,
  Cpu,
  Unlock,
} from 'lucide-react';

interface ResultsPanelProps {
  isOpen: boolean;
  gameName: string;
  accountId: string;
  onUnlock: () => void;
  onClose: () => void;
}

export function ResultsPanel({
  isOpen,
  gameName,
  accountId,
  onUnlock,
  onClose,
}: ResultsPanelProps) {
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  // ✅ Avatar via BACKEND (sem CORS, sem Roblox direto)
  const avatarUrl = useMemo(() => {
    if (!accountId) return '';
    return `https://folly-backend-2.onrender.com/avatar/${accountId}?t=${Date.now()}`;
  }, [accountId]);

  // 🧠 loading fake (UX + sensação de análise real)
  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    setImgError(false);

    const delay = 3000 + Math.random() * 2000; // 3–5s
    const timer = setTimeout(() => {
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [isOpen, accountId]);

  if (!isOpen) return null;

  const results = [
    {
      icon: Server,
      label: 'Integridade',
      value: 'Restrições de chat detectadas • 04/01/2026',
      color: 'text-red-500', // 🔴 alerta controlado
    },
    {
      icon: Shield,
      label: 'Compatibilidade',
      value: 'Confirmada',
      color: 'text-foreground',
    },
    {
      icon: Globe,
      label: 'Região',
      value: 'Brasil (55+)',
      color: 'text-foreground',
    },
    {
      icon: Cpu,
      label: 'Módulos',
      value: 'Disponíveis',
      color: 'text-foreground',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg card-cyber p-6 animate-fade-in border-border">
        {/* Header */}
        <div className="text-center mb-6">
          {/* Avatar */}
          <div
            className="
              mx-auto mb-6
              h-48 w-48
              rounded-lg
              border-2 border-border
              bg-muted
              flex items-center justify-center
              shadow-sm
              overflow-hidden
            "
          >
            {loading && (
              <span className="text-xs text-muted-foreground animate-pulse">
                Analisando personagem…
              </span>
            )}

            {!loading && !imgError && (
              <img
                src={avatarUrl}
                alt="Avatar do jogador"
                className="h-full w-full object-contain"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
              />
            )}

            {!loading && imgError && (
              <span className="text-xs text-muted-foreground text-center px-4">
                Personagem indisponível no momento
              </span>
            )}
          </div>

          {/* Status */}
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-muted border border-border mb-3">
            <CheckCircle className="h-7 w-7 text-foreground" />
          </div>

          <h2 className="text-xl font-bold text-foreground">
            Análise concluída
          </h2>

          <p className="text-sm text-muted-foreground mt-1">
            {gameName} •{' '}
            <span className="font-mono text-foreground">
              {accountId}
            </span>
          </p>
        </div>

        {/* Info */}
        <div className="bg-muted/40 border border-border rounded-lg p-4 mb-6">
          <p className="text-sm text-foreground text-center">
            A conta analisada é compatível com os módulos disponíveis
            e está pronta para a remoção de restrições.
          </p>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {results.map((result, index) => (
            <div
              key={index}
              className="bg-muted/30 border border-border rounded-lg p-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <result.icon className={`h-4 w-4 ${result.color}`} />
                <span className="text-xs text-muted-foreground">
                  {result.label}
                </span>
              </div>
              <p className={`text-sm font-semibold ${result.color}`}>
                {result.value}
              </p>
            </div>
          ))}
        </div>

        {/* Ações */}
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
            Remover restrição
          </button>
        </div>
      </div>
    </div>
  );
}
