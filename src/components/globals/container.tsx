// REVIEWED - 03

import { forwardRef, HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export const Container = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, children }, ref) => (
  <div ref={ref} className={cn("mx-auto w-full px-5 lg:px-7", className)}>
    {children}
  </div>
));
