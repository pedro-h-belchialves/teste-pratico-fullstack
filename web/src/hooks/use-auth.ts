import { useState } from "react";

import type { LoginPayload, RegisterPayload } from "../types/user";
import { useAuthContext } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../services/user.service";
import { login, register } from "../services/auth.service";

export function useAuth() {
  const { user, isAuthenticated, isLoading, setSession, logout } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(payload: LoginPayload) {
    setLoading(true);
    setError(null);
    try {
      const { access_token, account_id } = await login(payload);

      const userId = account_id;

      setSession(access_token);

      const fetchedUser = await getUserById(userId);

      setSession(access_token, fetchedUser);

      navigate("/chat");
    } catch (err: unknown) {
      alert(err);
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
