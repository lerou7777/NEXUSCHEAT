import { Panel, PageHeader } from '@/components/ui/cyber-elements';

export default function Analysis() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader 
        title="Analysis Center" 
        subtitle="System diagnostics and operational metrics"
      />

      <div className="grid md:grid-cols-2 gap-6">
        <Panel>
          <h3 className="font-medium text-foreground mb-4">Session Metrics</h3>
          <div className="space-y-3 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Sessions:</span>
              <span className="text-primary">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Avg. Response Time:</span>
              <span className="text-foreground">124ms</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="text-status-online">98.7%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Queue Depth:</span>
              <span className="text-status-medium">23</span>
            </div>
          </div>
        </Panel>

        <Panel>
          <h3 className="font-medium text-foreground mb-4">Module Status</h3>
          <div className="space-y-2">
            {['Roblox', 'Call of Duty', 'Fortnite', 'Valorant', 'League of Legends'].map((name) => (
              <div key={name} className="flex items-center justify-between py-1">
                <span className="text-sm text-muted-foreground">{name}</span>
                <div className="flex items-center gap-2">
                  <span className="status-dot-online" />
                  <span className="text-xs font-mono text-status-online">ONLINE</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <h3 className="font-medium text-foreground mb-4">System Logs</h3>
        <div className="bg-secondary/30 rounded p-4 font-mono text-xs space-y-1 max-h-64 overflow-y-auto scrollbar-cyber">
          <div className="text-muted-foreground">[2024-01-15 14:32:01] Session initialized - ID: temp_8f3k2</div>
          <div className="text-muted-foreground">[2024-01-15 14:32:02] Module RBLX-001 loaded</div>
          <div className="text-status-online">[2024-01-15 14:32:03] Connection established - Region: US-EAST</div>
          <div className="text-muted-foreground">[2024-01-15 14:32:05] Request queued for processing</div>
          <div className="text-status-medium">[2024-01-15 14:32:08] Warning: High latency detected (&gt;100ms)</div>
          <div className="text-muted-foreground">[2024-01-15 14:32:10] Request processed successfully</div>
          <div className="text-muted-foreground">[2024-01-15 14:32:12] Session data cleared</div>
        </div>
      </Panel>
    </div>
  );
}
