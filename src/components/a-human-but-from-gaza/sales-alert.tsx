// REVIEWED

import { SparklesIcon } from "lucide-react";

import { cn } from "@/lib/utils/styles";

export const SalesAlert = function SalesAlert() {
  return (
    <div
      className={cn(
        "group relative my-10 w-full overflow-hidden border border-green-500/5 bg-green-500/5 p-5",
      )}>
      <div className="relative z-10 flex flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center sm:gap-5">
        <div className="flex shrink-0 items-center justify-center bg-gradient-to-br from-green-900 via-green-700 to-green-500 p-2.5 shadow-xl shadow-green-500/10 sm:p-5">
          <SparklesIcon className="size-6 stroke-[1.5] text-white sm:size-8" />
        </div>

        <div className="flex-1 space-y-1.5">
          <p className="text-base font-semibold leading-tight text-foreground">
            <span className="font-bold text-green-500">
              Milestone Achievement:
            </span>{" "}
            We are thrilled to announce that{" "}
            <span className="font-bold">over 1,000 copies</span> of &ldquo;A
            Human But From Gaza&rdquo; have been ordered.
          </p>
          <p className="text-sm font-normal leading-relaxed text-muted-foreground sm:text-base">
            Join this growing community of supporters who are amplifying the
            voices of Gazans and standing in solidarity with their resilience
            and hope.
          </p>
        </div>
      </div>

      <div className="absolute right-5 top-5 flex gap-1.5 opacity-25 sm:right-5 sm:top-5">
        <div className="size-2 bg-green-400" />
        <div className="size-2 bg-green-500" />
        <div className="size-2 bg-green-600" />
        <div className="size-2 bg-green-700" />
        <div className="size-2 bg-green-800" />
      </div>
    </div>
  );
};
