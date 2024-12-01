import CodeBlock from "@tiptap/extension-code-block";

export const CodeBlockExtension = CodeBlock.configure({
  HTMLAttributes: {
    class: "rounded-lg bg-muted p-4 font-mono text-sm",
  },
});
