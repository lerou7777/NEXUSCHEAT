import { Link } from 'react-router-dom';
import { Panel, PageHeader, StatusIndicator } from '@/components/ui/cyber-elements';
import { Download } from 'lucide-react';

interface Module {
  id: string;
  name: string;
  description: string;
  status: 'online' | 'medium' | 'offline';
  artifact: {
    file: string;
    size: string;
    build: string;
    type: string;
  };
  comment?: string;
  route?: string;
}

const modules: Module[] = [
  {
    id: 'roblox',
    name: 'Roblox',
    description: 'Account structure interface for Roblox platform identifiers',
    status: 'online',
    artifact: { file: 'roblox-module.zip', size: '2.4 MB', build: 'Verified', type: 'Precompiled artifact' },
    comment: 'Module responded as expected during my session.',
    route: '/modules/roblox',
  },
  {
    id: 'cod',
    name: 'Call of Duty',
    description: 'Cross-platform account verification module',
    status: 'online',
    artifact: { file: 'cod-module.zip', size: '2.1 MB', build: 'Stable', type: 'Precompiled artifact' },
    comment: 'Module responded as expected during my session.',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    description: 'Epic Games account structure analysis',
    status: 'online',
    artifact: { file: 'fortnite-module.zip', size: '1.9 MB', build: 'Stable', type: 'Precompiled artifact' },
    comment: 'Module responded as expected during my session.',
  },
  {
    id: 'valorant',
    name: 'Valorant',
    description: 'Riot Games account interface module',
    status: 'online',
    artifact: { file: 'valorant-module.zip', size: '2.3 MB', build: 'Stable', type: 'Precompiled artifact' },
    comment: 'Module responded as expected during my session.',
  },
  {
    id: 'lol',
    name: 'League of Legends',
    description: 'Summoner account structure module',
    status: 'online',
    artifact: { file: 'lol-module.zip', size: '2.0 MB', build: 'Stable', type: 'Precompiled artifact' },
    comment: 'Module responded as expected during my session.',
  },
  // Unstable modules
  {
    id: 'apex',
    name: 'Apex Legends',
    description: 'EA account interface module',
    status: 'offline',
    artifact: { file: 'apex-module.zip', size: '--', build: 'N/A', type: 'Unavailable' },
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    description: 'Microsoft account structure module',
    status: 'offline',
    artifact: { file: 'minecraft-module.zip', size: '--', build: 'N/A', type: 'Unavailable' },
  },
  {
    id: 'genshin',
    name: 'Genshin Impact',
    description: 'HoYoverse account interface module',
    status: 'offline',
    artifact: { file: 'genshin-module.zip', size: '--', build: 'N/A', type: 'Unavailable' },
  },
];

function ModuleCard({ module }: { module: Module }) {
  const isDisabled = module.status === 'offline';
  
  const CardContent = (
    <Panel className={`module-card h-full ${isDisabled ? 'disabled' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-medium text-foreground">{module.name}</h3>
        <StatusIndicator status={module.status} />
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
      
      {module.comment && (
        <div className="bg-secondary/30 rounded px-3 py-2 mb-4">
          <p className="text-xs text-muted-foreground italic">"{module.comment}"</p>
        </div>
      )}
      
      {/* Artifact Block */}
      <div className="artifact-block">
        <div className="flex items-center justify-between mb-2">
          <span className="text-primary">artifact</span>
          <span className={isDisabled ? 'text-status-offline' : 'text-muted-foreground'}>
            {isDisabled ? 'unavailable' : 'ready'}
          </span>
        </div>
        <div className="space-y-1 text-muted-foreground">
          <div>File: {module.artifact.file}</div>
          <div>Size: {module.artifact.size}</div>
          <div>Build: {module.artifact.build}</div>
          <div>Type: {module.artifact.type}</div>
        </div>
      </div>
      
      {/* Action */}
      <div className="mt-4">
        {isDisabled ? (
          <div className="text-xs text-muted-foreground text-center py-2">
            Package unavailable due to internal constraints
          </div>
        ) : (
          <button className="btn-cyber w-full flex items-center justify-center gap-2" disabled={!module.route}>
            <Download className="w-4 h-4" />
            {module.route ? 'Access Module' : 'Download Package'}
          </button>
        )}
      </div>
    </Panel>
  );

  if (module.route && !isDisabled) {
    return <Link to={module.route} className="block">{CardContent}</Link>;
  }
  
  return CardContent;
}

export default function Modules() {
  const activeModules = modules.filter(m => m.status !== 'offline');
  const unstableModules = modules.filter(m => m.status === 'offline');

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader 
        title="Available Modules" 
        subtitle="Select a module to access operational capabilities"
      />

      {/* Active Modules */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="status-dot-online" />
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Active Modules</h2>
          <span className="text-xs text-muted-foreground">({activeModules.length})</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Unstable Modules */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="status-dot-offline" />
          <h2 className="text-sm font-medium text-foreground uppercase tracking-wider">Unstable Modules</h2>
          <span className="text-xs text-muted-foreground">({unstableModules.length})</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unstableModules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>

      {/* Module Notes */}
      <Panel>
        <div className="flex items-start gap-3">
          <div className="w-1 h-12 bg-primary/50 rounded-full" />
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Module availability is subject to change based on system load and regional constraints.</p>
            <p>Artifacts are precompiled and verified before distribution.</p>
          </div>
        </div>
      </Panel>
    </div>
  );
}
