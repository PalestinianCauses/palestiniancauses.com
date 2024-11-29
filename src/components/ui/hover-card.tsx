"use client";

// REVIEWED

import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import * as React from "react";

import { cn } from "@/lib/utils";

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state_=_open]:animate-in data-[state_=_closed]:animate-out data-[state_=_closed]:fade-out-0 data-[state_=_open]:fade-in-0 data-[state_=_closed]:zoom-out-95 data-[state_=_open]:zoom-in-95 data-[side_=_bottom]:slide-in-from-top-2 data-[side_=_left]:slide-in-from-right-2 data-[side_=_right]:slide-in-from-left-2 data-[side_=_top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
));

HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };
