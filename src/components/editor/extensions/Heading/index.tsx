import Heading from "@tiptap/extension-heading";

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
