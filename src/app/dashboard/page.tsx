// This file should be a Server Component

import { createApolloClient } from "@/lib/apollo";
import { WORKSPACES } from "@/lib/graphql/workspace";
import { currentUser } from "@clerk/nextjs/server"; // Use server-side Clerk method
import { redirect } from "next/navigation";

type DashboardPageProps = {};

const DashboardPage = async ({}: DashboardPageProps) => {
  // Get the current logged-in user from Clerk (server-side)
  const user = await currentUser(); // Server-side function

  if (!user) {
    return redirect("/auth/sign-in"); // Redirect if no user
  }

  // Create Apollo client and fetch workspaces for the logged-in user
  const apolloClient = createApolloClient(user?.id || null);
  const { data } = await apolloClient.query({
    query: WORKSPACES,
    variables: { userId: user.id },
  });

  const workspaces = data.getWorkspaces;

  // If the user has workspaces, redirect to the first workspace
  if (workspaces && workspaces.length > 0) {
    return redirect(`/dashboard/${workspaces[0].id}`);
  }

  // If no workspaces, redirect to create a workspace page
  return redirect("/auth/sign-in");
};

export default DashboardPage;
