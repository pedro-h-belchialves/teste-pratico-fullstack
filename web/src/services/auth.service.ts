import api from "../api/axios";
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
} from "../types/user";

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>("/users/login", payload);
  return response.data;
}

export async function register(payload: RegisterPayload): Promise<void> {
  await api.post("/users", payload);
}
