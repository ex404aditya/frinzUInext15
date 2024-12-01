"use client";

import React from "react";
import {
  Menu,
  Settings,
  UserPlus,
  Lightbulb,
  Home,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery, useMutation } from "@apollo/client";
import {
  WORKSPACE_NOTES,
  CREATE_NOTE,
  UPDATE_NOTE,
  WORKSPACES,
} from "@/lib/graphql/workspace"; // Assuming these are in a graphql/queries.js file
import { WorkspaceProps, WorkspaceNotesProps, Note } from "@/lib/graphql/types";
import NotesList, { NotesListProps } from "./notes-list";
import { WorkspaceSelector } from "./workspace-selector";

type Props = {
  activeWorkspaceId: string;
};

export default function Sidebar({ activeWorkspaceId }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  // Apollo Client's useQuery hook for fetching workspaces
  const { data: workspacesData, loading: workspacesLoading } =
    useQuery<WorkspaceProps>(WORKSPACES);

  // Apollo Client's useQuery hook for fetching notes
  const { data, loading: notesIsPending } = useQuery<WorkspaceNotesProps>(
    WORKSPACE_NOTES,
    {
      variables: { workspaceId: activeWorkspaceId },
    }
  );

  const workspaceNotes = data?.data || []; // Access the correct property "data" here

  // Use Apollo Client's mutation hook for creating a note
  const [createNote] = useMutation(CREATE_NOTE, {
    onCompleted: (data) => {
      if (data.createNote) {
        router.push(
          `/dashboard/${activeWorkspaceId}/note/${data.createNote.id}`
        );
      }
    },
  });

  // Use Apollo Client's mutation hook for updating a note
  const [updateNote] = useMutation(UPDATE_NOTE, {
    onCompleted: (data) => {
      if (data.updateNote) {
        router.push(
          `/dashboard/${activeWorkspaceId}/note/${data.updateNote.id}`
        );
      }
    },
  });

  // Handle workspace change
  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  // Handle creating a new note
  const handleCreateNote = () => {
    createNote({
      variables: { workspaceId: activeWorkspaceId, title: "Untitled Note" },
    });
  };

  // Handle updating an existing note
  const handleUpdateNote = (noteId: string, title: string, content: string) => {
    updateNote({
      variables: {
        noteId,
        title,
        content,
      },
    });
  };

  const SidebarContent = (
    <div className="flex flex-col h-full w-80 bg-background/95 backdrop-blur-sm border-r rounded-r-lg">
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Workspace Selector */}
        <WorkspaceSelector
          workspaces={workspacesData?.data || []} // Correctly using 'data'
          activeWorkspaceId={activeWorkspaceId}
          onChangeActiveWorkspace={onChangeActiveWorkspace}
        />

        {/* Home and Search Buttons */}
        <div className="p-4">
          <Button
            variant="default"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent mb-2"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <Button
            variant="default"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent mb-2"
          >
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Notes List */}
        <ScrollArea className="flex-1 px-4">
          {notesIsPending ? (
            <div className="flex items-center justify-center w-full py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-1">
              <NotesList
                notes={workspaceNotes as Note[]}
                workspaceId={activeWorkspaceId}
                onCreateNote={handleCreateNote}
                onUpdateNote={handleUpdateNote}
              />
            </div>
          )}
        </ScrollArea>

        {/* Settings and Invite Buttons */}
        <div className="p-4">
          <Button
            variant="default"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent mb-2"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <Button
            variant="default"
            className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent mb-2"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Invite
          </Button>
        </div>

        {/* AI Assistant Card */}
        <div className="p-4">
          <div className="rounded-lg bg-gradient-to-br from-violet-500 via-violet-600 to-violet-700 p-4 shadow-lg shadow-violet-500/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center">
                <Lightbulb className="h-3 w-3 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white tracking-tight">
                frinz ai
              </h3>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-white/90 text-xs">
                  <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono">
                    cmd
                  </kbd>
                  <span>+</span>
                  <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-[10px] font-mono">
                    k
                  </kbd>
                  <span>to use</span>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  Frinz AI simplifies research and writing, empowering your
                  creativity.
                </p>
              </div>

              <div className="bg-white/10 rounded p-2 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-white/90">
                    Available Requests
                  </span>
                  <span className="text-[10px] text-white/70 bg-white/20 px-1.5 py-0.5 rounded-full">
                    Unlimited
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <div className="text-lg font-bold text-white">25</div>
                  <div className="text-sm text-white/80">/</div>
                  <div className="text-lg font-bold text-white">25</div>
                </div>
                <div className="w-full h-1 bg-white/20 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-white rounded-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {/* Mobile Sheet */}
      <div className="lg:hidden fixed top-0 left-0 z-40 m-4">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              ref={buttonRef}
              variant="outline"
              size="icon"
              onClick={(e) => {
                e.stopPropagation(); // Prevent event bubbling
                setIsOpen((prev) => !prev);
              }}
              onFocus={() => {
                // Ensure button stays focused
                buttonRef.current?.focus();
              }}
            >
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 w-80"
            onInteractOutside={(e) => {
              e.preventDefault(); // Prevent closing on outside click
              buttonRef.current?.focus(); // Keep focus on button
            }}
            onEscapeKeyDown={() => {
              setIsOpen(false);
              buttonRef.current?.focus(); // Return focus to button when closing
            }}
          >
            {SidebarContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-80">
        {SidebarContent}
      </div>
    </>
  );
}
