// REVIEWED

import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/styles";

import { Code } from "./client";

export type PropsCodeBlock = {
  file: string;
  language: string;
  code: string;
  blockType: "code";
};

export type Props = PropsCodeBlock & HTMLAttributes<HTMLElement>;

export const CodeBlock = function CodeBlock({
  file,
  language,
  code,
  ...props
}: Props) {
  return (
    <div className={cn("mx-5", props.className)}>
      <Code code={code} language={language} file={file} />
    </div>
  );
};
