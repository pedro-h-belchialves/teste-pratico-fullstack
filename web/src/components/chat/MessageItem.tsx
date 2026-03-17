import { Bot } from "lucide-react";
import type { Message } from "../../types/message";
import { cn } from "../utils/cn";
import { Avatar } from "../ui/Avatar";

interface MessageItemProps {
  message: Message;
  userName?: string;
}

export function MessageItem({ message, userName }: MessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {isUser ? (
        <Avatar name={userName} size="sm" />
      ) : (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          <Bot size={14} className="text-gray-600 dark:text-gray-400" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
          isUser
            ? "rounded-br-sm bg-indigo-600 text-white"
            : "rounded-bl-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
