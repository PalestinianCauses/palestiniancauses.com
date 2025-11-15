"use client";

// REVIEWED - 04

import {
  ArrowUpRight,
  BriefcaseBusinessIcon,
  CheckIcon,
  ClockIcon,
  TagsIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";

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
import { OrderForm } from "./order-form";
import { ServiceFilters } from "./service-filters";

export const ServiceItem = function ServiceItem({
  service,
  roomOwner,
}: {
  service: NonNullable<NonNullable<Room["services"]>["list"]>[number];
  roomOwner: number;
}) {
  if (!isObject(service)) return null;

  const isAvailable = service.status === "available";

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
      {isAvailable && (
        <OrderForm
          roomOwner={roomOwner}
          orderType="service"
          items={[
            {
              itemType: "service",
              service,
              price: 0,
              quantity: 1,
            },
          ]}
          trigger={
            <Button variant="outline" className="mt-auto w-full">
              <ArrowUpRight />
              Order Service
            </Button>
          }
        />
      )}
    </div>
  );
};

export const Services = function Services({
  services,
  roomOwner,
}: {
  services: Omit<NonNullable<Room["services"]>, "list"> & {
    list: NonNullable<NonNullable<Room["services"]>["list"]>;
  };
  roomOwner: number;
}) {
  const [servicesFiltered, setServicesFiltered] = useState(services.list);

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
      {services.list.length > 3 && (
        <ServiceFilters
          services={services.list}
          onFilterChange={setServicesFiltered}
          className="mb-8"
        />
      )}
      {servicesFiltered.length !== 0 ? (
        <div className="isolate grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3">
          {servicesFiltered.map((service) => (
            <ServiceItem
              key={typeof service === "number" ? service : service.id}
              service={service}
              roomOwner={roomOwner}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <BriefcaseBusinessIcon className="mx-auto mb-6 h-20 w-20 stroke-[1.5] text-foreground" />
          <SubSectionHeading
            as="h4"
            className="mx-auto text-center text-xl font-medium text-foreground lg:text-xl xl:text-xl">
            No service found matching your filters.
          </SubSectionHeading>
        </div>
      )}
    </Container>
  );
};
