// import { useEffect, useState, useRef } from "react";
// import { X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ChatMessage } from "./Chatmessage";
// import { ChatInput } from "./Chatinput";
// import { useLazyQuery, useMutation } from "@apollo/client";
// import {
//   GET_AI_RESPONSE,
//   CREATE_AI_THREAD,
//   GET_YOUTUBE_VIDEO_SUMMARY,
// } from "../../../lib/graphql/queries"; // Adjust import path as needed
// import {
//   YouTubeVideoSummary,
//   AIResponse,
//   CreateThreadResponse,
// } from "../../../types//chat-types";

// // YouTube URL validation regex
// const YOUTUBE_URL_REGEX =
//   /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/)|youtu\.be\/)([^&\s]+)/;

// interface AiChatProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedText: string;
//   onClearSelection: () => void;
// }

// export const AiChat: React.FC<AiChatProps> = ({
//   isOpen,
//   onClose,
//   selectedText,
//   onClearSelection,
// }) => {
//   const [threadId, setThreadId] = useState<string | null>(null);
//   const [messages, setMessages] = useState<
//     Array<{
//       isBot: boolean;
//       content: string;
//       sources?: string[];
//       id?: string;
//       type?: "text" | "youtube-summary";
//     }>
//   >([]);
//   const [inputMessage, setInputMessage] = useState<string>(selectedText);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Lazy query for YouTube video summary
//   const [getYouTubeSummary, { loading: youtubeLoading }] = useLazyQuery<
//     { youtubeVideoSummary: YouTubeVideoSummary },
//     { url: string }
//   >(GET_YOUTUBE_VIDEO_SUMMARY, {
//     onCompleted: (data) => {
//       if (data?.youtubeVideoSummary) {
//         const summary = data.youtubeVideoSummary;
//         setMessages((prev) => [
//           ...prev,
//           {
//             isBot: true,
//             content: `YouTube Video Summary:\n\nTitle: ${summary.title}\n\nSummary: ${summary.summary}`,
//             sources: [summary.videoUrl],
//             type: "youtube-summary",
//           },
//         ]);
//       }
//     },
//     onError: (error) => {
//       console.error("Error getting YouTube summary:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           isBot: true,
//           content: "Sorry, there was an error processing the YouTube video.",
//         },
//       ]);
//     },
//   });

//   // AI Response Query
//   const [getAIResponse, { loading: responseLoading }] = useLazyQuery<
//     { aiResponse: AIResponse },
//     { threadId: string; userMessage: string }
//   >(GET_AI_RESPONSE, {
//     onCompleted: (data) => {
//       if (data?.aiResponse) {
//         setMessages((prev) => [
//           ...prev,
//           {
//             isBot: true,
//             content: data.aiResponse.content,
//             sources: data.aiResponse.sources,
//             id: data.aiResponse.id,
//             type: "text",
//           },
//         ]);
//       }
//     },
//     onError: (error) => {
//       console.error("Error getting AI response:", error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           isBot: true,
//           content: "Sorry, there was an error processing your request.",
//         },
//       ]);
//     },
//   });

//   // Create Thread Mutation
//   const [createAIThread] = useMutation<
//     CreateThreadResponse,
//     { initialPrompt: string }
//   >(CREATE_AI_THREAD, {
//     onCompleted: (data) => {
//       if (data?.createAIThread?.id) {
//         setThreadId(data.createAIThread.id);
//       }
//     },
//   });

//   // Rest of the previous implementation remains the same...
//   // Effect to create thread on first message if no thread exists
//   useEffect(() => {
//     if (!threadId && selectedText) {
//       createAIThread({
//         variables: {
//           initialPrompt: selectedText,
//         },
//       });
//     }
//   }, [selectedText, threadId]);

//   // Scroll to bottom effect
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   // Handle initial selected text
//   useEffect(() => {
//     if (selectedText && isOpen) {
//       setInputMessage(selectedText);
//       onClearSelection();
//     }
//   }, [selectedText, isOpen, onClearSelection]);

