"use client";
import { gql } from "@apollo/client";
import { redirect } from "next/navigation";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Sidebar from "@/components/global/sidebar";
import InfoBar from "@/components/global/info-bar";
import { useApolloClient } from "@apollo/client"; // Ensure to use Apollo Client

// GraphQL Queries & Mutations
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

export const GET_USER_WORKSPACES = gql`
  query GetUserWorkspaces {
    userWorkspaces {
      id
      name
    }
  }
`;

type DashboardLayoutProps = {
  params: { workspaceId: string };
  children: React.ReactNode;
};

export default async function DashboardLayout({
  params,
  children,
}: DashboardLayoutProps) {
  // Await the params to ensure we have access to workspaceId
  const { workspaceId } = await params; // Use await here to resolve params

  // Initialize Apollo Client
  const client = useApolloClient(); // Apollo Client from the context

  // Fetch workspace access using GraphQL
  const { data: accessData, error: accessError } = await client.query({
    query: VERIFY_WORKSPACE_ACCESS,
    variables: { workspaceId },
  });

  // Redirect if there's no access or if the workspace is not found
  if (accessError || !accessData?.workspace) {
    redirect("/auth/sign-in");
    return null; // Stop execution after redirect
  }

  // Initialize QueryClient for React Query
  const query = new QueryClient();

  // Prefetch the user's workspaces using React Query
  await query.prefetchQuery({
    queryKey: ["user-workspaces"],
    queryFn: async () => {
      const { data } = await client.query({
        query: GET_USER_WORKSPACES,
      });
      return data.userWorkspaces; // Return user workspaces
    },
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex h-screen bg-background">
        <Sidebar activeWorkspaceId={workspaceId} />
        <div className="flex-1 flex flex-col transition-[margin] duration-300 ease-in-out lg:ml-[320px] data-[sidebar-collapsed=true]:lg:ml-20">
          <InfoBar />
          <main className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </HydrationBoundary>
  );
}
