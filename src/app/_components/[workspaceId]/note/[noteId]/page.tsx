"use client";
// app/dashboard/[workspaceId]/note/[noteId]/page.tsx

import { useQuery } from "@apollo/client";
import { NOTE, VERIFY_WORKSPACE_ACCESS } from "@/lib/graphql/workspace";
import { Editor } from "@/components/editor";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

// This function can be used to fetch data directly from Apollo Client
export default function NotePage({
  params,
}: {
  params: { noteId: string; workspaceId: string };
}) {
  const { noteId, workspaceId } = params;
  const router = useRouter();

  // Fetch workspace data (verify if the user has access)
  const {
    data: workspaceData,
    loading: workspaceLoading,
    error: workspaceError,
  } = useQuery(VERIFY_WORKSPACE_ACCESS, {
    variables: { workspaceId },
  });

  // Fetch the note details
  const {
    data: noteData,
    loading: noteLoading,
    error: noteError,
  } = useQuery(NOTE, {
    variables: { noteId },
  });

  // Handle redirection if workspace data is invalid or user has no access
  useEffect(() => {
    if (
      workspaceError ||
      !workspaceData ||
      workspaceData.workspace.user.id !== workspaceData.user.id
    ) {
      router.push("/auth/sign-in");
    }
  }, [workspaceData, workspaceError, router]);

  if (workspaceLoading || noteLoading) return <div>Loading...</div>;
  if (workspaceError || noteError) return <div>Error loading data!</div>;

  return (
    <div className="flex flex-col gap-4">
      {noteData && noteData.getNote ? (
        <Editor note={noteData.getNote} />
      ) : (
        <div>Note not found!</div>
      )}
    </div>
  );
}
