"use client";

// REVIEWED - 02

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils/styles";

import { Badge } from "../ui/badge";

export const NavigationLink = function NavigationLink({
  href,
  target,
  recent,
  coming,
  children,
}: {
  href: string;
  target?: string;
  recent?: boolean;
  coming?: boolean;
} & PropsWithChildren) {
  return (
    <Link
      href={href}
      target={target || "_self"}
      aria-disabled={coming}
      className={cn(
        "relative z-10 flex h-full w-full items-center justify-start gap-2.5 p-5 text-4xl font-normal text-current transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground xl:gap-5 xl:p-10 xl:text-5xl",
        { "pointer-events-none cursor-not-allowed text-muted": coming },
      )}>
      <ArrowRightIcon className="h-10 w-10 shrink-0" />
      <span className="shrink whitespace-break-spaces">{children}</span>
      {recent && (
        <Badge className="absolute left-0 top-0 text-base group-hover:bg-background group-hover:text-foreground">
          New
        </Badge>
      )}
      {coming && (
        <Badge className="absolute left-0 top-0 text-base">Coming Soon</Badge>
      )}
    </Link>
  );
};
