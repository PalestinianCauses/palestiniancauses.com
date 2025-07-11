"use client";

// REVIEWED - 02

import { GripVertical } from "lucide-react";
import * as React from "react";
import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "@/lib/utils/styles";

const ResizablePanelGroup = function ResizablePanelGroup({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) {
  return (
    <ResizablePrimitive.PanelGroup
      className={cn(
        "flex h-full w-full data-[panel-group-direction_=_vertical]:flex-col",
        className,
      )}
      {...props}
    />
  );
};

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) {
  return (
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction_=_vertical]:h-px data-[panel-group-direction_=_vertical]:w-full data-[panel-group-direction_=_vertical]:after:left-0 data-[panel-group-direction_=_vertical]:after:h-1 data-[panel-group-direction_=_vertical]:after:w-full data-[panel-group-direction_=_vertical]:after:-translate-y-1/2 data-[panel-group-direction_=_vertical]:after:translate-x-0 [&[data-panel-group-direction_=_vertical]>div]:rotate-90",
        className,
      )}
      {...props}>
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  );
};

export { ResizableHandle, ResizablePanel, ResizablePanelGroup };
