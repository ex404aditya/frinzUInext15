import React from "react";
import { Link } from "lucide-react";

interface ChatMessageProps {
  isBot: boolean;
  content: string;
  sources?: string[];
  type?: "text" | "youtube-summary";
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  isBot,
  content,
  sources,
  type = "text",
}) => {
  const renderSources = () => {
    if (!sources || sources.length === 0) return null;

    return (
      <div className="mt-2 pt-2 border-t border-neutral-700">
        <div className="flex items-center text-xs text-neutral-400 gap-2">
          <Link className="w-3 h-3" />
          <span>Sources:</span>
        </div>
        {sources.map((source, index) => (
          <a
            key={index}
            href={source}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-xs text-violet-400 hover:underline truncate max-w-full"
          >
            {source}
          </a>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    // Special rendering for YouTube summaries
    if (type === "youtube-summary") {
      return (
        <div>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
      );
    }

    // Default text rendering
    return <p className="text-sm whitespace-pre-wrap">{content}</p>;
  };

  return (
    <div className={`flex gap-3 ${isBot ? "justify-start" : "justify-end"}`}>
      <div
        className={`
          max-w-[80%] 
          rounded-lg 
          px-4 
          py-2 
          break-words 
          overflow-x-auto 
          ${
            isBot
              ? "bg-neutral-800 text-neutral-200"
              : "bg-violet-600 text-white"
          }
          relative
        `}
      >
        {renderContent()}
        {renderSources()}
      </div>
    </div>
  );
};
