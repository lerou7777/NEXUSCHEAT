import { Panel, InfoRow, PageHeader, SectionTitle } from '@/components/ui/cyber-elements';

const environmentData = [
  { label: 'Runtime Layer', value: 'Node-based' },
  { label: 'Interface Mode', value: 'Interactive' },
  { label: 'Session Type', value: 'Ephemeral' },
  { label: 'Storage', value: 'Non-persistent' },
  { label: 'Logging', value: 'Volatile' },
  { label: 'Access Scope', value: 'Restricted' },
];

export default function Home() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Hero Section */}
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-4">
          NEXUS Modular Operations Platform
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Region-aware modules • Session-based execution • Controlled access
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Platform Overview */}
        <div className="lg:col-span-2">
          <Panel>
            <SectionTitle>Platform Overview</SectionTitle>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This platform aggregates multiple operational modules designed to interface 
              with publicly accessible account structures across different environments. 
              Each module operates independently and may present different availability 
              states based on load, region, and internal constraints.
            </p>
            <div className="divider" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              All operations are executed within session boundaries. Data persistence 
              is intentionally limited to maintain operational security and minimize 
              trace footprint. Module behavior may vary depending on regional availability 
              and current system load.
            </p>
          </Panel>
        </div>

        {/* Active Environment */}
        <div>
          <Panel className="h-full">
            <SectionTitle>Active Environment</SectionTitle>
            <div className="space-y-0">
              {environmentData.map((item) => (
                <InfoRow key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* System Notes */}
      <Panel>
        <div className="flex items-start gap-3">
          <div className="w-1 h-full bg-primary/50 rounded-full self-stretch" />
          <div>
            <h3 className="text-sm font-medium text-primary mb-2">System Notes</h3>
            <ul className="text-cyber space-y-1.5">
              <li>→ Module availability does not imply execution outcome.</li>
              <li>→ All actions are session-scoped.</li>
              <li>→ Regional constraints may affect module behavior.</li>
              <li>→ No guarantees are provided regarding execution time or results.</li>
            </ul>
          </div>
        </div>
      </Panel>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Panel className="text-center">
          <div className="text-2xl font-mono text-primary">7</div>
          <div className="text-label mt-1">Active Modules</div>
        </Panel>
        <Panel className="text-center">
          <div className="text-2xl font-mono text-status-medium">3</div>
          <div className="text-label mt-1">Pending</div>
        </Panel>
        <Panel className="text-center">
          <div className="text-2xl font-mono text-status-offline">3</div>
          <div className="text-label mt-1">Unstable</div>
        </Panel>
        <Panel className="text-center">
          <div className="text-2xl font-mono text-foreground">12</div>
          <div className="text-label mt-1">Total Regions</div>
        </Panel>
      </div>
    </div>
  );
}
