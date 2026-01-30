import { ReactNode } from 'react';

interface StatusIndicatorProps {
  status: 'online' | 'medium' | 'offline' | 'low';
  label?: string;
  showDot?: boolean;
}

export function StatusIndicator({ status, label, showDot = true }: StatusIndicatorProps) {
  const statusLabels: Record<string, string> = {
    online: 'Active',
    medium: 'Medium',
    offline: 'Unstable',
    low: 'Low',
  };

  const dotClass = {
    online: 'status-dot-online',
    medium: 'status-dot-medium',
    offline: 'status-dot-offline',
    low: 'status-dot-low',
  }[status];

  const textClass = {
    online: 'text-status-online',
    medium: 'text-status-medium',
    offline: 'text-status-offline',
    low: 'text-status-low',
  }[status];

  return (
    <div className="flex items-center gap-2">
      {showDot && <span className={dotClass} />}
      <span className={`font-mono text-xs ${textClass}`}>
        {label || statusLabels[status]}
      </span>
    </div>
  );
}

interface PanelProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function Panel({ children, className = '', glow = false }: PanelProps) {
  return (
    <div className={`${glow ? 'panel-glow' : 'panel'} ${className}`}>
      {children}
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

export function InfoRow({ label, value, mono = true }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-border/30 last:border-0">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className={`text-sm ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
}

export function SectionTitle({ children, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-foreground">{children}</h2>
      {subtitle && (
        <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
      )}
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-semibold text-foreground tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-muted-foreground mt-2 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}
