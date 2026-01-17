// REVIEWED - 03
import { toJpeg, toPng } from "html-to-image";
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
} from "react";
import { RiInstagramLine } from "react-icons/ri";

import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/styles";

import {
  Dimensions,
  dimensionsClasses,
  themeClasses,
  ThemeColors,
} from "./global";

export type ImageFrame = {
  id: string;
  ref: RefObject<HTMLDivElement>;
  as?: "jpeg" | "png";
};

export type ImageFrameRenderProps = {
  frames: ImageFrame[];
  text?: string;
};

export const ImageFrameRender = function ImageFrameRender({
  frames,
  text,
}: ImageFrameRenderProps) {
  const render = function render(imageFrames: ImageFrame[]) {
    imageFrames.forEach((imageFrame) => {
      if (!imageFrame.ref.current) return;

      const functions = { jpeg: toJpeg, png: toPng };

      functions[imageFrame.as || "jpeg"](imageFrame.ref.current, {
        cacheBust: true,
        quality: 1,
      }).then((image) => {
        const a = document.createElement("a");
        a.href = image;
        a.download = `${imageFrame.id}.${imageFrame.as || "jpeg"}`;
        a.click();
      });
    });
  };

  return (
    <Button onClick={() => render(frames)}>{text || "Render Images"}</Button>
  );
};

type FrameProps = HTMLAttributes<HTMLDivElement> & {
  dimensions?: Dimensions;
  color?: ThemeColors;
};

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
  (
    { dimensions = "1:1", color = "primary", className, children, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden",
        dimensionsClasses[dimensions],
        themeClasses[color].bg,
        themeClasses[color].text,
        className,
      )}
      {...props}>
      {children}
      <div className="absolute bottom-5 flex items-center justify-center gap-2.5 text-2xl font-bold">
        <RiInstagramLine className="size-8" />
        PalestinianCauses.
      </div>
    </div>
  ),
);

export const FrameContent = function FrameContent({
  className,
  children,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-[65.625rem] w-[55rem] flex-col items-start justify-start gap-12",
        className,
      )}>
      {children}
    </div>
  );
};

export const FrameImagesGrid = function FrameImagesGrid({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 grid scale-105 grid-cols-12 grid-rows-12 gap-5",
        className,
      )}>
      {children}
    </div>
  );
};

export const FrameSquare = function FrameSquare({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex size-32 shrink-0 items-center justify-center ring-1 [&_>_svg]:size-16 [&_>_svg]:stroke-[1.5]",
        className,
      )}>
      {children}
    </div>
  );
};

export const FrameTitle = function FrameTitle({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <SectionHeading
      className={cn(
        "!text-[10rem] font-bold text-current lg:!leading-[0.9] xl:!leading-[0.9]",
        className,
      )}>
      {children}
    </SectionHeading>
  );
};

export const FrameBadge = function FrameBadge({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <Badge
      size="lg"
      className={cn(
        "border-l-4 border-current bg-transparent text-3xl text-current ring-0 hover:bg-transparent",
        className,
      )}>
      {children}
    </Badge>
  );
};

export const FrameHighlight = function FrameHighlight({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "relative z-10 inline-block before:absolute before:inset-x-0 before:inset-y-[initial] before:bottom-0 before:z-[-1] before:block before:h-1/2 before:ring-0",
        className,
      )}>
      {children}
    </span>
  );
};

export const FrameParagraph = function FrameParagraph({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Paragraph
      className={cn(
        "!text-4xl font-medium !leading-relaxed text-current",
        className,
      )}>
      {children}
    </Paragraph>
  );
};

export const FrameParagraphHighlight = function FrameParagraphHighlight({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn("px-2.5 font-medium", className)}>{children}</span>
  );
};
