// REVIEWED

import { ArrowRightIcon } from "lucide-react";

import { Container } from "../globals/container";
import { SectionTitle } from "../globals/typography";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

export const Header = function Header() {
  return (
    <Container
      as="section"
      className="relative max-w-7xl py-12 lg:py-24 xl:py-32">
      <div className="relative mb-12 flex flex-col md:items-center">
        <div className="relative">
          <Avatar className="z-10 h-60 w-60 border border-input md:h-48 md:w-48">
            <AvatarImage src="https://nwdtauhmkupvkywh.public.blob.vercel-storage.com/photo-17-03.jpg" />
          </Avatar>
          <div className="absolute -left-2.5 top-0 z-20 w-max max-w-60 -translate-y-1/2 border border-input bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-lg md:-left-10">
            <span className="truncate">I am Shawqi 👋🏻</span>
          </div>

          <div className="absolute bottom-6 left-16 z-20 w-60 max-w-60 border border-red-800 bg-red-900/25 px-5 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-lg md:bottom-auto md:left-40 md:top-1/2 md:w-max md:-translate-y-1/2">
            <span className="truncate">Not Available</span>
          </div>
          <div className="absolute -bottom-6 left-5 z-20 w-60 max-w-60 border border-input bg-primary-foreground/10 px-5 py-2.5 text-sm font-medium text-foreground shadow-lg backdrop-blur-lg md:-bottom-5 md:left-12 md:w-max">
            <span className="truncate">Next.JS Full Stack Developer</span>
          </div>
        </div>
      </div>
      <SectionTitle className="mb-12 text-left font-bold !leading-[0.95] md:text-center lg:mb-24">
        Delivering Scalable & User-Centric Web Experiences.
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
