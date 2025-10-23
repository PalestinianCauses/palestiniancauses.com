// REVIEWED - 03

import { ArrowUpRight, ClockIcon, PlusIcon } from "lucide-react";

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
import { Button } from "../ui/button";

import { SVGCircle } from "./about";
import { InformationBadges } from "./globals";

export const Packages = function Packages({
  packages,
}: {
  packages: Omit<NonNullable<Room["packages"]>, "list"> & {
    list: NonNullable<NonNullable<Room["packages"]>["list"]>;
  };
}) {
  return (
    <Container
      as="section"
      id="packages"
      className="section-padding-start-lg isolate overflow-hidden">
      <div className="pb-96">
        <div className="relative">
          <SVGCircle />
        </div>
      </div>
      <div className="section-padding-end -mx-5 flow-root border-t border-input bg-background lg:-mx-7">
        <div className="mx-auto -mt-80 max-w-7xl px-5 lg:px-7">
          <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
            {packages["headline-sub"]}
          </SectionHeadingBadge>
          <SectionHeading as="h3" className="mb-12 lg:mb-24">
            {packages.headline}
          </SectionHeading>
          <div className="mx-auto grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {packages.list
              .filter((packageElement) => typeof packageElement === "object")
              .sort((a, b) => a.order - b.order)
              .reverse()
              .map((packageElement) => (
                <div key={packageElement.id}>
                  <div
                    className={cn(
                      "relative flex h-full flex-col justify-between border border-input bg-primary-foreground p-5 sm:p-10",
                      {
                        "border-t-4 border-t-foreground":
                          packageElement.featured,
                      },
                    )}>
                    <div className="mb-3 flex w-full flex-wrap items-center justify-between gap-2.5 lg:mb-6">
                      <SubSectionHeading
                        as="h4"
                        className="text-sm uppercase tracking-widest lg:text-sm xl:text-sm">
                        {packageElement.name}
                      </SubSectionHeading>
                      {packageElement.featured ? (
                        <Badge
                          size="sm"
                          className="bg-foreground text-sm text-background ring-0 hover:bg-foreground">
                          Featured
                        </Badge>
                      ) : null}
                    </div>
                    <div className="mb-3 flex items-center gap-x-5 lg:mb-6">
                      <div className="flex flex-col items-start justify-start gap-1.5">
                        {packageElement.pricingType === "custom" ||
                        packageElement.pricingType === "project" ? (
                          <p className="text-sm font-medium leading-none text-foreground">
                            Starting at
                          </p>
                        ) : null}
                        <SectionHeading
                          as="p"
                          className="font-bold !leading-none tracking-wide lg:!leading-none xl:!leading-none">
                          {packageElement.price}
                        </SectionHeading>
                        <Paragraph className="text-sm font-medium !leading-none text-muted-foreground lg:text-sm lg:!leading-none xl:!leading-none">
                          <span className="block w-full truncate">
                            {
                              {
                                fixed: "One-time payment",
                                hourly: "/per hour",
                                daily: "/per day",
                                project: "Project-based pricing",
                                custom: "Custom quote",
                              }[packageElement.pricingType]
                            }
                          </span>
                        </Paragraph>
                      </div>
                      <div className="mb-0.5 flex w-0 min-w-0 flex-1 flex-col items-start justify-start gap-0.5">
                        <Badge
                          size="sm"
                          className="border-l-2 border-foreground bg-foreground/10 px-2.5 py-0.5 text-sm text-foreground ring-0 hover:bg-foreground/10">
                          {packageElement.currency}
                        </Badge>
                      </div>
                    </div>
                    <Paragraph className="mb-3 text-base lg:mb-6 lg:text-lg">
                      {packageElement.description}
                    </Paragraph>
                    {packageElement.duration ? (
                      <InformationBadges
                        className="mb-6 gap-2 [@media(min-width:20rem)]:grid-cols-1"
                        iconClassName="h-4 w-4"
                        badges={[
                          {
                            label: packageElement.duration,
                            icon: ClockIcon,
                          },
                        ]}
                      />
                    ) : null}
                    {packageElement.features &&
                      packageElement.features.length !== 0 && (
                        <ul className="mb-6 flex flex-col gap-2.5 lg:mb-12">
                          {packageElement.features.map((feature) => (
                            <li
                              key={feature.id}
                              className="flex items-center gap-2.5 text-sm font-medium leading-snug text-foreground lg:text-base">
                              <PlusIcon className="h-4 w-4 shrink-0 text-foreground/25" />
                              {feature.feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    <Button className="mt-auto w-full">
                      <ArrowUpRight className="h-4 w-4" />
                      Get Started
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
