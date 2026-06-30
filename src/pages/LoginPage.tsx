import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

export function LoginPage() {
  const { login, register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const ok = await login(form.email, form.password);
        if (ok) {
          toast('Welcome back!', 'success');
          navigate('/');
        } else {
          toast('Invalid email or password.', 'error');
        }
      } else {
        if (!form.name.trim()) {
          toast('Please enter your full name.', 'error');
          setLoading(false);
          return;
        }
        const ok = await register(form.name, form.email, form.password);
        if (ok) {
          toast('Account created! Now set up your business.', 'success');
          navigate('/onboarding');
        } else {
          toast('An account with this email already exists.', 'error');
        }
      }
    } catch {
      toast('Something went wrong. Please try again.', 'error');
    }
    setLoading(false);
  }

  function switchMode() {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
    setShowPassword(false);
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-3xl bg-charcoal mb-4">
            <Sparkles className="w-6 h-6 text-gold-500" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal tracking-tight">Kora AI</h1>
          <p className="text-sm text-silver mt-1">Business Growth Platform</p>
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="flex">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                mode === 'login'
                  ? 'text-charcoal border-b-2 border-charcoal'
                  : 'text-muted hover:text-silver border-b-2 border-transparent'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-4 text-sm font-medium transition-colors ${
                mode === 'register'
                  ? 'text-charcoal border-b-2 border-charcoal'
                  : 'text-muted hover:text-silver border-b-2 border-transparent'
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.form
                key={mode}
                initial={{ opacity: 0, x: mode === 'login' ? -8 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? 8 : -8 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                {mode === 'register' && (
                  <div>
                    <label className="label">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Your full name"
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="label">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      placeholder="you@company.com"
                      className="input-field pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => update('password', e.target.value)}
                      placeholder="Enter your password"
                      className="input-field pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-charcoal text-white text-sm font-medium rounded-2xl hover:bg-charcoal/80 disabled:bg-disabled transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>{mode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </motion.form>
            </AnimatePresence>

            <p className="text-center text-xs text-muted mt-5">
              {mode === 'login' ? (
                <>Don't have an account?{' '}<button onClick={switchMode} className="text-charcoal font-medium hover:underline">Create one</button></>
              ) : (
                <>Already have an account?{' '}<button onClick={switchMode} className="text-charcoal font-medium hover:underline">Sign in</button></>
              )}
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Built for cafes, restaurants, retail shops, and more
        </p>
      </motion.div>
    </div>
  );
}
