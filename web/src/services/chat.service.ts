import api from "../api/axios";
import type { Chat, CreateChatResponse } from "../types/chat";
import type { Message, SendMessagePayload } from "../types/message";

export async function createChat(user_id: string): Promise<CreateChatResponse> {
  const response = await api.post<CreateChatResponse>("/chats", {
    user_id: user_id,
  });

  return response.data;
}

export async function getChatById(id: string): Promise<Chat> {
  const response = await api.get<Chat>(`/chats/${id}`);
  return response.data;
}

export async function getChatsByUser(userId: string): Promise<Chat[]> {
  const response = await api.get<{ chats: Chat[] }>(`/chats/user/${userId}`);
  return response.data.chats;
}

export async function sendMessage(
  chatId: string,
  payload: SendMessagePayload,
): Promise<Message[]> {
  const response = await api.post<{ messages: Message[] }>(
    `/chats/${chatId}/message`,
    payload,
  );
  return response.data.messages;
}
