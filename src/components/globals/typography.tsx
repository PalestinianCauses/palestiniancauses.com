// REVIEWED

import { HTMLAttributes } from "react";

import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

import { MotionDiv, MotionP } from "./motion";

export const SectionBadge = function SectionBadge({
  number = undefined,
  className,
  children,
}: { number?: string } & HTMLAttributes<HTMLDivElement>) {
  return (
    <MotionDiv
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({})}
      className={className}>
      <Badge variant="outline" size="lg" className="gap-5">
        <span className="border-r border-input pr-5 font-mono font-medium">
          {number}
        </span>
        <h2>{children}</h2>
      </Badge>
    </MotionDiv>
  );
};

export const Heading = function Heading({
  delay = 0,
  className,
  children,
}: { delay?: number } & HTMLAttributes<HTMLHeadingElement>) {
  return (
    <MotionP
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({ delay })}
      className={cn(
        "max-w-3xl text-4xl font-medium !leading-tight tracking-tight text-foreground lg:max-w-4xl lg:text-5xl lg:!leading-[1.2] xl:max-w-5xl xl:text-6xl xl:!leading-[1.1]",
        className,
      )}>
      {children}
    </MotionP>
  );
};

export const Paragraph = function Paragraph({
  delay = 0,
  className,
  children,
}: { delay?: number } & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <MotionP
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({ delay })}
      className={cn(
        "text-xl font-normal !leading-relaxed text-muted-foreground lg:text-2xl",
        className,
      )}>
      {children}
    </MotionP>
  );
};
