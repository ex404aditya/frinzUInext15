import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";

export const LinkPreview = ({ node }: NodeViewProps) => {
  return (
    <NodeViewWrapper className="link-preview">
      <a
        href={node.attrs.src}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        <div className="flex items-center space-x-4 p-4 border rounded-lg">
          <div className="flex-1">
            <div className="text-blue-600 hover:text-blue-800 break-all">
              {node.attrs.src}
            </div>
          </div>
          <div className="text-gray-500">↗</div>
        </div>
      </a>
    </NodeViewWrapper>
  );
};
