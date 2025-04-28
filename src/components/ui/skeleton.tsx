// REVIEWED - 01

import * as React from "react";

import { cn } from "@/lib/utils";

const Skeleton = function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse bg-muted", className)} {...props} />;
};

export { Skeleton };
