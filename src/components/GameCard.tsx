import { Gamepad2, Target, Flame, Crosshair, Crown } from 'lucide-react';
import { ReactNode } from 'react';

interface GameCardProps {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  status: 'online' | 'stable';
  onSelect: (id: string, name: string) => void;
}

const gameIcons: Record<string, ReactNode> = {
  roblox: <Gamepad2 className="h-8 w-8" />,
  pubg: <Target className="h-8 w-8" />,
  freefire: <Flame className="h-8 w-8" />,
  codmobile: <Crosshair className="h-8 w-8" />,
  clashroyale: <Crown className="h-8 w-8" />,
};

export function GameCard({ id, name, description, status, onSelect }: GameCardProps) {
  return (
    <button
      onClick={() => onSelect(id, name)}
      className="group relative w-full text-left card-cyber p-6 transition-all duration-300 hover:border-primary/50 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted border border-border text-primary group-hover:glow-cyan transition-all duration-300">
          {gameIcons[id]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded-full ${
              status === 'online' 
                ? 'bg-secondary/10 text-secondary border border-secondary/30' 
                : 'bg-primary/10 text-primary border border-primary/30'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                status === 'online' ? 'bg-secondary animate-pulse' : 'bg-primary'
              }`} />
              {status === 'online' ? 'Online' : 'Estável'}
            </span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      <div className="relative mt-4 pt-4 border-t border-border/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>Módulos: 12 ativos</span>
          <span className="text-primary">Iniciar análise →</span>
        </div>
      </div>
    </button>
  );
}
