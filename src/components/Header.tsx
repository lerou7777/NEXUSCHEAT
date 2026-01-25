import { Wallet, Plus, Shield, Zap } from 'lucide-react';
interface HeaderProps {
  credits: number;
  onAddCredits: () => void;
}
export function Header({
  credits,
  onAddCredits
}: HeaderProps) {
  return <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-primary" />
            <Zap className="absolute -bottom-1 -right-1 h-4 w-4 text-secondary" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-gradient-cyber">
              ​nexusCheat
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              v2.4.1 • Secure
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted/50 border border-border">
            <Wallet className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Créditos:</span>
            <span className="font-mono font-bold text-primary text-lg">
              {credits}
            </span>
          </div>

          <button onClick={onAddCredits} className="flex items-center gap-2 btn-cyber-secondary text-sm py-2">
            <Plus className="h-4 w-4" />
            Adicionar saldo
          </button>
        </div>
      </div>
    </header>;
}