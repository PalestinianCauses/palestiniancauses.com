// REVIEWED - 02

import {
  CalendarFoldIcon,
  LucideProps,
  UserIcon,
  VerifiedIcon,
} from "lucide-react";
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";

import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

import { Paragraph } from "../globals/typography";
import { Skeleton } from "../ui/skeleton";

export const DiaryEntryBadgesLoading = function DiaryEntryBadgesLoading() {
  return (
    <div className="relative flex flex-wrap items-center gap-3 before:absolute before:-left-5 before:top-0 before:h-full before:w-px before:bg-foreground lg:gap-5">
      <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
      <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
    </div>
  );
};

export const DiaryEntryBadges = function DiaryEntryBadges({
  isAnonymous,
  author,
  date,
  className,
}: {
  isAnonymous: boolean;
  author: Partial<User> | null | undefined;
  date: string;
} & HTMLAttributes<HTMLDivElement>) {
  const badges: [
    {
      type: "date";
      label: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    },
    {
      type: "name";
      label: string;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      >;
    },
    {
      type: "pc-author";
      label: string | null;
      icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
      > | null;
    },
  ] = [
    {
      type: "date",
      label: date,
      icon: CalendarFoldIcon,
    },
    (!isAnonymous &&
      author &&
      author.firstName && {
        type: "name",
        label: ["By", author.firstName].join(" "),
        icon: UserIcon,
      }) || { type: "name", label: "By Anonymous", icon: UserIcon },
    (author &&
      (author.role === "admin" || author.role === "system-user") && {
        type: "pc-author",
        label: "Author in PalestinianCauses",
        icon: VerifiedIcon,
      }) || {
      type: "pc-author",
      label: null,
      icon: null,
    },
  ];

  return (
    <div
      className={cn(
        "relative flex flex-wrap items-center gap-3 before:absolute before:-left-5 before:top-0 before:h-full before:w-px before:bg-foreground lg:gap-5",
        className,
      )}>
      {badges.map(
        (badge) =>
          (badge.label && badge.icon && (
            <Paragraph
              key={badge.type}
              className="flex items-center gap-2 text-base font-medium text-foreground lg:text-lg">
              <badge.icon className="mb-0.5 h-5 w-5 shrink-0 stroke-[1.5]" />
              {badge.label}
            </Paragraph>
          )) ||
          null,
      )}
    </div>
  );
};
