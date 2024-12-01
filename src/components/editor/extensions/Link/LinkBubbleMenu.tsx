import React, { useState, useEffect } from "react";
import { BubbleMenu, Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2, ExternalLink, Trash, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface LinkBubbleMenuProps {
  editor: Editor;
}

const getDisplayUrl = (url: string) => {
  try {
    const urlObject = new URL(url);
    return urlObject.hostname;
  } catch {
    return url.length > 30 ? url.substring(0, 30) + "..." : url;
  }
};

export const LinkBubbleMenu: React.FC<LinkBubbleMenuProps> = ({ editor }) => {
  const [url, setUrl] = useState(() => editor.getAttributes("link").href || "");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const currentUrl = editor.getAttributes("link").href;
    setUrl(currentUrl || "");
  }, [editor.getAttributes("link").href]);

  const setLink = () => {
    if (url) {
      const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;
      editor.chain().focus().setLink({ href: urlWithProtocol }).run();
    }
    setShowInput(false);
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const openLink = () => {
    const href = editor.getAttributes("link").href;
    if (href) window.open(href, "_blank");
  };

  return (
    <BubbleMenu
      className={cn(
        "flex items-center gap-1 p-1.5 bg-white rounded-lg shadow-lg border border-gray-200",
        "dark:bg-gray-800 dark:border-gray-700"
      )}
      tippyOptions={{ duration: 100 }}
      editor={editor}
      shouldShow={({ editor }) => editor.isActive("link")}
    >
      {showInput ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setLink();
          }}
          className="flex items-center gap-1"
        >
          <div className="relative flex items-center">
            <Link2 className="absolute left-2 w-4 h-4 text-gray-500" />
            <Input
              type="url"
              placeholder="Paste link"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={cn(
                "w-[240px] pl-8 h-8 text-sm bg-gray-50 border-gray-200",
                "focus-visible:ring-1 focus-visible:ring-gray-200",
                "dark:bg-gray-900 dark:border-gray-700"
              )}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowInput(false);
                }
              }}
              autoFocus
            />
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "h-8 w-8 p-0 hover:bg-gray-100",
                "dark:hover:bg-gray-700"
              )}
              onClick={() => setShowInput(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              type="submit"
              className={cn(
                "h-8 w-8 p-0 bg-blue-500 hover:bg-blue-600",
                "dark:bg-blue-600 dark:hover:bg-blue-700"
              )}
            >
              <Check className="w-4 h-4 text-white" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowInput(true)}
            className={cn(
              "h-8 px-3 text-sm font-normal text-gray-700 hover:bg-gray-100",
              "dark:text-gray-200 dark:hover:bg-gray-700"
            )}
          >
            <Link2 className="w-4 h-4 mr-2" />
            {getDisplayUrl(url)}
          </Button>
          <div className="h-4 w-px bg-gray-200 dark:bg-gray-700" />
          <Button
            size="sm"
            variant="ghost"
            onClick={openLink}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={removeLink}
            className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500 hover:text-red-600"
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      )}
    </BubbleMenu>
  );
};
