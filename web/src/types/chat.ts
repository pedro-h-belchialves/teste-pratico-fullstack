import type { Message } from "./message";

export interface Chat {
  id: string;
  userId: string;
  createdAt: string;
  messages?: Message[];
}

export interface CreateChatResponse {
  id: string;
  userId: string;
  createdAt: string;
}
