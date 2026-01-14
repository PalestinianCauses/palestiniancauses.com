"use client";

// REVIEWED

import { Highlight, themes } from "prism-react-renderer";

import { CopyButton } from "./copy-button";

type Props = {
  code: string;
  language: string;
  file: string;
};

export const Code = function Code({ code, language, file }: Props) {
  return (
    <Highlight code={code} language={language} theme={themes.github}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre
          className="overflow-x-auto text-wrap border border-input bg-background px-5 pb-8 text-base"
          style={{ direction: "ltr" }}>
          <CopyButton code={code} language={language} file={file} />
          {tokens.map((line, index) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...getLineProps({ className: "table-row", line })}>
              <span className="table-cell select-none text-right text-muted">
                {index + 1}
              </span>
              <span className="table-cell pl-5">
                {line.map((token, tokenIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={tokenIndex} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
