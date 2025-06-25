// REVIEWED - 03

import * as React from "react";

import { cn } from "@/lib/utils/styles";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[3.75rem] w-full bg-background px-2.5 py-2.5 text-base leading-7 text-foreground ring-1 ring-input transition-all duration-100 ease-in-out placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm/6",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

export { Textarea };
