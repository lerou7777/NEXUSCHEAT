import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Panel } from '@/components/ui/cyber-elements';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Auth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [isRegistering, setIsRegistering] = useState(false);
  const [statusText, setStatusText] = useState('');

  // Form state
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  // ❌ LOGIN BLOQUEADO
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('user not registered, Create an account to continue.');
  };

  // ✅ REGISTER = ÚNICO CAMINHO
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsRegistering(true);
    setStatusText('Registering...');

    // Delay discreto
    await new Promise(resolve => setTimeout(resolve, 800));

    // Salva sessão (FRONTEND ONLY)
    sessionStorage.setItem('nexus_user_name', name);
    sessionStorage.setItem('nexus_credits', '0');

    // Atualiza topo na mesma aba
    window.dispatchEvent(new Event('nexus_user_update'));

    setIsRegistering(false);
    setStatusText('');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--primary) / 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--primary) / 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Abstract overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(135deg, hsl(var(--primary)) 0%, transparent 50%),
            linear-gradient(225deg, hsl(var(--primary)) 0%, transparent 50%)
          `,
        }}
      />

      <div className="w-full max-w-md px-4 relative z-10">
        {/* Identity */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold tracking-tight">
            <span className="text-primary">N</span>EXUS
          </h1>
          <p className="font-mono text-xs text-muted-foreground mt-2 tracking-wider">
            Session Access Required
          </p>
        </div>

        <Panel className="p-6">
          {/* Tabs */}
          <div className="flex border-b border-border mb-6">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-medium ${
                mode === 'login'
                  ? 'text-primary border-b-2 border-primary -mb-px'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 pb-3 text-sm font-medium ${
                mode === 'register'
                  ? 'text-primary border-b-2 border-primary -mb-px'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <p className="text-xs text-destructive mb-4 text-center">
              {error}
            </p>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Email</Label>
                <Input value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Password</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              <button type="submit" className="btn-cyber-solid w-full mt-6">
                Access Session
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Name</Label>
                <Input value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Email</Label>
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Password</Label>
                <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wider">Confirm Password</Label>
                <Input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              </div>

              <button
                type="submit"
                disabled={isRegistering}
                className="btn-cyber-solid w-full mt-6 disabled:opacity-50"
              >
                Register
              </button>

              {statusText && (
                <p className="text-xs text-muted-foreground font-mono mt-2 text-center">
                  {statusText}
                </p>
              )}
            </form>
          )}
        </Panel>

        <p className="text-center text-xs text-muted-foreground/50 mt-6 font-mono">
          Session-scoped access only
        </p>
      </div>
    </div>
  );
}
