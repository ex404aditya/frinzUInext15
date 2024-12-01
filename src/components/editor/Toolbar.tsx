"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import { Type, List, CheckSquare, Code } from "lucide-react";

interface ToolbarProps {
  editor: Editor;
}

export const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  if (!editor) return null;

  const items = [
    {
      icon: <Type size={18} />,
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <List size={18} />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <CheckSquare size={18} />,
      title: "Task List",
      action: () => editor.chain().focus().toggleTaskList().run(),
      isActive: editor.isActive("taskList"),
    },
    {
      icon: <Code size={18} />,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
    },
  ];

  return (
    <div className="flex gap-2 p-2 overflow-x-auto">
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.action}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm ${
            item.isActive
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {item.icon}
          <span>{item.title}</span>
        </button>
      ))}
    </div>
  );
};
