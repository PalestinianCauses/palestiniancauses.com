"use client";

// REVIEWED - 04

import {
  BookOpenIcon,
  FileHeartIcon,
  Link2Icon,
  MessageCircleIcon,
  ShareIcon,
} from "lucide-react";
import Image from "next/image";
import { ElementType, Fragment, ReactNode, useRef } from "react";

import {
  Paragraph,
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

const SupportOptionsCard = function SupportOptionsCard({
  color,
  Icon,
  title,
  description,
}: {
  color: ThemeColors;
  Icon: ElementType;
  title: ReactNode;
  description: ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative flex aspect-square flex-col items-center justify-center p-10 ring-1 ring-inset before:absolute before:bottom-0 before:h-1 before:w-full",
        {
          "ring-primary/15 before:bg-primary": color === "primary-foreground",
          "ring-primary-foreground/15 before:bg-primary-foreground":
            color === "primary",
        },
      )}>
      <Icon
        className={cn("mb-6 h-10 w-10 stroke-[1.5]", {
          "text-primary": color === "primary-foreground",
          "text-primary-foreground": color === "primary",
        })}
      />
      <SubSectionHeading
        className={cn("mb-3 text-center font-bold", {
          "text-primary": color === "primary-foreground",
          "text-primary-foreground": color === "primary",
        })}>
        {title}
      </SubSectionHeading>
      <Paragraph
        small
        className={cn("-mx-5 text-center", {
          "text-primary/75": color === "primary-foreground",
          "text-primary-foreground/75": color === "primary",
        })}>
        {description}
      </Paragraph>
    </div>
  );
};

export const DiaryEntryTemplate = function DiaryEntryTemplate({
  id,
  color,
  badge,
  author,
  title,
  paragraph,
  closure,
  link,
}: {
  id: string;
  color: ThemeColors;
  badge: ReactNode;
  author: ReactNode;
  title: ReactNode;
  paragraph: ReactNode;
  closure: ReactNode;
  link: ReactNode;
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
    {
      id: `${id}-05`,
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
          <Badge
            size="lg"
            className={cn("border-l-4 text-lg font-semibold ring-0", {
              "border-primary bg-primary/5 text-primary hover:bg-primary/5":
                color === "primary-foreground",
              "border-primary-foreground bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/5":
                color === "primary",
            })}>
            <Link2Icon className="-mb-0.5 size-6" />
            {link}
          </Badge>
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
          <FrameTitle className="mb-16 text-center">
            Humans—But From{" "}
            <FrameHighlight
              className={cn({
                "section-heading-highlight-primary-foreground":
                  color === "primary-foreground",
                "section-heading-highlight-primary": color === "primary",
              })}>
              Gaza.
            </FrameHighlight>
          </FrameTitle>
          <div className="mx-auto grid w-full grid-cols-[20rem_20rem] items-center justify-center gap-10">
            <SupportOptionsCard
              color={color}
              Icon={BookOpenIcon}
              title="Explore The Complete Story"
              description="Read our full diary entry and discover our complete narrative on
                our website"
            />
            <SupportOptionsCard
              color={color}
              Icon={MessageCircleIcon}
              title="Join The Conversation"
              description="Share your thoughts and engage with our community through
                meaningful dialogue"
            />
            <SupportOptionsCard
              color={color}
              Icon={ShareIcon}
              title="Amplify The Message"
              description="Help spread awareness by sharing this important story with your
                network"
            />
            <SupportOptionsCard
              color={color}
              Icon={FileHeartIcon}
              title="Show Your Support"
              description="Follow our journey and stay connected with our mission and
                updates"
            />
          </div>
        </FrameContent>
      </Frame>
      <ImageFrameRender frames={frames} text={`Render ${id} Frames`} />
    </Fragment>
  );
};
