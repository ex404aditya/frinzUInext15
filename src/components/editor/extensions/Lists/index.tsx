import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

export const ListExtensions = [
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc pl-6 [&>li]:pl-2 [&>li]:marker:text-foreground/80",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal pl-6 [&>li]:pl-2 [&>li]:marker:text-foreground/80",
    },
  }),
  ListItem.configure({
    HTMLAttributes: {
      class: "my-2",
    },
  }),
];
