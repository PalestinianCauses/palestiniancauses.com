// REVIEWED - 01

import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Container } from "../globals/container";
import { Button } from "../ui/button";

const benefits = [
  "2 heartfelt diaries from L. and M.",
  "2 breathtaking artworks by N.",
];

export const SneakPeak = function SneakPeak() {
  return (
    <section
      id="sneak-peak"
      data-section="sneak-peak"
      className="relative isolate">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col gap-16 rounded-3xl bg-foreground/5 px-6 py-16 ring-1 ring-foreground/10 sm:p-8 lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:py-20 xl:gap-x-20 xl:px-20">
          <div className="shrink-1 relative grow basis-0 rounded-3xl bg-foreground/5 p-3 shadow-2xl ring-1 ring-inset ring-foreground/10">
            <Image
              src="/book/p-05.png"
              alt="N. Art-Work"
              sizes="12rem"
              fill
              className="!static block aspect-[2/3] !h-auto !w-full rounded-2xl object-cover"
            />
          </div>
          <div className="shrink-1 grow-[2] basis-0">
            <h2
              className="font-stretch text-pretty bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              Take a Free Glimpse Into Our Book.
            </h2>
            <p className="mt-6 text-pretty text-lg/8 text-muted-foreground">
              Step into the world of our book with a free glimpse into two
              powerful diaries from L. and M., complemented by two stunning
              artworks by N. Discover the resilience and creativity that shine
              through these pages.
            </p>
            <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-3 text-base/7 text-foreground sm:grid-cols-2">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="h-7 w-5 flex-none text-secondary"
                  />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-16 flex gap-x-4">
              <Button size="lg" asChild>
                <Link href="/book/sneak-peak">Get your free sample</Link>
              </Button>
              <Button variant="link" asChild>
                <Link href="/book#pricing">Order your copy</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
