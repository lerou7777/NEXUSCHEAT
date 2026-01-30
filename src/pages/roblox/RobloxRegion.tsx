import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel, PageHeader, StatusIndicator } from '@/components/ui/cyber-elements';

interface Region {
  id: string;
  name: string;
  status: 'medium' | 'low';
  latency: string;
}

const regions: Region[] = [
  { id: 'brazil', name: 'Brazil', status: 'medium', latency: '~120ms' },
  { id: 'us', name: 'United States', status: 'medium', latency: '~80ms' },
  { id: 'china', name: 'China', status: 'low', latency: '~200ms' },
];

export default function RobloxRegion() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedRegion) {
      navigate('/modules/roblox/objective', { state: { region: selectedRegion } });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader 
        title="Select Processing Region" 
        subtitle="Choose the region for module execution"
      />

      {/* Region Selection */}
      <div className="grid md:grid-cols-3 gap-4">
        {regions.map((region) => (
          <div
            key={region.id}
            onClick={() => setSelectedRegion(region.id)}
            className={`selection-card cursor-pointer ${
              selectedRegion === region.id ? 'selected' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">{region.name}</h3>
              <StatusIndicator status={region.status} />
            </div>
            <div className="space-y-2 text-xs font-mono text-muted-foreground">
              <div className="flex justify-between">
                <span>Latency:</span>
                <span className="text-foreground">{region.latency}</span>
              </div>
              <div className="flex justify-between">
                <span>Load:</span>
                <span className={region.status === 'low' ? 'text-status-low' : 'text-status-medium'}>
                  {region.status === 'low' ? 'Low' : 'Moderate'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedRegion}
          className="btn-cyber-solid px-8"
        >
          Continue
        </button>
      </div>

      {/* Info */}
      <Panel>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Region selection affects routing and response latency</p>
          <p>• Some operations may be restricted based on regional constraints</p>
          <p>• Selection is required to proceed with module execution</p>
        </div>
      </Panel>
    </div>
  );
}