//   // Enhanced submit handler to handle YouTube URLs
//   const handleSubmit = async (message: string) => {
//     // Check if message is a YouTube URL
//     const youtubeMatch = message.match(YOUTUBE_URL_REGEX);

//     // Add user message
//     setMessages((prev) => [
//       ...prev,
//       {
//         isBot: false,
//         content: message,
//       },
//     ]);

//     // Check if we have a thread ID
//     if (!threadId) {
//       await createAIThread({
//         variables: {
//           initialPrompt: message,
//         },
//       });
//     }

//     // If it's a YouTube URL, get summary
//     if (youtubeMatch) {
//       getYouTubeSummary({
//         variables: {
//           videoUrl: message,
//         },
//       });
//     }
//     // Otherwise, get AI response
//     else {
//       getAIResponse({
//         variables: {
//           threadId: threadId,
//           userMessage: message,
//         },
//       });
//     }
//   };

//   // Render method remains the same as in previous implementation
//   return (
//     <div
//       className={`fixed top-14 right-0 w-[32%] h-[calc(100vh-3.5rem)] bg-neutral-900 border-l border-neutral-800 flex flex-col transition-transform duration-300 ${
//         isOpen ? "translate-x-0" : "translate-x-full"
//       }`}
//     >
//       {/* Chat Header */}
//       <div className="flex items-center justify-between px-4 py-6 border-b border-neutral-800">
//         <h2 className="text-sm font-medium text-neutral-200">
//           Frinz AI Assistant
//         </h2>
//         <Button
//           variant="ghost"
//           size="sm"
//           className="h-8 w-8 p-0 hover:bg-neutral-800"
//           onClick={onClose}
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       {/* Chat Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message, index) => (
//           <ChatMessage
//             key={message.id || `message-${index}`}
//             isBot={message.isBot}
//             content={message.content}
//             sources={message.sources}
//           />
//         ))}
//         {responseLoading && <ChatMessage isBot={true} content="Thinking..." />}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* Chat Input */}
//       <div className="p-4 border-t border-neutral-800">
//         <ChatInput
//           onSubmit={handleSubmit}
//           initialMessage={inputMessage}
//           onMessageChange={setInputMessage}
//         />
//       </div>
//     </div>
//   );
// };

import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./Chatmessage";
import { ChatInput } from "./Chatinput";

interface AiChatProps {
  isOpen: boolean;
  onClose: () => void;
  selectedText: string;
  onClearSelection: () => void;
}

export const AiChat: React.FC<AiChatProps> = ({
  isOpen,
  onClose,
  selectedText,
  onClearSelection,
}) => {
  const [messages, setMessages] = useState<
    Array<{ isBot: boolean; content: string }>
  >([]);
  const [inputMessage, setInputMessage] = useState<string>(selectedText);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update inputMessage when selectedText changes
  useEffect(() => {
    if (selectedText && isOpen) {
      setInputMessage(selectedText);
      onClearSelection();
    }
  }, [selectedText, isOpen, onClearSelection]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (message: string) => {
    // Add user message
    setMessages((prev) => [...prev, { isBot: false, content: message }]);

    // TODO: Implement actual AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { isBot: true, content: `You said: ${message}` },
      ]);
    }, 1000);
  };

  return (
    <div
      className={`fixed top-14 right-0 w-[32%] h-[calc(100vh-3.5rem)] bg-neutral-900 border-l border-neutral-800 flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-6 border-b border-neutral-800">
        <h2 className="text-sm font-medium text-neutral-200">
          Frinz AI Assistant
        </h2>
        <Button
          variant="default"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-neutral-800"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            isBot={message.isBot}
            content={message.content}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div className="p-4 border-t border-neutral-800">
        <ChatInput
          onSubmit={handleSubmit}
          initialMessage={inputMessage} // Passing initialMessage
          onMessageChange={setInputMessage}
        />
      </div>
    </div>
  );
};
