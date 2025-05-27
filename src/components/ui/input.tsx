// REVIEWED - 02

import * as React from "react";

import { cn } from "@/lib/utils/styles";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        "flex w-full bg-background px-2.5 py-2.5 text-base leading-5 text-foreground ring-1 ring-input transition-all duration-100 ease-in file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";

export { Input };
