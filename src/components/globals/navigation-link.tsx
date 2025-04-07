"use client";

// REVIEWED

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren, useEffect, useState } from "react";

import { motions } from "@/lib/motion";
import { cn, toHEX } from "@/lib/utils";

import { Badge } from "../ui/badge";

import { MotionDiv, MotionSpan } from "./motion";

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
  const [colors, setColors] = useState({
    foreground: "",
    background: "",
  });

  useEffect(() => {
    setColors({
      foreground: toHEX(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--foreground",
        ),
      ),
      background: toHEX(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--background",
        ),
      ),
    });
  }, []);

  return (
    <Link
      href={href}
      target={target || "_self"}
      aria-disabled={coming}
      className={cn(
        "relative z-10 flex h-full w-full items-center justify-start gap-2.5 p-5 text-4xl font-normal text-current xl:gap-5 xl:p-10 xl:text-5xl",
        { "pointer-events-none cursor-not-allowed text-muted": coming },
      )}>
      <MotionDiv
        initial={{
          color: !coming ? colors.foreground : "currentColor",
          rotate: -45,
        }}
        variants={{
          hover: {
            color: !coming ? colors.background : "currentColor",
            rotate: !coming ? 0 : -45,
          },
        }}
        transition={motions.transition({
          duration: "fast",
        })}>
        <ArrowRightIcon
          className="h-10 w-10 shrink-0"
          style={{
            transitionDuration: String(
              motions.transition({ duration: "fast" }).duration,
            ),
          }}
        />
      </MotionDiv>
      {colors.foreground && colors.background && (
        <MotionSpan
          initial={{
            color: !coming ? colors.foreground : "currentColor",
          }}
          variants={{
            hover: {
              color: !coming ? colors.background : "currentColor",
            },
          }}
          transition={motions.transition({
            duration: "fast",
          })}
          className="shrink whitespace-break-spaces">
          {children}
        </MotionSpan>
      )}
      {!coming && (
        <MotionDiv
          initial={motions.hoverScaleX.initial}
          variants={motions.hoverScaleX.variants}
          transition={motions.transition({ duration: "fast" })}
          className="absolute inset-0 -z-10 h-full w-full origin-left bg-foreground"
        />
      )}
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
