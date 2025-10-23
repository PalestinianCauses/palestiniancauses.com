// REVIEWED - 02
import {
  ArrowUpRight,
  CheckIcon,
  ClockIcon,
  TagsIcon,
  XIcon,
} from "lucide-react";

import { isObject } from "@/lib/types/guards";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";
import { Button } from "../ui/button";

import { InformationBadges } from "./globals";

export const ServiceItem = function ServiceItem({
  service,
}: {
  service: NonNullable<NonNullable<Room["services"]>["list"]>[number];
}) {
  if (!isObject(service)) return null;
  return (
    <div className="pt-16 lg:pt-0">
      <InformationBadges
        className="[@media(min-width:20rem)]:grid-cols-1"
        iconContainerClassName="bg-transparent text-foreground ring-0"
        iconClassName="h-6 w-6 stroke-[1.5]"
        badges={[
          {
            label:
              typeof service.category === "number"
                ? "No Specified Category"
                : service.category.name,
            icon: TagsIcon,
          },
        ]}
      />
      <SubSectionHeading as="h4" className="mb-3 line-clamp-3 lg:mb-6">
        {service.name}
      </SubSectionHeading>
      <Paragraph small className="mb-3 line-clamp-[8] lg:mb-6">
        {service.description}
      </Paragraph>
      <InformationBadges
        className="mb-12 gap-3 [@media(min-width:20rem)]:grid-cols-1"
        iconClassName="h-4 w-4"
        badges={[
          {
            label:
              // eslint-disable-next-line no-nested-ternary
              service.status === "available"
                ? "Available"
                : service.status === "unavailable"
                  ? "Not Available"
                  : "Coming Soon",
            icon:
              // eslint-disable-next-line no-nested-ternary
              service.status === "available"
                ? CheckIcon
                : service.status === "unavailable"
                  ? XIcon
                  : ClockIcon,
          },
          {
            label: service.duration
              ? `Estimated duration is ${service.duration}`
              : "Duration is project dependent",
            icon: ClockIcon,
          },
        ]}
      />
      <Button variant="outline">
        <ArrowUpRight className="!size-5" />
        Order Service
      </Button>
    </div>
  );
};

export const Services = function Services({
  services,
}: {
  services: Omit<NonNullable<Room["services"]>, "list"> & {
    list: NonNullable<NonNullable<Room["services"]>["list"]>;
  };
}) {
  return (
    <Container
      as="section"
      id="services"
      className="section-padding-start-lg max-w-7xl">
      <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
        {services["headline-sub"]}
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-12 lg:mb-24">
        {services.headline}
      </SectionHeading>
      <div className="isolate grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
        {services.list.map((service) => (
          <ServiceItem
            key={typeof service === "number" ? service : service.id}
            service={service}
          />
        ))}
      </div>
    </Container>
  );
};
