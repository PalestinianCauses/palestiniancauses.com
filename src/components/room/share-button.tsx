"use client";

// REVIEWED

import { ClipboardIcon, Share2 } from "lucide-react";
import { ElementType, HTMLAttributes, useState } from "react";
import {
  RiFacebookLine,
  RiLinkedinLine,
  RiTelegram2Line,
  RiTwitterXFill,
  RiWhatsappLine,
} from "react-icons/ri";
import { toast } from "sonner";

import { cn } from "@/lib/utils/styles";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const icons: Record<string, ElementType> = {
  whatsapp: RiWhatsappLine,
  telegram: RiTelegram2Line,
  twitter: RiTwitterXFill,
  facebook: RiFacebookLine,
  linkedin: RiLinkedinLine,
};

interface ShareButtonProps {
  title?: string;
}

export const ShareButton = function ShareButton({
  title,
  className,
}: ShareButtonProps & HTMLAttributes<HTMLElement>) {
  const [copied, setCopied] = useState(false);

  const URL = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = title || "Check this out!";
  const shareText = `${shareTitle} - ${URL}`;

  const handleShare = async (platform: string) => {
    const URLEncoded = encodeURIComponent(URL);
    const titleEncoded = encodeURIComponent(shareTitle);

    const shareURLs: Record<string, string> = {
      whatsapp: [
        "https://wa.me",
        ["text", encodeURIComponent(shareText)].join("="),
      ].join("?"),
      telegram: [
        "https://t.me/share/url",
        [["url", URLEncoded].join("="), ["text", titleEncoded].join("=")].join(
          "&",
        ),
      ].join("?"),
      twitter: [
        "https://twitter.com/intent/tweet",
        [
          [["url", URLEncoded].join("=")],
          [["text", titleEncoded].join("=")],
        ].join("&"),
      ].join("?"),
      facebook: [
        "https://www.facebook.com/sharer/sharer.php",
        ["u", URLEncoded].join("="),
      ].join("?"),
      linkedin: [
        "https://www.linkedin.com/sharing/share-offsite",
        ["url", URLEncoded].join("="),
      ].join("?"),
    };

    if (shareURLs[platform])
      window.open(shareURLs[platform], "_blank", "noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(URL);

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);

      toast.success("Link has been copied.");
    } catch {
      const textArea = document.createElement("textarea");
      document.body.appendChild(textArea);

      textArea.value = URL;
      textArea.select();

      document.execCommand("copy");
      document.body.removeChild(textArea);

      setCopied(true);
      setTimeout(() => setCopied(false), 1500);

      toast.success("Link has been copied.");
    }
  };

  if (typeof window === "undefined") return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className={cn("h-10 w-10", className)}>
          <Share2 className="!size-5" />
          <span className="sr-only">Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="left"
        align="end"
        className="flex w-48 flex-col items-stretch justify-start gap-1.5">
        <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
          <icons.whatsapp className="!size-4" />
          Share on WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("telegram")}>
          <icons.telegram className="!size-4" />
          Share on Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("twitter")}>
          <icons.twitter className="!size-4" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("facebook")}>
          <icons.facebook className="!size-4" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleShare("linkedin")}>
          <icons.linkedin className="!size-4" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>
          <ClipboardIcon className="!size-4" />
          {copied ? "Link copied!" : "Copy link"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
