import { Panel, PageHeader } from '@/components/ui/cyber-elements';

export default function About() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader 
        title="About This Platform" 
        subtitle="Technical documentation and operational context"
      />

      <Panel>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            NEXUS is a software-oriented platform focused on Linux-based systems,
            network architecture, and internet-facing infrastructure.
          </p>
          <p>
            We study how modern software communicates, where systems fail,
            and how vulnerabilities emerge across public networks.
          </p>
          <p>
            Our approach is technical, minimal, and system-driven —
            built for environments where reliability, isolation, and control matter.
          </p>
        </div>
      </Panel>
    </div>
  );
}
