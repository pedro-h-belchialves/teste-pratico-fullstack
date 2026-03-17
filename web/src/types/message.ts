export type MessageRole = "user" | "ai";

export interface Message {
  id: string;
  chatId: string;
  content: string;
  role: MessageRole;
  createdAt: string;
}

export interface SendMessagePayload {
  message: string;
}
