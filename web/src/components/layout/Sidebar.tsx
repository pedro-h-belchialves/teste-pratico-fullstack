import { useState } from "react";

import type { Chat } from "../../types/chat";
import { MessageSquare, Plus, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "../ui/Button";
import { Spinner } from "../ui/Spinner";
import { cn } from "../utils/cn";

interface SidebarProps {
  chats: Chat[];
  activeChatId?: string;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  loading?: boolean;
}

export function Sidebar({
  chats,
  activeChatId,
  onSelectChat,
  onNewChat,
  loading,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300 dark:border-gray-800 dark:bg-gray-900",
        collapsed ? "w-14" : "w-64",
      )}
    >
      <div className="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-800">
        {!collapsed && (
          <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            Conversas
          </span>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto rounded-md p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <div className={cn("p-2", collapsed && "flex justify-center")}>
        <Button
          variant="primary"
          size="sm"
          onClick={onNewChat}
          className={cn("w-full gap-2", collapsed && "w-auto px-2")}
        >
          <Plus size={16} />
          {!collapsed && "Novo Chat"}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-1">
        {loading ? (
          <div className="flex justify-center pt-6">
            <Spinner size="sm" />
          </div>
        ) : chats.length === 0 ? (
          !collapsed && (
            <p className="px-2 pt-4 text-center text-xs text-gray-400">
              Nenhuma conversa ainda.
            </p>
          )
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
                activeChatId === chat.id
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
              )}
            >
              <MessageSquare size={15} className="shrink-0" />
              {!collapsed && (
                <span className="truncate">Chat {chat.id.slice(0, 8)}</span>
              )}
            </button>
          ))
        )}
      </nav>
    </aside>
  );
}
