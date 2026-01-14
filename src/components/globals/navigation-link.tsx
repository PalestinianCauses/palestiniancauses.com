"use client";

// REVIEWED - 04

import { ArrowRightIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils/styles";

import { Badge } from "../ui/badge";

export const NavigationLink = function NavigationLink({
  href,
  target,
  coming,
  onClick,
  children,
}: {
  href: string;
  target?: string;
  coming?: boolean;
} & PropsWithChildren &
  LinkProps) {
  return (
    <Link
      href={href}
      target={target || "_self"}
      aria-disabled={coming}
      aria-label={coming ? `${children} (Coming Soon)` : String(children)}
      tabIndex={coming ? -1 : 0}
      className={cn(
        "relative z-10 flex h-full min-h-[calc(100vh/5)] w-full items-center justify-start gap-2.5 p-5 text-4xl font-normal text-current transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 xl:gap-5 xl:p-10 xl:text-5xl [@media_(max-height:48rem)]:min-h-[calc(48rem/5)]",
        { "pointer-events-none cursor-not-allowed text-muted": coming },
      )}
      onClick={onClick}>
      <ArrowRightIcon aria-hidden="true" className="h-10 w-10 shrink-0" />
      <span className="shrink whitespace-break-spaces">{children}</span>
      {coming && (
        <Badge
          aria-label="Coming Soon"
          className="absolute left-0 top-0 text-base">
          Coming Soon
        </Badge>
      )}
    </Link>
  );
};
