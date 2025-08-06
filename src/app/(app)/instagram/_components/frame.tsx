// REVIEWED
import { toJpeg, toPng } from "html-to-image";
import {
  forwardRef,
  HTMLAttributes,
  PropsWithChildren,
  RefObject,
} from "react";

import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/styles";

// eslint-disable-next-line import/no-cycle
import {
  Dimensions,
  dimensionsClasses,
  themeClasses,
  ThemeColors,
} from "../page";

export type ImageFrame = {
  id: string;
  ref: RefObject<HTMLDivElement>;
  as?: "jpeg" | "png";
};

export type ImageFrameRenderProps = {
  frames: ImageFrame[];
};

export const ImageFrameRender = function ImageFrameRender({
  frames,
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

  return <Button onClick={() => render(frames)}>Render Images</Button>;
};

type FrameProps = HTMLAttributes<HTMLDivElement> & {
  dimensions?: Dimensions;
  color?: ThemeColors;
};

export const Frame = forwardRef<HTMLDivElement, FrameProps>(
  ({ dimensions = "1:1", color = "primary", className, children }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden",
        dimensionsClasses[dimensions],
        themeClasses[color].bg,
        themeClasses[color].text,
        className,
      )}>
      {children}
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
        "flex h-[65rem] w-[55rem] flex-col items-start justify-start gap-12",
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
        "relative flex h-32 w-32 items-center justify-center ring-1",
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
        "!text-9xl font-bold text-current lg:!leading-[0.9] xl:!leading-[0.9]",
        className,
      )}>
      {children}
    </SectionHeading>
  );
};

export const FrameHighlight = function FrameHighlight({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "relative z-10 inline-block before:absolute before:inset-x-0 before:inset-y-0 before:z-[-1] before:block before:ring-1",
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
