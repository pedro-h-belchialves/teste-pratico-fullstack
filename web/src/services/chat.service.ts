import type { Message } from "react-hook-form";
import api from "../api/axios";
import type { Chat, CreateChatResponse } from "../types/chat";
import type { SendMessagePayload } from "../types/message";

export async function createChat(): Promise<CreateChatResponse> {
  const response = await api.post<CreateChatResponse>("/chats");
  return response.data;
}

export async function getChatById(id: string): Promise<Chat> {
  const response = await api.get<Chat>(`/chats/${id}`);
  return response.data;
}

export async function getChatsByUser(userId: string): Promise<Chat[]> {
  const response = await api.get<Chat[]>(`/chats/user/${userId}`);
  return response.data;
}

export async function sendMessage(
  chatId: string,
  payload: SendMessagePayload,
): Promise<Message[]> {
  const response = await api.post<Message[]>(
    `/chats/${chatId}/message`,
    payload,
  );
  return response.data as Message[];
}
