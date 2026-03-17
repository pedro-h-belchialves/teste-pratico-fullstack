import { useState, useCallback } from "react";

import {
  createChat,
  getChatById,
  getChatsByUser,
  sendMessage,
} from "../services/chat.service";
import type { Chat } from "../types/chat";
import type { Message } from "../types/message";

export function useChats(userId: string | undefined) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchChats = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getChatsByUser(userId);

      setChats(data);
    } catch {
      setError("Erro ao carregar conversas");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  async function selectChat(chatId: string) {
    setLoading(true);
    setError(null);
    try {
      const chat = await getChatById(chatId);
      setActiveChat(chat);
      setMessages(chat.messages ?? []);
    } catch {
      setError("Erro ao carregar conversa");
    } finally {
      setLoading(false);
    }
  }

  async function startNewChat() {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      const newChat = await createChat(userId);

      const fullChat: Chat = { ...newChat, messages: [] };
      setChats((prev) => [fullChat, ...prev]);
      setActiveChat(fullChat);
      setMessages([]);
    } catch {
      setError("Erro ao criar conversa");
    } finally {
      setLoading(false);
    }
  }

  async function sendChatMessage(message: string) {
    if (!activeChat) return;
    setSending(true);
    setError(null);
    try {
      const updated = await sendMessage(activeChat.id, { message });

      setMessages(updated);
    } catch {
      setError("Erro ao enviar mensagem");
    } finally {
      setSending(false);
    }
  }

  return {
    chats,
    activeChat,
    messages,
    loading,
    sending,
    error,
    fetchChats,
    selectChat,
    startNewChat,
    sendChatMessage,
  };
}
