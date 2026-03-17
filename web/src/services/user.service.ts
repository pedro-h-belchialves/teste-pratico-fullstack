import api from "../api/axios";
import type { UpdateUserPayload, User } from "../types/user";

export async function getUserById(id: string): Promise<User> {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
}

export async function updateUser(
  id: string,
  payload: UpdateUserPayload,
): Promise<User> {
  const response = await api.patch<User>(`/users/${id}`, payload);
  return response.data;
}
