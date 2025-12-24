"use client";

// REVIEWED

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
    <div className="flex w-full flex-wrap items-center justify-between py-2.5 font-mono">
      <Paragraph className="text-sm lg:text-sm">{file}</Paragraph>
      <Button
        variant="ghost"
        size="sm"
        className={cn({ "cursor-not-allowed": copied })}
        disabled={copied}
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          updateCopyStatus();
        }}>
        {copied ? "Copied!" : language}
        {copied ? <CopyCheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
};
