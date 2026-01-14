// REVIEWED - 07

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils/styles";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { as?: "main" | "section" | "div" }
>(({ as = "div", className, children, ...props }, ref) => {
  const Component = as === "div" ? "div" : "section";

  return (
    <Component
      ref={ref}
      className={cn("mx-auto w-full px-5 lg:px-7", className)}
      {...props}>
      {children}
    </Component>
  );
});
