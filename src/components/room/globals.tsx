// REVIEWED

import { CalendarIcon } from "lucide-react";
import { ElementType, HTMLAttributes } from "react";

import { cn } from "@/lib/utils/styles";

import { Paragraph, SubSectionHeading } from "../globals/typography";

export const DateRange = function DateRange({
  dateStart,
  dateEnd,
  options = {
    year: "numeric",
    month: "long",
  },
  className,
}: {
  dateStart: string;
  dateEnd?: string | null;
  options?: Intl.DateTimeFormatOptions;
} & HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Paragraph
      className={cn(
        "flex items-center gap-2.5 text-base font-medium text-foreground lg:text-lg",
        className,
      )}>
      <CalendarIcon className="mb-0.5 h-5 w-5 shrink-0 stroke-[1.5]" />
      <time dateTime={dateStart}>
        {new Date(dateStart).toLocaleString("default", options)}
      </time>
      <span className="h-0.5 w-4 bg-foreground" />
      <span>
        {dateEnd
          ? new Date(dateEnd).toLocaleString("default", options)
          : "Present"}
      </span>
    </Paragraph>
  );
};

export const InformationBadges = function InformationBadges({
  badges,
  className,
}: {
  badges: {
    label: string;
    icon: ElementType;
  }[];
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-6 [@media(min-width:20rem)]:flex-row [@media(min-width:20rem)]:items-center",
        className,
      )}>
      {badges.map((item) => (
        <div
          key={item.label}
          className="grid grid-cols-1 content-start items-start gap-2.5 sm:grid-cols-[repeat(2,_max-content)] sm:items-center">
          <div className="flex h-8 w-8 items-center justify-center bg-primary-foreground text-foreground ring-1 ring-input">
            <item.icon className="h-4 w-4 shrink-0 stroke-2" />
          </div>
          <SubSectionHeading
            as="h5"
            small
            className="text-base tracking-normal lg:text-base xl:text-base">
            {item.label}
          </SubSectionHeading>
        </div>
      ))}
    </div>
  );
};
