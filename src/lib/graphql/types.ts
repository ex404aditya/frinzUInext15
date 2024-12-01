// Defining the GraphQL types for the schema

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  created_at: number;
  clerkid: string;
  image: string;
}

export interface Workspace {
  id: string;
  name: string;
  user_id: string; // user_id as per your server-side data
  created_at: number;
}

export interface Note {
  id: string;
  title: string | null;
  content: string | null;
  workspace_id: string; // Ensured consistency with your server-side data
  user_id: string; // Ensured consistency with your server-side data
  created_at: Date; // Consistent with your database and server-side schema
}

export interface WorkspaceProps {
  status: number;
  data: Workspace[];
}

export interface WorkspaceNotesProps {
  status: number;
  data: Note[];
}

// Query responses
export interface GetUserWorkspacesQuery {
  getWorkspaces: Workspace[]; // Corrected to match query result structure
}

export interface GetWorkspaceNotesQuery {
  getWorkspaceNotes: Note[]; // Ensured consistency with query result
}

export interface GetNoteQuery {
  getNote: Note; // Ensured consistency with query result
}

// Mutation responses
export interface CreateWorkspaceMutation {
  createWorkspace: Workspace; // Corrected to match mutation result structure
}

export interface CreateNoteMutation {
  createNote: Note; // Corrected to match mutation result structure
}

export interface UpdateNoteMutation {
  updateNote: Note; // Corrected to match mutation result structure
}

export interface DeleteNoteMutation {
  deleteNote: string; // Corrected to match mutation result structure
}
