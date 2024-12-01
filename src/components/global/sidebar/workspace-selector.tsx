import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

interface WorkspaceSelectorProps {
  workspaces: Array<{ id: string; name: string; imageUrl?: string }>;
  activeWorkspaceId: string;
  onChangeActiveWorkspace: (value: string) => void;
}

export function WorkspaceSelector({
  workspaces,
  activeWorkspaceId,
  onChangeActiveWorkspace,
}: WorkspaceSelectorProps) {
  const activeWorkspace = workspaces.find((w) => w.id === activeWorkspaceId);

  return (
    <div className="p-4 pt-4">
      <Select
        defaultValue={activeWorkspaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className="w-full border-0 focus:ring-0 hover:bg-accent transition-colors h-12">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-[5px] flex items-center justify-center bg-orange-300">
              <span className="text-xl font-semibold text-orange-900">
                {activeWorkspace?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <SelectValue>
              <span className="text-lg font-normal">
                {activeWorkspace?.name
                  .split(" ")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ") || "Select workspace"}
              </span>
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent className="w-[var(--radix-select-trigger-width)] bg-background">
          <SelectGroup>
            <SelectLabel className="text-xs text-muted-foreground uppercase py-2 px-4">
              Workspaces
            </SelectLabel>
            <div className="p-2">
              {workspaces.map((workspace) => (
                <SelectItem
                  key={workspace.id}
                  value={workspace.id}
                  className="rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {workspace.name
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </div>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
