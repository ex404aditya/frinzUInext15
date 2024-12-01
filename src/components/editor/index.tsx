"use client";

import React, { useState, useEffect, useCallback } from "react";
import { BodyEditor } from "./BodyEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@apollo/client";
import { GET_NOTE, UPDATE_NOTE } from "@/lib/graphql/workspace";
import { AiChat } from "../global/ai-chat";
import { Note } from "@/lib/graphql/types";
import { useAiTextSelection } from "@/hooks/useAiTextSelection";
import { cn } from "@/lib/utils";
type EditorProps = {
  note: {
    id: string;
    title: string;
    content: string;
    workspaceId: string;
    userId: string; // userId is now at the top level
    createdAt: string;
    updatedAt: string;
  };
};

export const Editor = ({ note }: EditorProps) => {
  const { toast } = useToast();

  // State for title, content, and changes
  const [title, setTitle] = useState<string>(note.title || "");
  const [content, setContent] = useState<string>(note.content || "");
  const [hasChanges, setHasChanges] = useState(false);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
      setHasChanges(true);
    },
    []
  );

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
    setHasChanges(true);
  }, []);

  // Fetch the note data if not already provided as a prop
  const {
    data: noteData,
    loading: isFetching,
    error: fetchError,
  } = useQuery(GET_NOTE, {
    variables: { noteId: note.id },
    skip: !note.id, // Skip query if noteId is not available
  });

  // Mutation for updating the note
  const [updateNoteMutation, { loading: isPending }] = useMutation(
    UPDATE_NOTE,
    {
      onCompleted: () => {
        toast({
          title: "Success",
          description: "Note saved successfully",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to save note",
          variant: "destructive",
        });
      },
    }
  );

  const {
    selectedText,
    isAiChatOpen,
    openAiChat,
    closeAiChat,
    setSelectedText,
  } = useAiTextSelection((text) => {
    console.log("Selected text for AI chat:", text);
  });

  useEffect(() => {
    if (noteData && noteData.note) {
      setTitle(noteData.note.title || "");
      setContent(noteData.note.content || "");
      setHasChanges(false);
    }
  }, [noteData]);

  const handleSave = () => {
    if (!note.id) {
      toast({
        title: "Error",
        description: "Note ID is missing. Cannot save.",
        variant: "destructive",
      });
      return;
    }

    updateNoteMutation({
      variables: {
        noteId: note.id,
        title,
        content,
      },
    });
  };

  // Handle loading and error states
  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)] text-muted-foreground">
        Failed to load the note.
      </div>
    );
  }

  if (!noteData) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-100px)] text-muted-foreground">
        No note found or failed to load.
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      <div
        className={cn(
          "max-w-[900px] mx-auto px-3 sm:px-4 md:px-8 py-4 sm:py-6 md:py-10 transition-transform ease-in-out duration-300",
          isAiChatOpen ? "translate-x-[-300px]" : ""
        )}
      >
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {/* Title and Save Button Container */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            {/* Title Input */}
            <div className="w-full overflow-hidden">
              <Input
                type="text"
                value={title}
                onChange={handleTitleChange}
                className={cn(
                  "text-xl sm:text-2xl md:text-4xl font-bold w-full border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                  "placeholder:text-muted-foreground/50 placeholder:font-normal leading-[1.3]",
                  !title && "text-muted-foreground/50"
                )}
                placeholder="Untitled"
              />
            </div>
            {/* Save Button */}
            <div className="w-full sm:w-[100px] shrink-0">
              {hasChanges && (
                <Button
                  onClick={handleSave}
                  disabled={isPending}
                  className="w-full shadow-lg hover:shadow-xl transition-all"
                  size="sm"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <span className="sm:inline">Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      <span className="sm:inline">Save</span>
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Editor Area */}
          <div className="min-h-[calc(100vh-180px)] sm:min-h-[calc(100vh-200px)]">
            <div
              className={cn(
                "prose prose-base sm:prose-lg max-w-none",
                "prose-headings:font-title prose-headings:text-foreground",
                "prose-p:text-sm sm:prose-p:text-base prose-p:leading-relaxed prose-p:text-foreground/90",
                "prose-strong:text-foreground prose-strong:font-semibold",
                "prose-code:text-sm prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:rounded-md",
                "prose-blockquote:text-foreground/80 prose-blockquote:border-l-primary",
                "prose-img:rounded-lg prose-img:shadow-md prose-img:w-full prose-img:object-cover",
                "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                "[&_table]:text-sm [&_table]:sm:text-base",
                "[&_table]:w-[calc(100vw-2rem)] [&_table]:sm:w-full",
                "[&_table]:overflow-x-auto",
                "[&_ul]:pl-4 [&_ul]:sm:pl-6",
                "[&_ol]:pl-4 [&_ol]:sm:pl-6",
                "[&_pre]:text-sm [&_pre]:sm:text-base",
                "[&_pre]:p-2 [&_pre]:sm:p-4",
                "[&_pre]:overflow-x-auto",
                "dark:prose-invert"
              )}
            >
              <BodyEditor
                initialContent={content}
                onUpdate={handleContentChange}
                placeholder="Type '/' for commands..."
              />
            </div>
          </div>
        </div>
      </div>

      <AiChat
        isOpen={isAiChatOpen}
        onClose={closeAiChat}
        selectedText={selectedText}
        onClearSelection={() => setSelectedText("")}
      />
    </div>
  );
};
