"use client";

import { createApolloClient } from "@/lib/apollo";
import { WORKSPACE_NOTES } from "@/lib/graphql/workspace";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Note } from "@/lib/graphql/types";

const WorkspacePage = ({ params }: { params: { workspaceId: string } }) => {
  const [user, setUser] = useState<any>(null);
  const { workspaceId } = params;
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/getUser");
      const data = await res.json();
      setUser(data);
    }
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading user data...</div>;
  }

  const {
    data: notesData,
    isLoading,
    error,
  } = useQuery<Note[]>({
    queryKey: ["workspaceNotes", workspaceId],
    queryFn: async () => {
      const client = createApolloClient(user.id);
      const { data } = await client.query({
        query: WORKSPACE_NOTES,
        variables: { workspaceId },
      });
      // Return the array of notes directly
      return data.notes; // Assuming `data` contains a `notes` array from the GraphQL query
    },
    enabled: !!workspaceId, // Optional: only run if workspaceId is defined
  });

  if (isLoading) {
    return <div>Loading workspace notes...</div>;
  }

  if (error) {
    console.error("Error fetching workspace notes:", error);
    return <div>Error loading notes. Please try again later.</div>;
  }

  const notes: Note[] = notesData || [];

  if (notes.length === 0) {
    return (
      <div>
        <h2>No notes found</h2>
        <button onClick={() => router.push("/dashboard")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Notes for Workspace {workspaceId}</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h2>{note.title || "Untitled Note"}</h2>
            <p>{note.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkspacePage;
