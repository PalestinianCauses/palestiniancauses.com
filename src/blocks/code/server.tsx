// REVIEWED - 02

import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, HTMLAttributes } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "shiki";

import { cn } from "@/lib/utils/styles";

import { CopyButton } from "./copy-button";

export type PropsCodeBlock = {
  file: string;
  language: string;
  code: string;
};

export type Props = PropsCodeBlock & HTMLAttributes<HTMLElement>;

const PreComponent = async function PreComponent({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const tokens = await codeToHast(code, {
    lang: language,
    theme: "min-dark",
  });

  return toJsxRuntime(tokens, {
    Fragment,
    jsx,
    jsxs,
    components: {
      pre: ({ className, style, children, ...propsPre }) => (
        <pre
          className={cn(
            "no-scrollbar !m-0 overflow-x-auto !rounded-none border border-muted/50 !bg-background !p-5 !font-mono !text-base !leading-snug md:text-wrap lg:!text-lg lg:!leading-snug xl:!text-lg xl:!leading-snug",
            className,
          )}
          style={{ ...style, direction: "ltr" }}
          {...propsPre}>
          {children}
        </pre>
      ),
    },
  });
};

export const CodeBlock = async function CodeBlock({
  file,
  language,
  code,
}: Props) {
  return (
    <div className="relative my-[2em] flex w-full flex-col items-stretch gap-2.5 bg-background bg-muted/25 p-2.5">
      <div className="absolute left-0 top-0 flex w-full items-center justify-start gap-2.5">
        <div className="h-px w-5 shrink-0 bg-foreground" />
        <div className="h-px w-full bg-muted/50" />
      </div>
      <div className="absolute right-0 top-0 flex h-full w-px flex-col items-center justify-start gap-2.5">
        <div className="h-5 w-full shrink-0 bg-foreground" />
        <div className="h-full w-full bg-muted/50" />
      </div>
      <div className="absolute left-0 top-0 flex h-full w-px flex-col items-center justify-start gap-2.5">
        <div className="h-full w-full bg-muted/50" />
        <div className="h-5 w-full shrink-0 bg-foreground" />
      </div>
      <div className="absolute bottom-0 left-0 flex w-full items-center justify-start gap-2.5">
        <div className="h-px w-full bg-muted/50" />
        <div className="h-px w-5 shrink-0 bg-foreground" />
      </div>
      <CopyButton code={code} language={language} file={file} />
      <PreComponent code={code} language={language} />
    </div>
  );
};
