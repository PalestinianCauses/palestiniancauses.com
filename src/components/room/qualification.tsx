// REVIEWED - 01

import { AtSignIcon, AwardIcon, ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

import { getMediaURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import { SectionHeading, SectionHeadingBadge } from "../globals/typography";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import { DateRange, InformationBadges } from "./globals";

const QualificationCard = function QualificationCard({
  qualification: {
    title,
    issuer,
    dateStart,
    dateEnd,
    link,
    hasCertificate,
    certificate,
  },
}: {
  qualification: NonNullable<Room["qualification"]["list"]>[number];
}) {
  const certificateLink = hasCertificate ? getMediaURL(certificate) : null;
  return (
    <CarouselItem className="relative pl-5">
      <div className="absolute right-0 top-0 h-10 w-10 border-r border-t border-foreground" />
      <div className="mb-6 grid w-full grid-cols-1 items-center gap-6 p-0.5 sm:grid-cols-[max-content_auto]">
        <InformationBadges
          badges={[{ icon: AtSignIcon, label: issuer }]}
          className="shrink-1 mb-0 [@media(min-width:20rem)]:grid-cols-1"
        />
        <DateRange
          dateStartOnly
          dateStart={dateStart}
          dateEnd={dateStart !== dateEnd ? dateEnd : undefined}
          className="shrink-0"
        />
      </div>
      <SectionHeading as="h4" className="mb-12 lg:mb-24">
        {title}
      </SectionHeading>
      {(link || hasCertificate) && (
        <div className="flex w-full flex-col items-start justify-start gap-3 sm:flex-row sm:gap-6">
          {hasCertificate && certificateLink && (
            <Button
              variant="default"
              size="lg"
              className="w-full sm:w-max"
              asChild>
              <Link href={certificateLink} target="_blank">
                <AwardIcon className="!size-5" />
                View certificate
              </Link>
            </Button>
          )}
          {link && (
            <Button
              variant={hasCertificate ? "outline" : "default"}
              size="lg"
              className="w-full sm:w-max"
              asChild>
              <Link href={link} target="_blank">
                <ExternalLinkIcon className="!size-5" />
                Learn more
              </Link>
            </Button>
          )}
        </div>
      )}
      <div className="mt-6 h-6 w-6 border-b border-l border-foreground lg:mt-12" />
    </CarouselItem>
  );
};

export const Qualification = function Qualification({
  qualification,
}: {
  qualification: Omit<Room["qualification"], "list"> & {
    list: NonNullable<Room["qualification"]["list"]>;
  };
}) {
  return (
    <Container
      as="section"
      id="qualification"
      className={cn("section-padding-start-lg max-w-7xl")}>
      <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
        {qualification["headline-sub"]}
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-12 lg:mb-24">
        {qualification.headline}
      </SectionHeading>
      <Carousel>
        <CarouselContent className="mb-12 h-full items-stretch lg:mb-24">
          {qualification.list.map((item) => (
            <QualificationCard key={item.id} qualification={item} />
          ))}
        </CarouselContent>
        <div className="flex w-full items-center justify-start gap-5">
          <CarouselPrevious
            className="static h-16 w-16 translate-x-0 translate-y-0 rounded-none"
            iconClassName="!h-8 !w-8 stroke-1"
          />
          <CarouselNext
            className="static h-16 w-16 translate-x-0 translate-y-0 rounded-none"
            iconClassName="!h-8 !w-8 stroke-1"
          />
        </div>
      </Carousel>
    </Container>
  );
};
