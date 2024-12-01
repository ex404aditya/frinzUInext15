import { gql } from "@apollo/client";

export const VERIFY_WORKSPACE_ACCESS = gql`
  query VerifyWorkspaceAccess($workspaceId: String!) {
    workspace(id: $workspaceId) {
      id
      name
      user {
        id
        clerkid
      }
    }
  }
`;

export const WORKSPACES = gql`
  query Workspaces {
    getWorkspaces {
      id
      name
    }
  }
`;

export const WORKSPACE_NOTES = gql`
  query WorkspaceNotes($workspaceId: String!) {
    getWorkspaceNotes(workspaceId: $workspaceId) {
      id
      title
      content
      created_at
      user_id
    }
  }
`;

export const CREATE_WORKSPACE = gql`
  mutation CreateWorkspace($name: String!) {
    createWorkspace(name: $name) {
      id
      name
      user_id
    }
  }
`;

export const CREATE_NOTE = gql`
  mutation CreateNote($workspaceId: String!, $title: String) {
    createNote(workspaceId: $workspaceId, title: $title) {
      id
      title
      content
      created_at
      workspace_id {
        id
      }
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation UpdateNote($noteId: String!, $title: String!, $content: String!) {
    updateNote(noteId: $noteId, title: $title, content: $content) {
      id
      title
      content
      created_at
    }
  }
`;

export const DELETE_NOTE = gql`
  mutation DeleteNote($noteId: String!) {
    deleteNote(noteId: $noteId)
  }
`;

export const NOTE = gql`
  query Note($noteId: String!) {
    getNote(noteId: $noteId) {
      id
      title
      content
      created_at
      workspace_id
      user_id
    }
  }
`;
