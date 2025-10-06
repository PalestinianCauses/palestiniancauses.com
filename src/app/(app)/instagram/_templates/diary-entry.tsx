"use client";

// REVIEWED

import Image from "next/image";
import { Fragment, ReactNode, useRef } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/styles";

// eslint-disable-next-line import/no-cycle
import {
  Frame,
  FrameContent,
  FrameSquare,
  FrameTitle,
  ImageFrame,
} from "../_components/frame";
import { ThemeColors } from "../page";

export const DiaryEntryTemplate = function DiaryEntryTemplate({
  color,
  badge,
  title,
}: {
  color: ThemeColors;
  badge: ReactNode;
  title: ReactNode;
}) {
  const frames: ImageFrame[] = [
    {
      id: "diary-entry-01",
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
  ];
  return (
    <Fragment>
      <Frame ref={frames[0].ref} dimensions="4:5" color={color}>
        <FrameContent>
          <FrameSquare
            className={cn("mb-auto", {
              "bg-primary/10 ring-primary/20": color === "primary-foreground",
              "bg-primary-foreground/10 ring-primary-foreground/20":
                color === "primary",
            })}>
            <Image
              src={
                color === "primary-foreground"
                  ? "/logo-primary.png"
                  : "/logo-primary-foreground.png"
              }
              alt="PSC Logo"
              fill
              className="!static !h-24 !w-auto"
            />
          </FrameSquare>
          <Badge
            size="lg"
            className={cn("border-l-4 text-lg font-semibold ring-0", {
              "border-primary bg-primary/10 text-primary hover:bg-primary/10":
                color === "primary-foreground",
              "border-primary-foreground bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/10":
                color === "primary",
            })}>
            {badge}
          </Badge>
          <FrameTitle>{title}</FrameTitle>
        </FrameContent>
      </Frame>
      <div>Hello</div>
    </Fragment>
  );
};
