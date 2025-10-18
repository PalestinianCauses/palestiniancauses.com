// REVIEWED - 02

import { CalendarIcon } from "lucide-react";
import { ElementType, Fragment, HTMLAttributes } from "react";

import { cn } from "@/lib/utils/styles";

import { Paragraph, SubSectionHeading } from "../globals/typography";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "../ui/tooltip";

export const DateRange = function DateRange({
  dateStartOnly,
  dateStart,
  dateEnd,
  options = {
    year: "numeric",
    month: "long",
  },
  className,
}: {
  dateStartOnly?: boolean;
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
      {!dateStartOnly ? (
        <Fragment>
          <span className="h-0.5 w-4 bg-foreground" />
          <span>
            {dateEnd
              ? new Date(dateEnd).toLocaleString("default", options)
              : "Present"}
          </span>
        </Fragment>
      ) : null}
    </Paragraph>
  );
};

export const InformationBadges = function InformationBadges({
  badges,
  className,
  iconContainerClassName,
  iconClassName,
}: {
  badges: {
    label: string;
    icon: ElementType;
  }[];
  iconContainerClassName?: string;
  iconClassName?: string;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-6 grid w-full grid-cols-1 gap-6 [@media(min-width:20rem)]:grid-cols-2",
        className,
      )}>
      {badges.map((item) => (
        <div
          key={item.label}
          className="grid flex-1 grid-cols-1 content-start items-start gap-2.5 sm:grid-cols-[max-content,_auto] sm:items-center">
          <div
            className={cn(
              "flex h-8 w-8 items-center justify-center bg-primary-foreground text-foreground ring-1 ring-input",
              iconContainerClassName,
            )}>
            <item.icon
              className={cn("h-4 w-4 shrink-0 stroke-2", iconClassName)}
            />
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <SubSectionHeading
                as="h5"
                small
                className="truncate text-base tracking-normal lg:text-base xl:text-base">
                {item.label}
              </SubSectionHeading>
            </TooltipTrigger>
            <TooltipContent>
              <TooltipArrow />
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      ))}
    </div>
  );
};
