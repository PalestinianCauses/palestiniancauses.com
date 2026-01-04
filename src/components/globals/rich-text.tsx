// REVIEWED - 01

import {
  DefaultNodeTypes,
  SerializedBlockNode,
} from "@payloadcms/richtext-lexical";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import {
  JSXConvertersFunction,
  RichText as PayloadRichText,
} from "@payloadcms/richtext-lexical/react";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { CodeBlock, PropsCodeBlock } from "@/blocks/code/server";
import { isString } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { BlogsRoom } from "@/payload-types";

import { Button } from "../ui/button";

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<PropsCodeBlock>;

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  link: ({ node }) =>
    node.fields.url &&
    "text" in node.children[0] &&
    isString(node.children[0].text) && (
      <Button
        variant="link"
        size="sm"
        className="m-0 p-0 font-medium underline-offset-2 hover:underline-offset-2"
        style={{ fontSize: "inherit" }}
        asChild>
        <Link href={node.fields.url}>
          <ExternalLinkIcon className="transition-all duration-100 ease-in-out" />
          {node.children[0].text}
        </Link>
      </Button>
    ),
  blocks: { code: ({ node }) => <CodeBlock {...node.fields} /> },
});

export const RichText = function RichText({
  data,
  color,
  className,
}: {
  data: SerializedEditorState;
  color?: BlogsRoom["color"];
  className?: string;
}) {
  if (!data) return null;

  return (
    <article
      className={cn(
        "my-prose prose prose-zinc mx-auto dark:prose-invert lg:prose-lg xl:prose-xl",
        "prose-headings:font-medium",
        "prose-strong:font-medium",
        "[&_span[style_*=_'text-decoration:_underline']]:underline-offset-2",
        {
          "prose-a:decoration-red-500 prose-blockquote:border-red-500 prose-li:marker:text-red-500 [&.my-prose_.list-check_li_input[checked]]:bg-red-500 [&.my-prose_a:hover_svg]:text-red-500 [&.my-prose_span[style_*=_'text-decoration:_line-through']]:!decoration-red-500 [&.my-prose_span[style_*=_'text-decoration:_underline']]:!decoration-red-500":
            color === "red",
          "prose-a:decoration-yellow-500 prose-blockquote:border-yellow-500 prose-li:marker:text-yellow-500 [&.my-prose_.list-check_li_input[checked]]:bg-yellow-500 [&.my-prose_a:hover_svg]:text-yellow-500 [&.my-prose_span[style_*=_'text-decoration:_line-through']]:!decoration-yellow-500 [&.my-prose_span[style_*=_'text-decoration:_underline']]:!decoration-yellow-500":
            color === "yellow",
          "prose-a:decoration-green-500 prose-blockquote:border-green-500 prose-li:marker:text-green-500 [&.my-prose_.list-check_li_input[checked]]:bg-green-500 [&.my-prose_a:hover_svg]:text-green-500 [&.my-prose_span[style_*=_'text-decoration:_line-through']]:!decoration-green-500 [&.my-prose_span[style_*=_'text-decoration:_underline']]:!decoration-green-500":
            color === "green",
          "prose-a:decoration-teal-500 prose-blockquote:border-teal-500 prose-li:marker:text-teal-500 [&.my-prose_.list-check_li_input[checked]]:bg-teal-500 [&.my-prose_a:hover_svg]:text-teal-500 [&.my-prose_span[style_*=_'text-decoration:_line-through']]:!decoration-teal-500 [&.my-prose_span[style_*=_'text-decoration:_underline']]:!decoration-teal-500":
            color === "teal",
          "prose-a:decoration-blue-500 prose-blockquote:border-blue-500 prose-li:marker:text-blue-500 [&.my-prose_.list-check_li_input[checked]]:bg-blue-500 [&.my-prose_a:hover_svg]:text-blue-500 [&.my-prose_span[style_*=_'text-decoration:_line-through']]:!decoration-blue-500 [&.my-prose_span[style_*=_'text-decoration:_underline']]:!decoration-blue-500":
            color === "blue",
        },
        "prose-li:marker:font-mono",
        "[&.my-prose_.list-check_li_input]:form-checkbox [&.my-prose_.list-check_li_input]:pointer-events-none [&.my-prose_.list-check_li_input]:me-2.5 [&.my-prose_.list-check_li_input]:border-input [&.my-prose_.list-check_li_input]:bg-background [&.my-prose_.list-check_li_label]:pointer-events-none",
        "prose-img:border prose-img:border-input",
        "prose-blockquote:bg-muted/25 prose-blockquote:py-2.5",
        "prose-code:ltr prose-code:border prose-code:border-input prose-code:bg-muted/50 prose-code:decoration-clone prose-code:px-1.5 prose-code:py-0.5 prose-code:!font-mono prose-code:font-medium prose-code:before:hidden prose-code:after:hidden",
        "prose-hr:border-input",
        className,
      )}>
      <PayloadRichText data={data} converters={jsxConverters} />
    </article>
  );
};
