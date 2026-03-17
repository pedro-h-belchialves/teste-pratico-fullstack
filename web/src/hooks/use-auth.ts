import { useState } from "react";

import type { LoginPayload, RegisterPayload } from "../types/user";
import { useAuthContext } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../services/user.service";
import { login, register } from "../services/auth.service";

export function useAuth() {
  console.log("useAuth");
  const { user, isAuthenticated, isLoading, setSession, logout } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(payload: LoginPayload) {
    setLoading(true);
    setError(null);
    try {
      const { token } = await login(payload);
      const decoded = parseJwt(token);
      const userId = String(decoded?.id || decoded?.sub);
      const fetchedUser = await getUserById(userId);
      setSession(token, fetchedUser);
      navigate("/chat");
    } catch (err: unknown) {
      const message = extractErrorMessage(err) || "Credenciais inválidas";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(payload: RegisterPayload) {
    setLoading(true);
    setError(null);
    try {
      await register(payload);
      navigate("/login");
    } catch (err: unknown) {
      const message = extractErrorMessage(err) || "Erro ao criar conta";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    loading,
    error,
    handleLogin,
    handleRegister,
    handleLogout,
  };
}

function parseJwt(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function extractErrorMessage(err: unknown): string | null {
  if (typeof err === "object" && err !== null) {
    const e = err as {
      response?: { data?: { message?: string } };
      message?: string;
    };
    return e.response?.data?.message || e.message || null;
  }
  return null;
}
