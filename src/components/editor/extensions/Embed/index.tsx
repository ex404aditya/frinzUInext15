import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react";
import { NodeViewProps } from "@tiptap/core";
import React from "react";

const YoutubeEmbed = (props: NodeViewProps) => {
  return (
    <NodeViewWrapper className="embed-container">
      <iframe
        src={props.node.attrs.src}
        width="100%"
        height="315"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </NodeViewWrapper>
  );
};

const TwitterEmbed = (props: NodeViewProps) => {
  return (
    <NodeViewWrapper className="embed-container">
      <iframe
        src={`https://platform.twitter.com/embed/Tweet.html?id=${props.node.attrs.tweetId}`}
        width="100%"
        height="400"
        frameBorder="0"
        allowFullScreen
      />
    </NodeViewWrapper>
  );
};

const LinkPreview = (props: NodeViewProps) => {
  return (
    <NodeViewWrapper className="link-preview">
      <a
        href={props.node.attrs.src}
        target="_blank"
        rel="noopener noreferrer"
        className="no-underline"
      >
        <div className="flex items-center space-x-4 p-4 border rounded-lg">
          <div className="flex-1">
            <div className="text-blue-600 hover:text-blue-800 break-all">
              {props.node.attrs.src}
            </div>
          </div>
          <div className="text-gray-500">↗</div>
        </div>
      </a>
    </NodeViewWrapper>
  );
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    embed: {
      setEmbed: (options: {
        src: string;
        type?: "youtube" | "twitter" | "link";
        tweetId?: string;
      }) => ReturnType;
    };
  }
}

export const EmbedNode = Node.create({
  name: "embed",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      type: {
        default: "link",
      },
      tweetId: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[class="embed-container"]',
        getAttrs: (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const iframe = element.querySelector("iframe");
          return {
            src: iframe?.getAttribute("src"),
            type: element.dataset.type || "link",
            tweetId: element.dataset.tweetId,
          };
        },
      },
      {
        tag: 'div[class="link-preview"]',
        getAttrs: (element) => {
          if (!(element instanceof HTMLElement)) return false;
          const link = element.querySelector("a");
          return {
            src: link?.getAttribute("href"),
            type: "link",
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { type } = HTMLAttributes;
    const commonAttrs = { "data-type": type };

    if (type === "link") {
      return [
        "div",
        { class: "link-preview", ...commonAttrs },
        ["a", { href: HTMLAttributes.src }],
      ];
    }

    return [
      "div",
      {
        class: "embed-container",
        ...commonAttrs,
        "data-tweet-id": HTMLAttributes.tweetId,
      },
      ["iframe", HTMLAttributes],
    ];
  },

  addCommands() {
    return {
      setEmbed:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer((props: NodeViewProps) => {
      switch (props.node.attrs.type) {
        case "youtube":
          return <YoutubeEmbed {...props} />;
        case "twitter":
          return <TwitterEmbed {...props} />;
        default:
          return <LinkPreview {...props} />;
      }
    });
  },
});
