import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSubmit: (message: string) => void;
  initialMessage: string;
  onMessageChange: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSubmit,
  initialMessage,
  onMessageChange,
}) => {
  const [message, setMessage] = useState<string>(initialMessage);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeLink, setYoutubeLink] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessage(initialMessage);
    if (textareaRef.current) {
      adjustTextareaHeight();
    }
  }, [initialMessage]);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onMessageChange(e.target.value);
    adjustTextareaHeight();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleYoutubeSubmit = () => {
    if (youtubeLink.trim()) {
      setMessage((prev) => prev + (prev ? " " : "") + youtubeLink);
      onMessageChange(message + (message ? " " : "") + youtubeLink);
      setYoutubeLink("");
      setShowYoutubeInput(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleInputChange}
            placeholder="Ask anything..."
            className="bg-neutral-800 border-neutral-700 resize-none min-h-[44px] max-h-[200px] flex-grow"
            onInput={handleInputChange} // Use onInput for dynamic height adjustment
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
        </div>

        {/* Second Line: Buttons and YouTube URL input */}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 bg-neutral-800 hover:bg-neutral-900"
            onClick={() => setShowYoutubeInput(!showYoutubeInput)}
          >
            <Youtube className="h-4 w-4" />
          </Button>

          {showYoutubeInput && (
            <div className="flex-grow flex items-center bg-neutral-800 rounded-md overflow-hidden">
              <Input
                value={youtubeLink}
                onChange={(e) => setYoutubeLink(e.target.value)}
                placeholder="Paste YouTube URL..."
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm h-8"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleYoutubeSubmit}
                className="h-8 px-4 pr-4 hover:bg-neutral-700"
              >
                Add
              </Button>
            </div>
          )}

          <div className="flex-grow"></div>

          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 hover:bg-neutral-800 bg-violet-600"
          >
            <SendHorizontal className="h-4 w-4 text-white" />{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};
