import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  registerCompany: (data: Omit<Company, 'id'>) => void;
  updateCompany: (data: Partial<Company>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = 'kora_users';
const SESSION_KEY = 'kora_session';
const COMPANIES_KEY = 'kora_companies';

function getStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>(() => {
    const session = getStored<{ userId: string; companyId: string | null } | null>(SESSION_KEY, null);
    if (!session) return { user: null, company: null, isAuthenticated: false };

    const users = getStored<Record<string, User>>(USERS_KEY, {});
    const user = users[session.userId] ?? null;
    const companies = getStored<Record<string, Company>>(COMPANIES_KEY, {});
    const company = session.companyId ? companies[session.companyId] ?? null : null;

    return { user, company, isAuthenticated: !!user };
  });

  useEffect(() => {
    if (state.user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({
        userId: state.user.id,
        companyId: state.company?.id ?? null,
      }));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [state]);

  function login(email: string, _password: string): boolean {
    const users = getStored<Record<string, User>>(USERS_KEY, {});
    const found = Object.values(users).find((u) => u.email === email);
    if (!found) return false;

    const companies = getStored<Record<string, Company>>(COMPANIES_KEY, {});
    const company = found.companyId ? companies[found.companyId] ?? null : null;

    setState({ user: found, company, isAuthenticated: true });
    return true;
  }

  function register(name: string, email: string, _password: string): boolean {
    const users = getStored<Record<string, User>>(USERS_KEY, {});
    if (Object.values(users).some((u) => u.email === email)) return false;

    const id = generateId();
    const newUser: User = { id, name, email, companyId: null };
    users[id] = newUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    setState({ user: newUser, company: null, isAuthenticated: true });
    return true;
  }

  function registerCompany(data: Omit<Company, 'id'>) {
    const companies = getStored<Record<string, Company>>(COMPANIES_KEY, {});
    const id = generateId();
    const newCompany: Company = { id, ...data };
    companies[id] = newCompany;
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));

    const users = getStored<Record<string, User>>(USERS_KEY, {});
    if (state.user) {
      users[state.user.id] = { ...state.user, companyId: id };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }

    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, companyId: id } : null,
      company: newCompany,
    }));
  }

  function updateCompany(data: Partial<Company>) {
    if (!state.company) return;
    const companies = getStored<Record<string, Company>>(COMPANIES_KEY, {});
    const updated = { ...state.company, ...data };
    companies[state.company.id] = updated;
    localStorage.setItem(COMPANIES_KEY, JSON.stringify(companies));
    setState((prev) => ({ ...prev, company: updated }));
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setState({ user: null, company: null, isAuthenticated: false });
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
