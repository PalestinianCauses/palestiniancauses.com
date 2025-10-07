"use client";

// REVIEWED - 02

import Image from "next/image";
import { Fragment, ReactNode, useRef } from "react";

import {
  SectionHeading,
  SubSectionHeading,
} from "@/components/globals/typography";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/styles";

// eslint-disable-next-line import/no-cycle
import {
  Frame,
  FrameContent,
  FrameHighlight,
  FrameSquare,
  FrameTitle,
  ImageFrame,
  ImageFrameRender,
} from "../_components/frame";
import { ThemeColors } from "../page";

export const DiaryEntryTemplate = function DiaryEntryTemplate({
  id,
  color,
  badge,
  author,
  title,
  paragraph,
  closure,
}: {
  id: string;
  color: ThemeColors;
  badge: ReactNode;
  author: ReactNode;
  title: ReactNode;
  paragraph: ReactNode;
  closure: ReactNode;
}) {
  const frames: ImageFrame[] = [
    {
      id: `${id}-01`,
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: `${id}-02`,
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: `${id}-03`,
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
    {
      id: `${id}-04`,
      ref: useRef<HTMLDivElement>(null),
      as: "jpeg",
    },
  ];
  return (
    <Fragment>
      <Frame
        ref={frames[0].ref}
        dimensions="4:5"
        color={color}
        className={cn({
          "bg-background": color === "primary-foreground",
          "bg-foreground": color === "primary",
        })}>
        <div
          className={cn("absolute bottom-0 h-10 w-full", {
            "bg-primary": color === "primary-foreground",
            "bg-background": color === "primary",
          })}
        />
        <FrameContent>
          <FrameSquare
            className={cn("mb-auto", {
              "bg-primary/5 ring-primary/15": color === "primary-foreground",
              "bg-primary-foreground/5 ring-primary-foreground/15":
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
              "border-primary bg-primary/5 text-primary hover:bg-primary/5":
                color === "primary-foreground",
              "border-primary-foreground bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/5":
                color === "primary",
            })}>
            {badge}
          </Badge>
          <FrameTitle>{title}</FrameTitle>
        </FrameContent>
      </Frame>
      <Frame
        ref={frames[1].ref}
        dimensions="4:5"
        color={color}
        className={cn({
          "bg-background": color === "primary-foreground",
          "bg-foreground": color === "primary",
        })}>
        <div
          className={cn("absolute bottom-0 h-10 w-full", {
            "bg-primary": color === "primary-foreground",
            "bg-background": color === "primary",
          })}
        />
        <FrameContent>
          <div className="flex items-center gap-5">
            <FrameSquare
              className={cn("h-20 w-20", {
                "bg-primary text-primary-foreground ring-primary":
                  color === "primary-foreground",
                "bg-primary-foreground text-primary ring-primary-foreground":
                  color === "primary",
              })}>
              <SectionHeading
                className={cn({
                  "text-primary-foreground": color === "primary-foreground",
                  "text-primary": color === "primary",
                })}>
                {String(author).charAt(0).toUpperCase()}
              </SectionHeading>
            </FrameSquare>
            <div className="flex flex-col gap-2.5">
              <SubSectionHeading
                className={cn(
                  "font-semibold !leading-none lg:!leading-none xl:!leading-none",
                  {
                    "text-primary": color === "primary-foreground",
                    "text-primary-foreground": color === "primary",
                  },
                )}>
                Composed by {author}.
              </SubSectionHeading>
              <Badge
                size="sm"
                className={cn("border-l-4 text-lg font-semibold ring-0", {
                  "border-primary bg-primary/5 text-primary hover:bg-primary/5":
                    color === "primary-foreground",
                  "border-primary-foreground bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/5":
                    color === "primary",
                })}>
                Featured in The Truth Museum: Humans But From Gaza.
              </Badge>
            </div>
          </div>
          {paragraph}
        </FrameContent>
      </Frame>
      <Frame
        ref={frames[2].ref}
        dimensions="4:5"
        color={color}
        className={cn({
          "bg-background": color === "primary-foreground",
          "bg-foreground": color === "primary",
        })}>
        <div
          className={cn("absolute bottom-0 h-10 w-full", {
            "bg-primary": color === "primary-foreground",
            "bg-background": color === "primary",
          })}
        />
        <FrameContent>
          <FrameTitle>{closure}</FrameTitle>
        </FrameContent>
      </Frame>
      <Frame
        ref={frames[3].ref}
        dimensions="4:5"
        color={color}
        className={cn({
          "bg-background": color === "primary-foreground",
          "bg-foreground": color === "primary",
        })}>
        <div
          className={cn("absolute bottom-0 h-10 w-full", {
            "bg-primary": color === "primary-foreground",
            "bg-background": color === "primary",
          })}
        />
        <FrameContent className="items-center justify-center">
          <FrameTitle className="text-center">
            Discover the{" "}
            <FrameHighlight
              className={cn({
                "frame-highlight-primary-foreground":
                  color === "primary-foreground",
                "frame-highlight-primary": color === "primary",
              })}>
              complete diary
            </FrameHighlight>{" "}
            and further{" "}
            <FrameHighlight
              className={cn({
                "frame-highlight-primary-foreground":
                  color === "primary-foreground",
                "frame-highlight-primary": color === "primary",
              })}>
              compelling
            </FrameHighlight>{" "}
            narratives{" "}
            <FrameHighlight
              className={cn({
                "frame-highlight-primary-foreground":
                  color === "primary-foreground",
                "frame-highlight-primary": color === "primary",
              })}>
              within...
            </FrameHighlight>
          </FrameTitle>
        </FrameContent>
      </Frame>
      <ImageFrameRender frames={frames} />
    </Fragment>
  );
};
