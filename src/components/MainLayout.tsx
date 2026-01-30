import { Outlet } from 'react-router-dom';
import { TopNavigation } from './TopNavigation';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
            <span>© 2024 Modular Operations Platform</span>
            <span>Session-scoped execution environment</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
