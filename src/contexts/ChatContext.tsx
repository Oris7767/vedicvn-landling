import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

interface ChatContextValue {
  isOpen: boolean;
  pendingMessage: string | null;
  openChat: (message?: string) => void;
  closeChat: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const openChat = useCallback((message?: string) => {
    if (message) {
      setPendingMessage(message);
    }
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ChatContext.Provider value={{ isOpen, pendingMessage, openChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
