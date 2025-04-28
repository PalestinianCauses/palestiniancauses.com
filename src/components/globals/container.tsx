// REVIEWED - 04

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { as?: "div" | "section" }
>(({ as = "div", className, children }, ref) => {
  const Component = as === "div" ? "div" : "section";

  return (
    <Component
      ref={ref}
      className={cn("mx-auto w-full px-5 lg:px-7", className)}>
      {children}
    </Component>
  );
});
