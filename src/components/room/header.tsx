// REVIEWED - 07

import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import { SectionTitle } from "../globals/typography";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";

import { HeaderAvatar } from "./header-avatar";

type Information = Pick<Room, "information">;
export type HeaderProps = Pick<
  Information["information"],
  "name" | "title" | "headline" | "status" | "photograph"
>;

export const Header = function Header({
  name,
  title,
  headline,
  status,
  photograph,
}: HeaderProps) {
  const messageBase =
    "relative z-30 text-xs font-medium overflow-visible sm:text-sm sm:px-3 sm:py-2";

  return (
    <Container as="section" className="max-w-7xl">
      <div className="relative mb-16 flex flex-col md:items-center">
        <TooltipProvider>
          <Tooltip open>
            <HeaderAvatar name={name} photograph={photograph} />
            <TooltipContent
              side="top"
              align="start"
              sideOffset={8}
              avoidCollisions={false}
              className={cn(
                messageBase,
                "max-w-[14rem] bg-primary-foreground text-primary",
              )}>
              <TooltipArrow
                width={12}
                height={6}
                className="fill-primary-foreground"
              />
              <p className="truncate">Hello, I am {name} 👋🏻 !</p>
            </TooltipContent>
            <TooltipContent
              side="right"
              align="center"
              sideOffset={8}
              avoidCollisions={false}
              className={cn(messageBase, "hidden max-w-[16rem] 2xs:block", {
                "border-r-2 border-tertiary-2 bg-tertiary-2/10 text-tertiary-2":
                  status === "available",
                "border-r-2 border-tertiary bg-tertiary/10 text-tertiary":
                  status === "working",
                "border-r-2 border-secondary bg-secondary/10 text-secondary":
                  status === "unavailable",
              })}>
              <TooltipArrow
                width={12}
                height={6}
                className={cn({
                  "fill-tertiary-2/10": status === "available",
                  "fill-tertiary/10": status === "working",
                  "fill-secondary/10": status === "unavailable",
                })}
              />
              <p className="truncate">
                {/* eslint-disable no-nested-ternary */}
                {status === "available"
                  ? "Open to New Opportunities"
                  : status === "working"
                    ? "Currently Engaged"
                    : status === "unavailable"
                      ? "Not Available"
                      : "Not Available"}
              </p>
            </TooltipContent>
            <TooltipContent
              side="bottom"
              align="start"
              sideOffset={8}
              avoidCollisions={false}
              className={cn(
                messageBase,
                "max-w-[20rem] bg-primary text-primary-foreground",
              )}>
              <TooltipArrow width={12} height={6} className="fill-primary" />
              <p className="truncate">{title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <SectionTitle
        as="h1"
        className="mx-auto mb-12 text-left font-bold !leading-[0.95] md:text-center lg:mb-24"
        style={{ wordBreak: "break-word" }}>
        {headline}
      </SectionTitle>

      <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:gap-5 md:justify-center">
        <Button size="lg" className="w-full sm:w-max" asChild>
          <Link href="#packages">
            <ArrowRightIcon />
            View my packages & pricing
          </Link>
        </Button>
        <Button variant="ghost" size="lg" className="w-full sm:w-max" asChild>
          <Link href="#contact">Connect with me</Link>
        </Button>
      </div>
    </Container>
  );
};
