// REVIEWED

import { AtSignIcon, CalendarIcon, MapIcon } from "lucide-react";

import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";
import { Badge } from "../ui/badge";

const EducationCard = function EducationCard({
  institution,
  location,
  degree,
  status,
  dateStart,
  dateEnd,
  description,
}: {
  institution: string;
  location: string;
  degree: string;
  status: "in-progress" | "graduated" | "dropped-out";
  dateStart: string;
  dateEnd?: string | null;
  description: string;
}) {
  const statuses = {
    "in-progress": "In Progress",
    "graduated": "Graduated",
    "dropped-out": "Dropped Out",
  };

  return (
    <article className="flex flex-col items-start justify-start">
      <div className="relative mb-6 flex flex-wrap items-center gap-5">
        <Badge
          size="sm"
          className={cn("text-sm", {
            "border-l-2 border-tertiary bg-tertiary/10 text-tertiary ring-0 hover:bg-tertiary/10":
              status === "in-progress",
            "border-l-2 border-tertiary-2 bg-tertiary-2/10 text-tertiary-2 ring-0 hover:bg-tertiary-2/10":
              status === "graduated",
            "border-l-2 border-secondary bg-secondary/10 text-secondary ring-0 hover:bg-secondary/10":
              status === "dropped-out",
          })}>
          {statuses[status]}
        </Badge>

        <Paragraph className="flex items-center gap-2.5 text-base font-medium text-foreground lg:text-lg">
          <CalendarIcon className="mb-0.5 h-5 w-5 shrink-0 stroke-[1.5]" />
          <time dateTime={dateStart}>
            {new Date(dateStart).toLocaleString("default", {
              year: "numeric",
              month: "long",
            })}
          </time>
          <span className="h-0.5 w-4 bg-foreground" />
          <span>
            {dateEnd
              ? new Date(dateEnd).toLocaleString("default", {
                  year: "numeric",
                  month: "long",
                })
              : "Present"}
          </span>
        </Paragraph>
      </div>

      <SubSectionHeading as="h4" small className="mb-6">
        {degree}
      </SubSectionHeading>

      <div className="mb-6 grid grid-cols-2 gap-2.5 lg:gap-5">
        {[
          { icon: AtSignIcon, label: institution },
          { icon: MapIcon, label: location },
        ].map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-1 content-start items-start gap-2.5 sm:grid-cols-[repeat(2,_max-content)] sm:items-center">
            <div className="flex h-8 w-8 items-center justify-center bg-primary-foreground text-foreground ring-1 ring-input">
              <item.icon className="mb-0.5 h-4 w-4 shrink-0 stroke-2" />
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
      <Paragraph>{description}</Paragraph>
    </article>
  );
};

export const Education = function Education({
  education,
}: Pick<Room, "education">) {
  return (
    <Container as="section" className="section-padding-start-lg max-w-7xl">
      <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
        A Journey in Learning
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-12 lg:mb-24">
        Built on Formal Education, Fueled by a Passion for Continuous Growth.
      </SectionHeading>
      <div className="section-gap grid xl:gap-24">
        {education
          ? education.map((item) => (
              <EducationCard key={item.institution} {...item} />
            ))
          : null}
      </div>
    </Container>
  );
};
