// REVIEWED - 05

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils/styles";

const buttonVariants = cva(
  "inline-flex items-center justify-center text-sm font-medium whitespace-nowrap transition-all duration-100 ease-in-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        "default":
          "bg-primary text-primary-foreground hover:bg-primary-foreground hover:text-primary",
        "destructive":
          "bg-destructive text-destructive-foreground hover:bg-destructive-foreground hover:text-destructive",
        "outline":
          "ring-1 ring-input bg-background hover:bg-accent hover:text-accent-foreground",
        "secondary":
          "bg-secondary text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary",
        "tertiary":
          "bg-tertiary text-tertiary-foreground hover:bg-tertiary-foreground hover:text-tertiary",
        "tertiary-2":
          "bg-tertiary-2 text-tertiary-2-foreground hover:bg-tertiary-2-foreground hover:text-tertiary-2",
        "ghost": "hover:bg-primary-foreground hover:text-primary",
        "link": "text-primary hover:underline hover:underline-offset-4",
      },
      size: {
        default: "px-6 py-2.5 gap-1.5",
        sm: "px-4 py-1.5 text-xs gap-1",
        lg: "px-8 py-3.5 text-base gap-2",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
