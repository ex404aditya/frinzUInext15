import React from "react";
import { NodeViewWrapper } from "@tiptap/react";

export const TableComponent: React.FC = () => {
  return (
    <NodeViewWrapper className="relative table-wrapper my-4">
      <div className="overflow-x-auto">
        <table />
      </div>
    </NodeViewWrapper>
  );
};
