import { Link } from "@tiptap/extension-link";

export const CustomLink = Link.configure({
  openOnClick: false,
  validate: (href) => /^https?:\/\//.test(href),
  HTMLAttributes: {
    class:
      "text-blue-600 hover:text-blue-800 decoration-blue-400/50 decoration-1 underline underline-offset-2 cursor-pointer transition-colors",
    rel: "noopener noreferrer",
    target: "_blank",
  },
});
