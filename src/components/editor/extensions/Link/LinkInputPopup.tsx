import React, { useState } from "react";
import { Editor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface LinkInputPopupProps {
  editor: Editor;
  position: { x: number; y: number };
  onClose: () => void;
}

export const LinkInputPopup: React.FC<LinkInputPopupProps> = ({
  editor,
  position,
  onClose,
}) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchMetadata = async (url: string) => {
    try {
      const response = await fetch("/api/metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    const urlWithProtocol = url.startsWith("http") ? url : `https://${url}`;
    const metadata = await fetchMetadata(urlWithProtocol);
    setLoading(false);

    let embedHtml = "";

    if (metadata?.type === "video" && metadata.url) {
      // Video embeds (YouTube, Vimeo, etc.)
      embedHtml = `<div class="my-2 rounded-lg overflow-hidden"><iframe src="${metadata.url}" class="w-full aspect-video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
    } else if (metadata?.image || metadata?.title || metadata?.description) {
      // Rich preview for links with metadata
      embedHtml = `<div class="my-2 max-w-2xl"><a href="${urlWithProtocol}" target="_blank" rel="noopener noreferrer" class="block no-underline"><div class="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">${
        metadata.image
          ? `<img src="${metadata.image}" alt="" class="w-full h-48 object-cover"/>`
          : ""
      }<div class="p-3 space-y-1">${
        metadata.title
          ? `<div class="font-medium text-neutral-900 dark:text-neutral-100">${metadata.title}</div>`
          : ""
      }${
        metadata.description
          ? `<div class="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">${metadata.description}</div>`
          : ""
      }</div></div></a></div>`;
    } else {
      // Simple fallback for links without metadata
      embedHtml = `<a href="${urlWithProtocol}" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:underline">${urlWithProtocol}</a>`;
    }

    editor.chain().focus().insertContent(embedHtml).run();
    onClose();
  };

  return (
    <div
      className="absolute bg-neutral-900 rounded-lg shadow-lg border-neutral-800 p-4 z-50 w-[400px]"
      style={{ left: position.x, top: position.y }}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="url" className="text-sm font-medium text-neutral-200">
            Add a link
          </label>
          <div className="relative">
            <Input
              id="url"
              type="text"
              placeholder="Paste or type a link..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-neutral-800 border-neutral-700 text-neutral-100 placeholder:text-neutral-400"
              autoFocus
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-300 hover:bg-neutral-800"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading || !url}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "Add link"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
