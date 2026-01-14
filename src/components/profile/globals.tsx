// REVIEWED - 01

import { ClassValue } from "clsx";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils/styles";

import { SubSectionHeading } from "../globals/typography";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export const LoadingActivity = (
  <div className="space-y-10">
    <Skeleton className="h-8 w-48 bg-foreground/5" />
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Skeleton key={i} className="h-24 bg-foreground/5" />
      ))}
    </div>
    <Skeleton className="h-64 bg-foreground/5" />
  </div>
);

export const StatCard = function StatCard({
  color,
  label,
  value,
  icon: Icon,
  iconClassName,
}: {
  color: string;
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-start justify-center gap-2.5 overflow-hidden border-l-4 bg-gradient-to-r p-5",
        {
          "border-blue-500 from-blue-500/5": color === "blue",
          "border-teal-500 from-teal-500/5": color === "teal",
          "border-green-500 from-green-500/5": color === "green",
          "border-yellow-500 from-yellow-500/5": color === "yellow",
          "border-red-500 from-red-500/5": color === "red",
          "border-primary from-primary/5": color === "primary",
        },
      )}>
      <Icon
        className={cn(
          "absolute -bottom-5 right-0 size-24 stroke-1",
          {
            "text-blue-500": color === "blue",
            "text-teal-500": color === "teal",
            "text-green-500": color === "green",
            "text-yellow-500": color === "yellow",
            "text-red-500": color === "red",
            "text-primary": color === "primary",
          },
          iconClassName,
        )}
      />
      <SubSectionHeading
        as="h3"
        className="text-base font-semibold !leading-none lg:text-base lg:!leading-none xl:text-base xl:!leading-none">
        {label}
      </SubSectionHeading>
      <SubSectionHeading
        as="p"
        className={cn(
          "-mb-0.5 font-bold !leading-none lg:!leading-none xl:!leading-none",
          {
            "text-blue-500": color === "blue",
            "text-teal-500": color === "teal",
            "text-green-500": color === "green",
            "text-yellow-500": color === "yellow",
            "text-red-500": color === "red",
            "text-primary": color === "primary",
          },
        )}>
        {value}
      </SubSectionHeading>
    </div>
  );
};

export const StatusBadge = function StatusBadge({
  label,
  className,
}: {
  label: string | ReactNode;
  className?: ClassValue;
}) {
  return (
    <Badge className={cn("border px-2 py-1 capitalize ring-0", className)}>
      {label}
    </Badge>
  );
};
