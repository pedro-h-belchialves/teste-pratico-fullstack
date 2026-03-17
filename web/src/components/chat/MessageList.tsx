import { useEffect, useRef } from "react";

import type { Message } from "../../types/message";
import { MessageItem } from "./MessageItem";
import { MessageSquare } from "lucide-react";

interface MessageListProps {
  messages: Message[];
  userName?: string;
}

export function MessageList({ messages, userName }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-400">
        <MessageSquare size={40} strokeWidth={1} />
        <p className="text-sm">Envie uma mensagem para começar.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} userName={userName} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
