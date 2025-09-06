// REVIEWED - 03

import { AtSignIcon, MapIcon } from "lucide-react";

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

import { DateRange, InformationBadges } from "./globals";

const EducationCard = function EducationCard({
  institution,
  location,
  degree,
  status,
  dateStart,
  dateEnd,
  description,
}: NonNullable<Room["education"]["list"]>[0]) {
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

        <DateRange dateStart={dateStart} dateEnd={dateEnd} />
      </div>

      <SubSectionHeading as="h4" small className="mb-6">
        {degree}
      </SubSectionHeading>

      <InformationBadges
        badges={[
          { icon: AtSignIcon, label: institution },
          { icon: MapIcon, label: location },
        ]}
      />

      <Paragraph>{description}</Paragraph>
    </article>
  );
};

export const Education = function Education({
  education,
}: Pick<Room, "education"> & {
  education: Omit<Room["education"], "list"> & {
    list: NonNullable<Room["education"]["list"]>;
  };
}) {
  return (
    <Container
      as="section"
      id="education"
      className="section-padding-start-lg max-w-7xl">
      <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
        A Journey in Learning
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-12 lg:mb-24">
        {education.headline}
      </SectionHeading>
      <div className="section-gap grid xl:gap-24">
        {education.list
          ? education.list.map((item) => (
              <EducationCard key={item.institution} {...item} />
            ))
          : null}
      </div>
    </Container>
  );
};
