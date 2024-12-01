import React from "react";
import { NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";

export const TwitterEmbed = ({ node }: NodeViewProps) => {
  return (
    <NodeViewWrapper className="embed-container">
      <iframe
        src={`https://platform.twitter.com/embed/Tweet.html?id=${node.attrs.tweetId}`}
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
      />
    </NodeViewWrapper>
  );
};
