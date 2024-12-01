"use client";

import React from "react";
import {
  Heading1,
  List,
  CheckSquare,
  Code,
  Bold,
  Italic,
  Strikethrough,
  Quote,
  ListOrdered,
  Table,
  Link,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlashMenuProps {
  position: { x: number; y: number };
  onSelect: (command: string) => void;
  onClose: () => void;
  searchTerm: string;
}

export const SlashMenu: React.FC<SlashMenuProps> = ({
  position,
  onSelect,
  onClose,
  searchTerm,
}) => {
  const commands = [
    { id: "heading", icon: <Heading1 size={18} />, label: "Heading 1" },
    { id: "bold", icon: <Bold size={18} />, label: "Bold" },
    { id: "italic", icon: <Italic size={18} />, label: "Italic" },
    { id: "strike", icon: <Strikethrough size={18} />, label: "Strikethrough" },
    { id: "bullet-list", icon: <List size={18} />, label: "Bullet List" },
    {
      id: "ordered-list",
      icon: <ListOrdered size={18} />,
      label: "Ordered List",
    },
    { id: "task-list", icon: <CheckSquare size={18} />, label: "Task List" },
    { id: "code-block", icon: <Code size={18} />, label: "Code Block" },
    { id: "blockquote", icon: <Quote size={18} />, label: "Quote" },
    { id: "table", icon: <Table size={18} />, label: "Insert Table" },
    { id: "link", icon: <Link size={18} />, label: "Insert Link" },
  ];

  const filteredCommands = commands.filter((command) =>
    command.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!filteredCommands.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSelect(filteredCommands[selectedIndex].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredCommands, selectedIndex, onSelect]);

  // Reset selected index when search term changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  if (filteredCommands.length === 0) {
    return (
      <div
        className="absolute z-50 bg-gray-800 rounded-lg shadow-lg border border-gray-700 min-w-[200px]"
        style={{
          top: position.y,
          left: position.x,
        }}
      >
        <div className="p-4 text-gray-400">No matching commands found</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute z-50 rounded-lg shadow-lg border min-w-[200px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900",
        "bg-neutral-900 border-neutral-800"
      )}
      style={{
        top: position.y,
        left: position.x,
        maxHeight: "300px",
        overflowY: "auto",
      }}
    >
      <div className="p-2">
        {filteredCommands.map((command, index) => (
          <button
            key={command.id}
            className={cn(
              "flex items-center gap-2 w-full px-3 py-2 text-left rounded",
              index === selectedIndex
                ? "bg-gray-800 text-blue-400"
                : "hover:bg-gray-800 text-gray-300"
            )}
            onClick={() => onSelect(command.id)}
            onMouseEnter={() => setSelectedIndex(index)}
          >
            {command.icon}
            <span>{command.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
