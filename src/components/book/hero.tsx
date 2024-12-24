// REVIEWED - 03
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "../globals/container";
import { Button } from "../ui/button";

import { HeroBackgroundPattern } from "./hero-background-pattern";

export const Hero = function Hero() {
  return (
    <header className="relative isolate overflow-hidden">
      <HeroBackgroundPattern />
      <Container>
        <div className="h-full min-h-screen w-full py-12 lg:flex lg:items-center lg:gap-5 lg:py-40">
          <div className="relative z-20 lg:mx-0 lg:shrink lg:grow-[1.5] lg:basis-[0]">
            <Image
              src="/pc-logo-primary-foreground.png"
              alt="PC Logo"
              sizes="4rem"
              fill
              className="!static !h-auto !w-16"
            />
            <div className="mt-24 lg:mt-16">
              <Link
                href="/"
                className="inline-flex flex-col items-start space-y-6 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
                <Button
                  variant="outline"
                  className="rounded-full border-0 bg-secondary/15 text-foreground ring-1 ring-inset ring-secondary/35 hover:bg-secondary"
                  asChild>
                  <span>Be Part Of The Story</span>
                </Button>
                <span className="inline-flex items-center space-x-2 text-sm/6 font-medium text-foreground">
                  <span>Just published our book</span>
                  <ChevronRightIcon
                    aria-hidden="true"
                    className="size-5 text-muted-foreground"
                  />
                </span>
              </Link>
            </div>
            <h1
              className="font-stretch mt-10 text-pretty bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-5xl font-bold tracking-tight text-foreground sm:text-7xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              Families&apos; Shadows Over Gaza&apos;s Rubble.
            </h1>
            <p className="mt-8 text-pretty text-lg font-normal text-muted-foreground sm:text-xl/8">
              Discover{" "}
              <span className="font-medium italic text-foreground">
                A Human But From Gaza
              </span>
              , a powerful book of diaries and art capturing Gaza&apos;s pain,
              resilience, and hope of life under war. Stand with Gaza and share
              in its people&apos; voices—order your copy now.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Button variant="secondary" size="lg" className="text-base">
                Support Gaza: Order Now
              </Button>
              <Button variant="link" className="text-base">
                About us <ChevronRightIcon className="size-5" />
              </Button>
            </div>
          </div>
          <div className="z-10 mx-auto flex aspect-[2/3] w-full max-w-lg [perspective:75rem] lg:max-w-none lg:flex-1">
            <div className="book-animation relative isolate flex w-full justify-self-center overflow-hidden rounded-3xl bg-foreground/5 p-3 shadow-2xl ring-1 ring-inset ring-foreground/10 transition-all duration-500 [transform-style:preserve-3d]">
              <Image
                src="/book/book-cover.jpeg"
                alt="Book Cover"
                sizes="10rem"
                fill
                className="!static rounded-2xl object-cover shadow-2xl ring-1 ring-foreground/5"
              />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};
