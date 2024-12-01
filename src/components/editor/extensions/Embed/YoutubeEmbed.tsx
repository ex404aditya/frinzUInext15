import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";

export const YoutubeEmbed = ({ node }: NodeViewProps) => {
  return (
    <NodeViewWrapper className="embed-container">
      <iframe
        src={node.attrs.src}
        width="100%"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </NodeViewWrapper>
  );
};
