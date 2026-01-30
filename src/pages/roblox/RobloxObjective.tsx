import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Panel, PageHeader } from '@/components/ui/cyber-elements';
import { MessageSquare, User } from 'lucide-react';

interface Objective {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: React.ReactNode;
}

const objectives: Objective[] = [
  {
    id: 'chat',
    title: ' Restrict Verification voice',
    description: 'Analyze communication availability and restrictions',
    items: [
      'Communication availability',
      'Restriction indicators voice',
      'Channel status mapping',
    ],
    icon: <MessageSquare className="w-5 h-5" />,
  },
  {
    id: 'account',
    title: 'General Account Review',
    description: 'Comprehensive account structure analysis',
    items: [
      'Public structure overview',
      'Identifier consistency',
      'Metadata validation',
    ],
    icon: <User className="w-5 h-5" />,
  },
];

export default function RobloxObjective() {
  const [selectedObjective, setSelectedObjective] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const region = location.state?.region;

  const handleContinue = () => {
    if (selectedObjective) {
      navigate('/modules/roblox/verify', { 
        state: { region, objective: selectedObjective } 
      });
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      <PageHeader 
        title="Select Objective" 
        subtitle="Choose the type of analysis to perform"
      />

      {/* Objective Selection */}
      <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
        {objectives.map((objective) => (
          <div
            key={objective.id}
            onClick={() => setSelectedObjective(objective.id)}
            className={`selection-card cursor-pointer ${
              selectedObjective === objective.id ? 'selected' : ''
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-primary">{objective.icon}</div>
              <h3 className="font-medium text-foreground">{objective.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{objective.description}</p>
            <ul className="space-y-1.5">
              {objective.items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="text-primary">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Continue Button */}
      <div className="flex justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedObjective}
          className="btn-cyber-solid px-8"
        >
          Continue
        </button>
      </div>

      {/* Selected Region Info */}
      {region && (
        <Panel className="max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Selected Region:</span>
            <span className="font-mono text-primary capitalize">{region}</span>
          </div>
        </Panel>
      )}
    </div>
  );
}
