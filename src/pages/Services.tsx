import { Panel, PageHeader } from '@/components/ui/cyber-elements';

export default function Services() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader 
        title="Services Overview" 
        subtitle="Operational capabilities available through this platform"
      />

      <Panel>
        <ul className="space-y-3 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-mono">•</span>
            Linux system analysis and environment structuring
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-mono">•</span>
            Network surface mapping and exposure evaluation
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-mono">•</span>
            Identification of common internet vulnerabilities
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-mono">•</span>
            Software-level risk analysis and isolation strategies
          </li>
        </ul>
        
        <div className="mt-6 pt-4 border-t border-border/30">
          <p className="text-sm text-muted-foreground/80">
            All services focus on understanding how systems behave in real-world
            internet conditions — not theory, but execution.
          </p>
        </div>
      </Panel>
    </div>
  );
}
