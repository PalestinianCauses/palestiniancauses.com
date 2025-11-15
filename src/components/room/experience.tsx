// REVIEWED - 06
import {
  ArrowRightIcon,
  AtSignIcon,
  BriefcaseIcon,
  MapIcon,
} from "lucide-react";
import Link from "next/link";

import { getMediaAltText, getMediaURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import { SuspenseImage } from "../globals/suspense-image";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

import { DateRange, InformationBadges } from "./globals";

const ExperienceCard = function ExperienceCard({
  isCurrent,
  isRemote,
  type,
  company,
  organization,
  location,
  title,
  position,
  dateStart,
  dateEnd,
  description,
}: NonNullable<NonNullable<Room["experience"]>["list"]>[0]) {
  return (
    <article className="flex flex-col items-start justify-start">
      <div className="relative mb-6 flex flex-wrap items-center gap-5">
        <Badge
          size="sm"
          className={cn("border-l-2 text-sm ring-0", {
            "border-teal-500 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
              type === "employment",
            "border-yellow-500 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
              type === "activity",
          })}>
          {type === "employment" ? "Career Position" : "External Engagement"}
        </Badge>

        {isCurrent ? (
          <Badge
            size="sm"
            className={cn(
              "border-l-2 border-tertiary-2 bg-tertiary-2/10 text-sm text-tertiary-2 ring-0 hover:bg-tertiary-2/10",
            )}>
            Now Making Impact
          </Badge>
        ) : null}

        <DateRange
          dateStart={dateStart}
          dateEnd={!isCurrent ? dateEnd : undefined}
        />
      </div>

      <SubSectionHeading as="h4" small className="mb-6">
        {title || position}
      </SubSectionHeading>

      <InformationBadges
        badges={[
          ...(company || organization
            ? [
                {
                  icon: AtSignIcon,
                  label: String(company || organization),
                },
              ]
            : []),
          ...(type === "activity"
            ? [{ icon: BriefcaseIcon, label: String(position) }]
            : []),
          {
            icon: MapIcon,
            label: isRemote || !location ? "Remote" : String(location),
          },
        ]}
      />

      <Paragraph small>{description}</Paragraph>
    </article>
  );
};

export const Experience = function Experience({
  experience,
}: Pick<Room, "experience"> & {
  experience: Omit<Room["experience"], "list"> & {
    list: NonNullable<Room["experience"]["list"]>;
  };
}) {
  const experiencePhotograph = getMediaURL(experience.photograph);
  const experienceAltPhotograph = getMediaAltText(experience.photograph);

  return (
    <Container
      as="section"
      id="experience"
      className="section-padding-start-lg mb-8 max-w-7xl">
      <div className="mx-auto flex flex-col items-start justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
        <div className="w-full lg:sticky lg:top-24 lg:max-w-lg lg:flex-auto">
          <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
            {experience["headline-sub"]}
          </SectionHeadingBadge>
          <SectionHeading as="h3" className="mb-6 lg:mb-12">
            {experience.headline}
          </SectionHeading>
          <Button className="mb-12 lg:mb-24" asChild>
            <Link href="#contact">
              <ArrowRightIcon />
              Connect with me
            </Link>
          </Button>
          <div>
            {experiencePhotograph ? (
              <div className="group relative mx-auto max-w-xl overflow-hidden border border-input bg-background">
                <SuspenseImage
                  isLoadingElement={
                    <Skeleton className="aspect-square w-full lg:aspect-[2/3]" />
                  }
                  src={experiencePhotograph}
                  alt={
                    experienceAltPhotograph || "Room Experience's Photograph"
                  }
                  fill
                  className="!static aspect-auto !h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-0 top-0 h-8 w-8 border-l border-t border-foreground" />
                <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-foreground" />
                <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-foreground" />
                <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-foreground" />
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-full lg:flex-auto">
          <h3 className="sr-only">Professional Experience</h3>
          <div className="section-gap -my-8 grid xl:gap-24">
            {experience.list.map((item) => (
              <ExperienceCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
