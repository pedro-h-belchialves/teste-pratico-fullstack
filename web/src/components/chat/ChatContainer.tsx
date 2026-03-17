import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import type { Chat } from "../../types/chat";
import type { Message } from "../../types/message";
import { Spinner } from "../ui/Spinner";

interface ChatContainerProps {
  activeChat: Chat | null;
  messages: Message[];
  loading: boolean;
  sending: boolean;
  userName?: string;
  onSend: (content: string) => void;
}

export function ChatContainer({
  activeChat,
  messages,
  loading,
  sending,
  userName,
  onSend,
}: ChatContainerProps) {
  if (!activeChat) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 text-gray-400">
        <p className="text-sm">Selecione ou crie uma conversa para começar.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <MessageList messages={messages} userName={userName} />
      <MessageInput onSend={onSend} loading={sending} />
    </div>
  );
}
