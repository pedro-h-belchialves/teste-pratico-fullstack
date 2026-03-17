import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { User } from "../types/user";
import {
  clearSession,
  getToken,
  getUser,
  saveToken,
  saveUser,
} from "../utils/storage";
import { getUserById } from "../services/user.service";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setSession: (token: string, user?: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = getToken();
    const storedUser = getUser<User>();

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
      getUserById(storedUser.id)
        .then((freshUser: any) => {
          setUser(freshUser);
          saveUser(freshUser);
        })
        .catch(() => {
          clearSession();
          setToken(null);
          setUser(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  function setSession(newToken: string, newUser?: User) {
    saveToken(newToken);
    setToken(newToken);
    if (newUser) {
      saveUser(newUser);
      setUser(newUser);
    }
  }

  function logout() {
    clearSession();
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        setSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}
