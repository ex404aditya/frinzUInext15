import { useState, useEffect } from "react";

export function useAiTextSelection(onAiChatOpen?: (text?: string) => void) {
  const [selectedText, setSelectedText] = useState("");
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        const selection = window.getSelection();
        const text = selection?.toString().trim() || "";
        if (text && onAiChatOpen) {
          setSelectedText(text);
          setIsAiChatOpen(true);
          onAiChatOpen(text);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onAiChatOpen]);

  const openAiChat = (text?: string) => {
    setSelectedText(text || "");
    setIsAiChatOpen(true);
  };

  const closeAiChat = () => {
    setIsAiChatOpen(false);
    setSelectedText("");
  };

  return {
    selectedText,
    isAiChatOpen,
    openAiChat,
    closeAiChat,
    setIsAiChatOpen,
    setSelectedText,
  };
}
