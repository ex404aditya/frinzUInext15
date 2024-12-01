"use client";

import { useState, useCallback, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { TaskListExtensions } from "./extensions/TaskList";
import { CodeBlockExtension } from "./extensions/CodeBlock";
import { BlockquoteExtension } from "./extensions/Blockquote";
import { SlashMenu } from "./SlashMenu";
import { cn } from "@/lib/utils";
import { CustomLink } from "./extensions/Link";
import { LinkBubbleMenu } from "./extensions/Link/LinkBubbleMenu";
import { LinkInputPopup } from "./extensions/Link/LinkInputPopup";
import Image from "@tiptap/extension-image";
import { EmbedNode } from "./extensions/Embed";
import { ListExtensions } from "./extensions/Lists";
import Heading from "@tiptap/extension-heading";
import { TableExtensions } from "./extensions/Table";

interface BodyEditorProps {
  className?: string;
  initialContent?: string | null;
  onUpdate?: (content: string) => void;
  placeholder?: string;
}

export const BodyEditor = ({
  className,
  initialContent,
  onUpdate,
  placeholder,
}: BodyEditorProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkInputPosition, setLinkInputPosition] = useState({ x: 0, y: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        codeBlock: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Placeholder.configure({
        placeholder: placeholder || 'Type "/" for commands',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        emptyNodeClass: "is-empty",
      }),
      ...TaskListExtensions,
      CodeBlockExtension,
      BlockquoteExtension,
      CustomLink,
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      HeadingExtension,
      ...TableExtensions,
      EmbedNode,
      ...ListExtensions,
    ],
    content: initialContent || "",
    autofocus: true,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(
          // Base styles
          "prose prose-lg dark:prose-invert max-w-none",
          "focus:outline-none",

          // Typography
          "prose-headings:font-semibold prose-headings:tracking-tight",
          "prose-h1:text-3xl prose-h1:mt-8 prose-h1:mb-4",
          "prose-h2:text-2xl prose-h2:mt-6 prose-h2:mb-3",
          "prose-h3:text-xl prose-h3:mt-4 prose-h3:mb-2",
          "prose-p:leading-7",

          // Lists
          "prose-ul:list-disc prose-ol:list-decimal",
          "[&_ul]:pl-6 [&_ol]:pl-6",
          "[&_ul>li]:relative [&_ol>li]:relative",
          "[&_ul>li]:pl-2 [&_ol>li]:pl-2",
          "[&_ul>li]:my-2 [&_ol>li]:my-2",
          "[&_ul>li]:marker:text-foreground/80",
          "[&_ol>li]:marker:text-foreground/80",

          // Task lists
          "[&_.task-list]:list-none [&_.task-list]:pl-2",
          "[&_.task-item]:gap-2 [&_.task-item]:my-1",
          "[&_.task-item>label]:cursor-pointer",
          "[&_.task-item>label]:text-base",
          "[&_.task-item>label]:leading-7",

          // Links
          "[&_a]:text-primary [&_a]:no-underline [&_a]:border-b [&_a]:border-primary/30",
          "[&_a:hover]:border-primary/60",

          // Code blocks
          "prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5",
          "prose-pre:rounded-lg prose-pre:bg-muted",

          // Quotes
          "prose-blockquote:border-l-2 prose-blockquote:border-muted-foreground/30",
          "prose-blockquote:pl-6 prose-blockquote:italic",

          // Tables
          "prose-table:border prose-table:border-border",
          "prose-th:border prose-th:border-border prose-th:p-2",
          "prose-td:border prose-td:border-border prose-td:p-2",

          // Images and embeds
          "[&_.embed-container]:my-4 [&_.embed-container]:rounded-lg [&_.embed-container]:overflow-hidden",
          "[&_.embed-container_iframe]:w-full [&_.embed-container_iframe]:aspect-video",
          "[&_.link-preview]:transition-colors [&_.link-preview]:duration-200",
          "[&_.link-preview:hover]:bg-muted",

          // Empty state
          "[&_.is-empty::before]:text-muted-foreground/50",
          "[&_.is-empty::before]:float-left",
          "[&_.is-empty::before]:h-0",
          "[&_.is-empty::before]:pointer-events-none",
          "[&_.is-empty::before]:content-[attr(data-placeholder)]",
          "[&_p.is-empty:not(:focus):before]:text-muted-foreground/40",
          "[&_p.is-empty:before]:content-[attr(data-placeholder)]",
          "[&_p.is-empty:before]:float-left",
          "[&_p.is-empty:before]:pointer-events-none",
          "[&_p.is-empty:before]:h-0",

          className
        ),
      },
      handleKeyDown: (view, event) => {
        if (event.key === "/") {
          const { from } = view.state.selection;
          const coords = view.coordsAtPos(from);
          const editorDiv = view.dom.parentElement;

          if (editorDiv) {
            const editorRect = editorDiv.getBoundingClientRect();
            const x = coords.left - editorRect.left;
            const y = coords.top - editorRect.top + 24;
            setSlashMenuPosition({ x, y });
            setShowSlashMenu(true);
            setSearchTerm("");
          }
          return false;
        }
        if (showSlashMenu) {
          if (event.key === "Escape") {
            setShowSlashMenu(false);
            setSearchTerm("");
            return true;
          }

          if (event.key === "Backspace" && searchTerm === "") {
            setShowSlashMenu(false);
            return false;
          }

          if (event.key.length === 1) {
            setSearchTerm((prev) => prev + event.key);
          }
        }
        if (event.key === "Enter") {
          setShowPlaceholder(true);
          return false;
        }

        if (event.key.length === 1) {
          setShowPlaceholder(false);
          return false;
        }

        return false;
      },
      handlePaste: (view, event) => {
        const text = event.clipboardData?.getData("text/plain");

        if (!text) return false;

        const isImageUrl = text.match(/\.(jpeg|jpg|gif|png)$/) != null;
        const isYoutubeUrl =
          text.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
          ) != null;
        const tweetMatch = text.match(
          /twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)/
        );
        const isValidUrl = text.match(/^(https?:\/\/[^\s]+)$/);

        if (isValidUrl) {
          event.preventDefault();

          if (isImageUrl) {
            editor?.commands.setImage({ src: text });
            return true;
          }

          if (isYoutubeUrl) {
            const videoId = text.match(
              /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
            )?.[1];
            if (videoId) {
              editor?.commands.setEmbed({
                type: "youtube",
                src: `https://www.youtube.com/embed/${videoId}`,
              });
              return true;
            }
          }

          if (tweetMatch) {
            const tweetId = tweetMatch[3];
            editor?.commands.setEmbed({
              type: "twitter",
              src: text,
              tweetId,
            });
            return true;
          }

          // For other URLs, create a link preview
          editor?.commands.setEmbed({
            type: "link",
            src: text,
          });
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onUpdate?.(html);
    },
    onFocus: ({ editor }) => {
      const isEmpty = editor.isEmpty;
      setShowPlaceholder(isEmpty);
    },
    onBlur: () => {
      setShowPlaceholder(false);
    },
    onCreate: ({ editor }) => {
      const isEmpty = editor.isEmpty;
      setShowPlaceholder(isEmpty);
    },
  });

  useEffect(() => {
    if (editor && initialContent !== undefined && editor.isEditable) {
      try {
        const currentContent = editor.getHTML();
        if (currentContent !== initialContent) {
          editor
            .chain()
            .focus()
            .setContent(initialContent || "")
            .run();
        }
      } catch (error) {
        console.error("Error setting editor content:", error);
      }
    }
  }, [editor, initialContent]);

  const handleSlashCommand = useCallback(
    (command: string) => {
      if (!editor) return;

      // Remove the slash command text
      const { from } = editor.state.selection;
      editor.commands.deleteRange({
        from: from - (searchTerm.length + 1),
        to: from,
      });

      switch (command) {
        case "heading":
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          break;
        case "bold":
          editor.chain().focus().toggleBold().run();
          break;
        case "italic":
          editor.chain().focus().toggleItalic().run();
          break;
        case "strike":
          editor.chain().focus().toggleStrike().run();
          break;
        case "bullet-list":
          editor.chain().focus().toggleBulletList().run();
          break;
        case "ordered-list":
          editor.chain().focus().toggleOrderedList().run();
          break;
        case "task-list":
          editor.chain().focus().toggleTaskList().run();
          break;
        case "code-block":
          editor.chain().focus().toggleCodeBlock().run();
          break;
        case "blockquote":
          editor.chain().focus().toggleBlockquote().run();
          break;
        case "table":
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run();
          break;
        case "link":
          const { from } = editor.state.selection;
          const coords = editor.view.coordsAtPos(from);
          const editorDiv = editor.view.dom.parentElement;

          if (editorDiv) {
            const editorRect = editorDiv.getBoundingClientRect();
            const x = coords.left - editorRect.left;
            const y = coords.top - editorRect.top + 24;
            setLinkInputPosition({ x, y });
            setShowLinkInput(true);
          }
          break;
      }
      setShowSlashMenu(false);
      setSearchTerm("");
    },
    [editor, searchTerm]
  );

  if (!editor) return null;

  return (
    <div className="relative">
      <div
        className={cn(
          "rounded-lg",
          "transition-colors duration-200",
          "min-h-[200px]"
        )}
      >
        <EditorContent editor={editor} />
        <LinkBubbleMenu editor={editor} />
        {showSlashMenu && (
          <SlashMenu
            position={slashMenuPosition}
            onSelect={handleSlashCommand}
            onClose={() => {
              setShowSlashMenu(false);
              setSearchTerm("");
            }}
            searchTerm={searchTerm}
          />
        )}
        {showLinkInput && (
          <LinkInputPopup
            editor={editor}
            position={linkInputPosition}
            onClose={() => setShowLinkInput(false)}
          />
        )}
      </div>
    </div>
  );
};

export const HeadingExtension = Heading.configure({
  levels: [1, 2, 3],
  HTMLAttributes: {
    class: "text-foreground",
  },
}).extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level;
    const classes = {
      1: "text-3xl font-bold mt-8 mb-4",
      2: "text-2xl font-bold mt-6 mb-3",
      3: "text-xl font-bold mt-4 mb-2",
    };

    return [
      `h${level}`,
      {
        ...HTMLAttributes,
        class: `${HTMLAttributes.class} ${
          classes[level as keyof typeof classes]
        }`,
      },
      0,
    ];
  },
});
