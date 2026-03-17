import { useEffect } from "react";
import { useAuthContext } from "../contexts/auth-context";
import { AppLayout } from "../components/layout/AppLayout";
import { ChatContainer } from "../components/chat/ChatContainer";
import { useChats } from "../hooks/useChats";

export default function ChatPage() {
  const { user } = useAuthContext();
  const {
    chats,
    activeChat,
    messages,
    loading,
    sending,
    fetchChats,
    selectChat,
    startNewChat,
    sendChatMessage,
  } = useChats(user?.id);

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <AppLayout
      chats={chats}
      activeChatId={activeChat?.id}
      onSelectChat={selectChat}
      onNewChat={startNewChat}
      loading={loading && chats.length === 0}
    >
      <ChatContainer
        activeChat={activeChat}
        messages={messages}
        loading={loading && !!activeChat}
        sending={sending}
        userName={user?.name}
        onSend={sendChatMessage}
      />
    </AppLayout>
  );
}
