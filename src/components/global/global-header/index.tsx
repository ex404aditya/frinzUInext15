"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { type PgTableWithColumns } from "drizzle-orm/pg-core";
import { workspaces } from "@/db/schema";

type WorkspaceType = typeof workspaces.$inferSelect;

type Props = {
  workspace: WorkspaceType;
};

const GlobalHeader = ({ workspace }: Props) => {
  const pathName = usePathname().split(`/dashboard/${workspace.id}`)[1];

  // Helper function to get the header title
  const getHeaderTitle = () => {
    if (!pathName) return "My Notes";

    if (pathName.includes("note")) {
      return ""; // Empty for note pages as we'll show the note title elsewhere
    }

    if (pathName.includes("settings")) {
      return "Settings";
    }

    // Default to first character uppercase + rest lowercase
    return pathName.charAt(1).toUpperCase() + pathName.slice(2).toLowerCase();
  };

  return (
    <article className="flex flex-col gap-2">
      <span className="text-[#707070] text-xs">WORKSPACE</span>
      <h1 className="text-4xl font-bold">{getHeaderTitle()}</h1>
    </article>
  );
};

export default GlobalHeader;
