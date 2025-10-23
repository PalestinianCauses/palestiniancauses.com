// REVIEWED - 05

import {
  ArrowRightIcon,
  CopyCheckIcon,
  TimerIcon,
  UserCheckIcon,
} from "lucide-react";
import { ElementType, Fragment, HTMLAttributes, useId } from "react";

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
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const State = function State({
  align = "left",
  state,
}: {
  align?: "left" | "right";
  state: {
    icon: ElementType;
    number: number;
    label: string;
    description: string;
  };
}) {
  return (
    <Card className="group relative overflow-hidden border-none bg-background shadow-none">
      <div
        className={cn(
          "absolute top-0 grid h-full grid-rows-[3rem_1fr] gap-5 sm:grid-rows-[4rem_1fr]",
          {
            "left-0": align === "left",
            "left-0 lg:left-auto lg:right-0": align === "right",
          },
        )}>
        <div className="w-px bg-foreground" />
        <div className="row-span-2 w-px bg-input" />
      </div>
      <CardContent className="p-0 px-5">
        <div
          className={cn("grid", {
            "justify-start": align === "left",
            "lg:justify-end": align === "right",
          })}>
          <div
            className={cn("mb-5 flex items-center", {
              "justify-start": align === "left",
              "lg:justify-end": align === "right",
            })}>
            <div className="flex h-12 w-12 items-center justify-center border border-input sm:h-16 sm:w-16">
              <state.icon className="h-6 w-6 stroke-[1.5] sm:h-8 sm:w-8" />
            </div>
          </div>
          <div
            className={cn("grid gap-3", {
              "justify-start text-left": align === "left",
              "lg:justify-end lg:text-right": align === "right",
            })}>
            <SectionHeading
              as="p"
              className={cn("flex items-baseline gap-0.5 font-bold", {
                "justify-start": align === "left",
                "lg:justify-end": align === "right",
              })}>
              <span>+</span>
              <span>{state.number}</span>
            </SectionHeading>
            <div className="grid gap-1.5">
              <SubSectionHeading as="h3" small>
                {state.label}
              </SubSectionHeading>
              <Paragraph className="max-w-[20rem] !text-base sm:max-w-[22rem] xl:!text-lg">
                {state.description}
              </Paragraph>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const SVGCircle = function SVGCircle({
  className,
}: HTMLAttributes<SVGElement>) {
  const id = useId();

  return (
    <svg
      viewBox="0 0 1024 1024"
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,_white,_transparent)]",
        className,
      )}>
      <circle r={512} cx={512} cy={512} fill={`url(#${id})`} />
      <defs>
        <radialGradient id={id}>
          <stop style={{ stopColor: "rgb(var(--primary) / 0.2)" }} />
          <stop offset={1} style={{ stopColor: "rgb(var(--primary) / 0.2)" }} />
        </radialGradient>
      </defs>
    </svg>
  );
};

const CTA = function CTA() {
  return (
    <Container
      as="section"
      className="mx-auto mt-12 max-w-7xl px-0 lg:mt-24 lg:px-7 xl:mt-32">
      <div className="relative isolate overflow-hidden bg-primary-foreground/50 px-5 py-24 text-center ring-1 ring-input sm:px-12">
        <SectionHeading
          as="h2"
          className="mx-auto mb-6 max-w-xl lg:max-w-3xl xl:max-w-4xl">
          Whether it&apos;s a collaboration, a goal, or just a hello—let&apos;s
          connect.
        </SectionHeading>
        <Paragraph className="mx-auto mb-12 max-w-3xl">
          My digital door is always open. Whether you have something in mind or
          simply want to see more, here are the next steps.
        </Paragraph>
        <div className="flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:gap-5">
          <Button className="w-full hover:bg-accent sm:w-max">
            <ArrowRightIcon />
            Get in Touch
          </Button>
          <Button className="w-full hover:bg-accent sm:w-max" variant="ghost">
            Explore My Professional Journey
          </Button>
        </div>
        <SVGCircle />
      </div>
    </Container>
  );
};

const Content = function Content({
  paragraphs,
}: {
  paragraphs: { paragraph: string }[];
}) {
  return (
    <Container as="section" className="section-margin-start max-w-7xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-24">
        {paragraphs.map((paragraph) => (
          <Paragraph key={paragraph.paragraph} className="text-foreground">
            {paragraph.paragraph}
          </Paragraph>
        ))}
      </div>
    </Container>
  );
};

export const About = function About({
  about: {
    headline,
    "headline-sub": headlineSub,
    paragraphs,
    photograph,
    stats,
  },
}: Pick<Room, "about">) {
  const states = [
    {
      icon: TimerIcon,
      number: stats.experience.years,
      label: stats.experience.heading,
      description: stats.experience.description,
    },
    {
      icon: UserCheckIcon,
      number: stats.happyClients.clients,
      label: stats.happyClients.heading,
      description: stats.happyClients.description,
    },
    {
      icon: CopyCheckIcon,
      number: stats.milestonesAchieved.milestones,
      label: stats.milestonesAchieved.heading,
      description: stats.milestonesAchieved.description,
    },
  ];

  const aboutPhotograph = getMediaURL(photograph);
  const aboutAltPhotograph = getMediaAltText(photograph);

  return (
    <Fragment>
      <Container
        as="section"
        id="about"
        className="section-padding-start-lg max-w-7xl">
        <div className={cn("section-gap grid")}>
          <div
            className={cn("section-gap grid", {
              "xl:grid-cols-2": aboutPhotograph,
              "lg:grid-cols-[2fr_1fr] xl:grid-cols-2": !aboutPhotograph,
            })}>
            <div className="order-2 flex flex-col items-start justify-start xl:order-1">
              <SectionHeadingBadge as="h2" className="mb-3 lg:mb-6">
                {headlineSub}
              </SectionHeadingBadge>
              <SectionHeading as="h3" className="mb-6 lg:mb-12">
                {headline}
              </SectionHeading>
              <Paragraph className="mb-6 lg:mb-12">
                {paragraphs[0].paragraph}
              </Paragraph>
              <Button>
                <ArrowRightIcon />
                Start your project
              </Button>
            </div>

            {!aboutPhotograph ? (
              <div className="order-2 grid items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-1">
                {states.map((state) => (
                  <State key={state.label} align="right" state={state} />
                ))}
              </div>
            ) : (
              <div className="order-1 xl:order-2">
                <div className="group relative h-full">
                  <div className="relative mx-auto h-full max-w-xl overflow-hidden border border-input bg-background">
                    <SuspenseImage
                      isLoadingElement={
                        <Skeleton className="aspect-square w-full lg:aspect-auto lg:h-full" />
                      }
                      src={aboutPhotograph}
                      alt={aboutAltPhotograph || "Room About's Photograph"}
                      fill
                      className="!static object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute left-0 top-0 h-8 w-8 border-l border-t border-foreground" />
                    <div className="absolute right-0 top-0 h-8 w-8 border-r border-t border-foreground" />
                    <div className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-foreground" />
                    <div className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-foreground" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {aboutPhotograph ? (
            <div className="grid items-start gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {states.map((state) => (
                <State key={state.label} state={state} />
              ))}
            </div>
          ) : null}
        </div>
      </Container>
      <CTA />
      <Content paragraphs={paragraphs.slice(1)} />
    </Fragment>
  );
};
