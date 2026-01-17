// REVIEWED - 01

import { Fragment, ReactNode, useRef } from "react";

import { cn } from "@/lib/utils/styles";

import {
  Frame,
  FrameContent,
  ImageFrame,
  ImageFrameRender,
} from "../_components/frame";
import { ThemeColors } from "../_components/global";

export const AHumanButFromGazaTemplate = function AHumanButFromGazaTemplate({
  id,
  color,
  badge,
  author,
  image,
  title,
  paragraph,
  closure,
  link,
}: {
  id: string;
  color: ThemeColors;
  badge: ReactNode;
  author: ReactNode;
  image: ReactNode;
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
        <FrameContent>{image}</FrameContent>
      </Frame>
      <ImageFrameRender frames={frames} text={`Render ${id} Frames`} />
    </Fragment>
  );
};
