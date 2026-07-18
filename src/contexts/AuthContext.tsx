import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api, User } from '../lib/api';

interface AuthContextValue {
  user: User | null;
  isGuest: boolean;
  loading: boolean;
  signup: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  playAsGuest: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .me()
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const signup = async (username: string, password: string) => {
    const { user } = await api.signup(username, password);
    setUser(user);
    setIsGuest(false);
  };

  const login = async (username: string, password: string) => {
    const { user } = await api.login(username, password);
    setUser(user);
    setIsGuest(false);
  };

  const logout = async () => {
    await api.logout();
    setUser(null);
    setIsGuest(false);
  };

  const playAsGuest = () => {
    setUser(null);
    setIsGuest(true);
  };

  return (
    <AuthContext.Provider value={{ user, isGuest, loading, signup, login, logout, playAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
