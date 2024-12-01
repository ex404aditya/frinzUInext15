import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

export const TableExtensions = [
  Table.configure({
    HTMLAttributes: {
      class: "border-collapse table-auto w-full border border-border",
    },
  }),
  TableRow.configure({
    HTMLAttributes: {
      class: "border border-border",
    },
  }),
  TableHeader.configure({
    HTMLAttributes: {
      class: "border border-border bg-muted px-3 py-2 text-left font-bold",
    },
  }),
  TableCell.configure({
    HTMLAttributes: {
      class: "border border-border px-3 py-2 text-foreground",
    },
  }),
];
