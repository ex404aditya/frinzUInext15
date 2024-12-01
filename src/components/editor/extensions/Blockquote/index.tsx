import Blockquote from "@tiptap/extension-blockquote";

export const BlockquoteExtension = Blockquote.configure({
  HTMLAttributes: {
    class: "border-l-4 border-primary/30 pl-4 italic",
  },
});
