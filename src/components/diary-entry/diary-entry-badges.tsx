"use client";

// REVIEWED - 01

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
  useState,
} from "react";

import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils/styles";
import { User } from "@/payload-types";

import { MotionDiv } from "../globals/motion";
import { Paragraph } from "../globals/typography";

export const DiaryEntryBadges = function DiaryEntryBadges({
  isAnonymous,
  date,
  author,
  className,
}: {
  isAnonymous: boolean;
  date: string;
  author: Partial<User> | null | undefined;
} & HTMLAttributes<HTMLDivElement>) {
  const [badges] = useState<
    [
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
    ]
  >(() => [
    {
      type: "date",
      label: new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
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
  ]);

  return (
    <MotionDiv
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({})}
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
    </MotionDiv>
  );
};
