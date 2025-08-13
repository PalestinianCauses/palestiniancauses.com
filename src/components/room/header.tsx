// REVIEWED - 02

import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { Container } from "../globals/container";
import { SectionTitle } from "../globals/typography";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

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
    "relative text-xs font-medium overflow-visible sm:text-sm sm:px-3 sm:py-2";

  return (
    <Container as="section" className="max-w-7xl">
      <div className="relative mb-16 flex flex-col md:items-center">
        <TooltipProvider>
          <Tooltip open>
            <TooltipTrigger asChild>
              {photograph &&
              typeof photograph === "object" &&
              photograph.url ? (
                <Avatar className="z-10 h-36 w-36 border border-input md:h-48 md:w-48 lg:h-60 lg:w-60">
                  <AvatarImage src={photograph.url} alt={photograph.alt} />
                </Avatar>
              ) : null}
            </TooltipTrigger>
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
              className={cn(messageBase, "max-w-[16rem]", {
                "bg-green-950/50 text-green-500": status === "available",
              })}>
              <TooltipArrow
                width={12}
                height={6}
                className={cn({
                  "fill-green-950/50": status === "available",
                })}
              />
              <p className="truncate">
                {status === "available"
                  ? "Open for New Opportunities"
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

      <SectionTitle className="mb-12 text-left font-bold !leading-[0.95] md:text-center lg:mb-24">
        {headline}
      </SectionTitle>

      <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:gap-5 md:justify-center">
        <Button size="lg" className="w-full sm:w-max">
          <ArrowRightIcon />
          Start your project
        </Button>
        <Button variant="ghost" size="lg" className="w-full sm:w-max">
          View my services
        </Button>
      </div>
    </Container>
  );
};
