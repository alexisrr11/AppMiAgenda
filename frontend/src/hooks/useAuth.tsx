/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as authService from '../services/auth.service';
import type { AuthSession, AuthUser, LoginPayload } from '../types/users.types';
import { getStoredToken, getStoredUser } from '../utils/storage';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<AuthSession>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => getStoredToken());
  const [user, setUser] = useState<AuthUser | null>(() => getStoredUser());

  useEffect(() => {
    if (!token) {
      return;
    }

    let isActive = true;

    authService
      .getCurrentUser(token)
      .then((currentUser) => {
        if (isActive) {
          setUser(currentUser);
        }
      })
      .catch(() => {
        if (isActive) {
          authService.logout();
          setToken(null);
          setUser(null);
        }
      });

    return () => {
      isActive = false;
    };
  }, [token]);

  const handleLogin = async (payload: LoginPayload) => {
    const session = await authService.login(payload);
    setToken(session.token);
    setUser(session.user);
    return session;
  };

  const handleLogout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login: handleLogin,
      logout: handleLogout,
    }),
    [token, user],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider.');
  }

  return context;
};
