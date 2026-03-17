import { useState, type KeyboardEvent } from "react";

import { Send } from "lucide-react";
import { Button } from "../ui/Button";

interface MessageInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
  loading?: boolean;
}

export function MessageInput({ onSend, disabled, loading }: MessageInputProps) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="border-t border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-end gap-2 rounded-xl border border-gray-300 bg-white px-3 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800">
        <textarea
          className="flex-1 resize-none bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-gray-500"
          placeholder="Escreva uma mensagem... (Enter para enviar)"
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled || loading}
          style={{ maxHeight: "120px", overflowY: "auto" }}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleSend}
          loading={loading}
          disabled={disabled || !value.trim()}
          className="shrink-0 px-3 py-2"
        >
          <Send size={15} />
        </Button>
      </div>
    </div>
  );
}
