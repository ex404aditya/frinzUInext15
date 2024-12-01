import { Note } from "@/lib/graphql/types";
import { SidebarItem } from "./sidebar.item";
import { FileText, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface NotesListProps {
  notes: Note[];
  workspaceId: string;
  onCreateNote: () => void;
  onUpdateNote: (noteId: string, title: string, content: string) => void; // Add this line
}

export default function NotesList({
  notes,
  workspaceId,
  onCreateNote,
  onUpdateNote,
}: NotesListProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-2 py-2">
        <h2 className="text-sm font-semibold text-muted-foreground pl-2">
          NOTES
        </h2>
        <Button
          variant="default"
          size="icon"
          className="h-8 w-8"
          onClick={onCreateNote}
        >
          <PlusIcon className="h-4 w-4" />
          <span className="sr-only">Create new note</span>
        </Button>
      </div>
      <ScrollArea className="flex-1 px-1">
        <div className="space-y-1">
          {notes.map((note) => (
            <SidebarItem
              key={note.id}
              title={note.title || "Untitled Note"}
              href={`/dashboard/${workspaceId}/note/${note.id}`}
              icon={<FileText className="h-4 w-4" />}
              selected={
                pathname === `/dashboard/${workspaceId}/note/${note.id}`
              }
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
