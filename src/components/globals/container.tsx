// REVIEWED - 02

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("mx-auto max-w-7xl px-6 lg:px-8", className)}>
    {children}
  </div>
));
