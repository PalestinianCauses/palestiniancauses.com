// REVIEWED

import type { Block } from "payload";

export const Code: Block = {
  slug: "code",
  interfaceName: "CodeBlock",
  fields: [
    {
      name: "file",
      label: "File",
      type: "text",
      required: true,
    },
    {
      name: "language",
      label: "Language",
      type: "select",
      options: [
        { label: "HTML", value: "html" },
        { label: "CSS", value: "css" },
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "JSX", value: "jsx" },
        { label: "TSX", value: "tsx" },
      ],
      defaultValue: "typescript",
      required: true,
    },
    {
      name: "code",
      label: "Code",
      type: "code",
      required: true,
    },
  ],
};
