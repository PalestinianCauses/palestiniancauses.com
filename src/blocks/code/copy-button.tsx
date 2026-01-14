"use client";

// REVIEWED - 02

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Paragraph } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { messages } from "@/lib/messages";
import { cn } from "@/lib/utils/styles";

export const CopyButton = function CopyButton({
  code,
  language,
  file,
}: {
  code: string;
  language: string;
  file: string;
}) {
  const [copied, setCopied] = useState(false);

  const updateCopyStatus = function updateCopyStatus() {
    if (!copied) setCopied(() => true);
    toast(messages.code.copy.success);
    setTimeout(() => setCopied(() => false), 2500);
  };

  return (
    <div
      className="flex w-full flex-wrap items-center justify-between gap-2.5 px-2.5 !font-mono"
      style={{ direction: "ltr" }}>
      <div className="flex items-center justify-start gap-2.5">
        <div className="mb-0.5 flex items-center justify-start gap-1.5">
          <div className="size-3.5 rounded-full bg-gradient-to-br from-muted-foreground/20 to-muted/10" />
          <div className="size-3.5 rounded-full bg-gradient-to-br from-muted-foreground/20 to-muted/10" />
          <div className="size-3.5 rounded-full bg-gradient-to-br from-muted-foreground/20 to-muted/10" />
        </div>
        <Paragraph className="!m-0 text-xs lg:text-xs">{file}</Paragraph>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className={cn("!m-0", { "cursor-not-allowed": copied })}
        disabled={copied}
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          updateCopyStatus();
        }}>
        {copied ? <CopyCheckIcon /> : <CopyIcon />}
        {copied ? "Copied!" : language}
      </Button>
    </div>
  );
};
