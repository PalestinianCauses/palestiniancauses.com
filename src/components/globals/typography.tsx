// REVIEWED - 03

import { HTMLAttributes } from "react";

import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionH3,
  MotionH4,
  MotionP,
} from "./motion";

export const SectionHeadingBadge = function SectionHeadingBadge({
  isMotion = true,
  as = "p",
  number = undefined,
  numberClassName = "",
  className,
  children,
}: {
  isMotion?: boolean;
  as?: "h2" | "h3" | "h4" | "p";
  number?: string;
  numberClassName?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const Component = isMotion
    ? (as === "h2" && MotionH2) ||
      (as === "h3" && MotionH3) ||
      (as === "h4" && MotionH4) ||
      MotionP
    : (as === "h2" && "h2") ||
      (as === "h3" && "h3") ||
      (as === "h4" && "h4") ||
      "p";

  return (
    <MotionDiv
      {...(isMotion && {
        viewport: { once: true },
        initial: motions.fadeIn.initial,
        whileInView: motions.fadeIn.whileInView,
        transition: motions.transition({}),
      })}>
      <Badge variant="outline" size="lg" className={cn("gap-5", className)}>
        {number ? (
          <span
            className={cn(
              "border-r border-input pr-5 font-mono font-medium",
              numberClassName,
            )}>
            {number}
          </span>
        ) : null}
        <Component>{children}</Component>
      </Badge>
    </MotionDiv>
  );
};

export const SectionHeading = function SectionHeading({
  isMotion = true,
  as = "h1",
  delay = 0,
  className,
  children,
}: {
  isMotion?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p";
  delay?: number;
} & HTMLAttributes<HTMLHeadingElement>) {
  const Component = isMotion
    ? (as === "h1" && MotionH1) ||
      (as === "h2" && MotionH2) ||
      (as === "h3" && MotionH3) ||
      (as === "h4" && MotionH4) ||
      MotionP
    : (as === "h1" && "h1") ||
      (as === "h2" && "h2") ||
      (as === "h3" && "h3") ||
      (as === "h4" && "h4") ||
      "p";

  return (
    <Component
      {...(isMotion && {
        viewport: { once: true },
        initial: motions.fadeIn.initial,
        whileInView: motions.fadeIn.whileInView,
        transition: motions.transition({ delay }),
      })}
      className={cn(
        "max-w-3xl text-4xl font-medium !leading-tight tracking-tight text-foreground lg:max-w-4xl lg:text-5xl lg:!leading-[1.2] xl:max-w-5xl xl:text-6xl xl:!leading-[1.1]",
        className,
      )}>
      {children}
    </Component>
  );
};

export const SubSectionHeading = function SubSectionHeading({
  isMotion = true,
  as = "h2",
  small = false,
  delay = 0,
  className,
  children,
}: {
  isMotion?: boolean;
  as?: "h2" | "h3" | "h4" | "p";
  small?: boolean;
  delay?: number;
} & HTMLAttributes<HTMLHeadingElement>) {
  const Component = isMotion
    ? (as === "h2" && MotionH2) ||
      (as === "h3" && MotionH3) ||
      (as === "h4" && MotionH4) ||
      MotionP
    : (as === "h2" && "h2") ||
      (as === "h3" && "h3") ||
      (as === "h4" && "h4") ||
      "p";

  return (
    <Component
      {...(isMotion && {
        viewport: { once: true },
        initial: motions.fadeIn.initial,
        whileInView: motions.fadeIn.whileInView,
        transition: motions.transition({ delay }),
      })}
      className={cn(
        "max-w-3xl font-medium !leading-snug tracking-tight text-foreground lg:max-w-4xl lg:!leading-tight xl:max-w-5xl xl:!leading-[1.2]",
        small
          ? "text-xl lg:text-2xl xl:text-3xl"
          : "text-2xl lg:text-3xl xl:text-4xl",
        className,
      )}>
      {children}
    </Component>
  );
};

export const Paragraph = function Paragraph({
  isMotion = true,
  small = false,
  delay = 0,
  className,
  children,
}: {
  isMotion?: boolean;
  small?: boolean;
  delay?: number;
} & HTMLAttributes<HTMLParagraphElement>) {
  const Component = isMotion ? MotionP : "p";

  return (
    <Component
      {...(isMotion && {
        viewport: { once: true },
        initial: motions.fadeIn.initial,
        whileInView: motions.fadeIn.whileInView,
        transition: motions.transition({ delay }),
      })}
      className={cn(
        "font-normal !leading-relaxed text-muted-foreground",
        small ? "text-lg xl:text-xl" : "text-xl lg:text-2xl",
        className,
      )}>
      {children}
    </Component>
  );
};
