import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface Company {
  id: string;
  name: string;
  type: string;
  industry: string;
  description: string;
  phone: string;
  address: string;
  website: string;
  logo: string;
  brandColor: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyId: string | null;
}

interface AuthState {
  user: User | null;
  company: Company | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  registerCompany: (data: Omit<Company, 'id'>) => Promise<void>;
  updateCompany: (data: Partial<Company>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const API = import.meta.env.VITE_API_URL || '/api';

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('kora_token');
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API}${path}`, { headers, ...options });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(body || res.statusText);
  }
  return res.json();
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, company: null, isAuthenticated: false, loading: true });

  const restoreSession = useCallback(async () => {
    const token = localStorage.getItem('kora_token');
    if (!token) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }
    try {
      const data = await apiFetch<{ user: User; company: Company | null }>('/me');
      setState({ user: data.user, company: data.company, isAuthenticated: true, loading: false });
    } catch {
      localStorage.removeItem('kora_token');
      setState({ user: null, company: null, isAuthenticated: false, loading: false });
    }
  }, []);

  useEffect(() => { restoreSession(); }, [restoreSession]);

  async function login(email: string, password: string): Promise<boolean> {
    try {
      const data = await apiFetch<{ user: User; token: string }>('/auth/login', {
        method: 'POST', body: JSON.stringify({ email, password }),
      });
      localStorage.setItem('kora_token', data.token);
      const me = await apiFetch<{ user: User; company: Company | null }>('/me');
      setState({ user: me.user, company: me.company, isAuthenticated: true, loading: false });
      return true;
    } catch {
      return false;
    }
  }

  async function register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const data = await apiFetch<{ user: User; token: string }>('/auth/register', {
        method: 'POST', body: JSON.stringify({ name, email, password }),
      });
      localStorage.setItem('kora_token', data.token);
      setState({ user: data.user, company: null, isAuthenticated: true, loading: false });
      return true;
    } catch {
      return false;
    }
  }

  async function registerCompany(form: Omit<Company, 'id'>): Promise<void> {
      const data = await apiFetch<{ company: Company; token: string }>('/company', {
      method: 'POST', body: JSON.stringify(form),
    });
    localStorage.setItem('kora_token', data.token);
    setState((prev) => ({
      ...prev,
      company: data.company,
      user: prev.user ? { ...prev.user, companyId: data.company.id } : null,
    }));
  }

  async function updateCompany(form: Partial<Company>): Promise<void> {
    const data = await apiFetch<{ company: Company }>('/company', {
      method: 'PUT', body: JSON.stringify(form),
    });
    setState((prev) => ({ ...prev, company: data.company }));
  }

  function logout() {
    localStorage.removeItem('kora_token');
    setState({ user: null, company: null, isAuthenticated: false, loading: false });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, register, registerCompany, updateCompany, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
