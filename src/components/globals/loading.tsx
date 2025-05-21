// REVIEWED - 03

import { Loader2 } from "lucide-react";
import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/styles";

export const Loading = function Loading({
  className,
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex h-full max-h-screen min-h-[40rem] w-full items-center justify-center",
        className,
      )}>
      <Loader2 className="h-10 w-10 animate-spin stroke-1 text-primary" />
    </div>
  );
};
