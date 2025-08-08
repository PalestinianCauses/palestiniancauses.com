// REVIEWED - 06
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/styles";

import { Badge } from "../ui/badge";

export const SectionHeadingBadge = function SectionHeadingBadge({
  as = "p",
  number = undefined,
  numberClassName = "",
  className,
  children,
}: {
  as?: "h2" | "h3" | "h4" | "p";
  number?: string;
  numberClassName?: string;
} & HTMLAttributes<HTMLDivElement>) {
  const Component =
    (as === "h2" && "h2") ||
    (as === "h3" && "h3") ||
    (as === "h4" && "h4") ||
    "p";

  return (
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
  );
};

export const SectionTitle = function SectionTitle({
  as = "h1",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
} & HTMLAttributes<HTMLHeadingElement>) {
  const Component =
    (as === "h1" && "h1") ||
    (as === "h2" && "h2") ||
    (as === "h3" && "h3") ||
    (as === "h4" && "h4") ||
    "p";

  return (
    <Component
      className={cn(
        "max-w-4xl text-6xl font-normal !leading-none tracking-tight text-foreground sm:text-7xl lg:max-w-none lg:text-8xl xl:text-9xl",
        className,
      )}>
      {children}
    </Component>
  );
};

export const SectionHeading = function SectionHeading({
  as = "h1",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "h4" | "p";
} & HTMLAttributes<HTMLHeadingElement>) {
  const Component =
    (as === "h1" && "h1") ||
    (as === "h2" && "h2") ||
    (as === "h3" && "h3") ||
    (as === "h4" && "h4") ||
    "p";

  return (
    <Component
      className={cn(
        "max-w-3xl text-4xl font-medium !leading-tight tracking-tight text-foreground lg:max-w-4xl lg:text-5xl lg:!leading-[1.2] xl:max-w-5xl xl:text-6xl xl:!leading-[1.1]",
        className,
      )}>
      {children}
    </Component>
  );
};

export const SubSectionHeading = function SubSectionHeading({
  as = "h2",
  small = false,
  className,
  children,
}: {
  as?: "h2" | "h3" | "h4" | "p";
  small?: boolean;
} & HTMLAttributes<HTMLHeadingElement>) {
  const Component =
    (as === "h2" && "h2") ||
    (as === "h3" && "h3") ||
    (as === "h4" && "h4") ||
    "p";

  return (
    <Component
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
  small = false,
  className,
  children,
}: {
  small?: boolean;
} & HTMLAttributes<HTMLParagraphElement>) {
  const Component = "p";

  return (
    <Component
      className={cn(
        "font-normal !leading-relaxed text-muted-foreground",
        small ? "text-lg xl:text-xl" : "text-xl lg:text-2xl",
        className,
      )}>
      {children}
    </Component>
  );
};
