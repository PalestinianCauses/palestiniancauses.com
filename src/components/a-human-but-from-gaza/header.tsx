// REVIEWED - 05

import Image from "next/image";

import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils/styles";

import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import { MotionDiv, MotionP, MotionSpan } from "../globals/motion";
import { Badge } from "../ui/badge";

import { HeaderButtons } from "./header-buttons";

const pagesImages = [
  "ZhaM3m5tNWzXupgUsZLFqycP4WndTLzN26OfBisgHhIwDFav",
  "ZhaM3m5tNWzXqACWVcoriXRGFUCYnM4VwQyupegDHlAcjkT8",
  "ZhaM3m5tNWzXAZmqxTDQWCpYGiEKfnoVha73B9vycUm0dxFZ",
  "ZhaM3m5tNWzXNCfjDfI7pnld02TUuYBj7h5Z1wqxA9gG6cDe",
  "ZhaM3m5tNWzXWb2OVaBkCMB5ZmsTXvzQHedpJjhFnL4YtDuK",
  "ZhaM3m5tNWzXArrT0o9DQWCpYGiEKfnoVha73B9vycUm0dxF",
  "ZhaM3m5tNWzX7SKzcq1OKos6ixXJGbYR43yLadmgSvBOFfl0",
  "ZhaM3m5tNWzXfuzkuvpKAixQkOwjFU9IWn4ZtucV2dL16J7T",
  "ZhaM3m5tNWzXdgqPPtyQkBL6hsVXJ3nmARKb4U2IwHSCzt1N",
  "ZhaM3m5tNWzXK1bewQHqXTwp4Vz1i9W8E3u0snmYxkfd7ahP",
  "ZhaM3m5tNWzXXnaZizs3lQmOn3hCbpRi5076Djr1AqsM9WBY",
  "ZhaM3m5tNWzXlfKFA20VZU69xYRotjidFMf4EhzTDLlqwOpI",
  "ZhaM3m5tNWzXkXGSQsAurkPfhlS3pDOV7QXy4iLsB2xmwTzC",
  "ZhaM3m5tNWzXo1eOxqdL5FXyV96KwuQdHgNcAWroZRBaTbGM",
  "ZhaM3m5tNWzXuLZRmrFqycP4WndTLzN26OfBisgHhIwDFav0",
  "ZhaM3m5tNWzX5Nj1IAwVqz7pxkfvArRudnclJCswjP4WT0ay",
  "ZhaM3m5tNWzXLvJtjpXnNKVPyc6o1z4dOY8xjIQJgDWbMhaq",
  "ZhaM3m5tNWzX3TANHSvoJu8t0hRbWUeg4IxwMXVrS2KzfdY5",
];

export const Header = function Header() {
  return (
    <header>
      <Container className="my-32">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-center md:items-center">
          <MotionDiv
            initial={motions.fadeIn.initial}
            animate={motions.fadeIn.whileInView}
            transition={motions.transition({})}
            className="mb-4">
            <Badge variant="outline">
              Be Part Of PalestinianCauses&apos; Journey
            </Badge>
          </MotionDiv>
          <h1 className="mb-6 flex w-full max-w-4xl flex-wrap justify-start gap-x-1.5 text-left text-6xl !leading-none tracking-tight sm:text-7xl md:justify-center md:text-center lg:max-w-none lg:text-8xl xl:text-9xl">
            {[
              "Families'",
              {
                text: "Shadows ",
                class: "italic font-semibold",
              },
              "Over",
              {
                text: "Gaza's ",
                class: "italic font-semibold",
              },
              "Rubble.",
            ].map((word, index) => (
              <MotionSpan
                key={typeof word === "string" ? word : word.text}
                initial={motions.fadeIn.initial}
                animate={motions.fadeIn.whileInView}
                transition={motions.transition({ delay: index * 0.1 })}
                className={cn(
                  "whitespace-break-spaces",
                  typeof word === "string" ? "" : word.class,
                )}>
                {typeof word === "string" ? word : word.text}
              </MotionSpan>
            ))}
          </h1>
          <MotionP
            initial={motions.fadeIn.initial}
            animate={motions.fadeIn.whileInView}
            transition={motions.transition({ delay: 0.2 })}
            className="mb-12 max-w-5xl text-pretty text-left text-base text-muted-foreground sm:text-xl/8 md:text-center">
            Explore{" "}
            <span className="font-medium italic text-foreground">
              &ldquo;A Human But From Gaza,&ldquo;
            </span>
            {"  "}
            an essential collection merging intimate diaries and powerful
            artwork. Witness firsthand the pain, resilience, and enduring hope
            of Gazans living through the war in Gaza. Amplify their authentic
            voices and stand in solidarity—order your copy today to support our
            mission.
          </MotionP>
          <HeaderButtons />
        </div>
      </Container>
      <MotionDiv
        initial={motions.fadeInLeft.initial}
        animate={motions.fadeInLeft.whileInView}
        transition={motions.transition({})}
        className="relative max-w-full border-y border-muted py-5">
        <div className="absolute left-1/2 top-1/2 z-20 aspect-[2/3] h-auto w-72 -translate-x-1/2 -translate-y-1/2 lg:w-96">
          <MotionDiv
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            animate={motions.fadeIn.whileInView}
            transition={motions.transition({ delay: 0.3 })}
            className="relative h-full w-full border border-muted">
            <Image
              src="https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXWVdlmfBkCMB5ZmsTXvzQHedpJjhFnL4YtDuK"
              alt="Book Cover"
              priority
              fill
              sizes="18rem"
              className="!relative object-cover object-left"
            />
          </MotionDiv>
        </div>
        <InfiniteMarquee speed={80}>
          {pagesImages.map((image, index) => (
            <MarqueeItem key={image} delay={index * 0.1}>
              <Image
                src={`https://qwvvvruhbe.ufs.sh/f/${image}`}
                alt={`Book Image ${index.toString()}`}
                priority
                fill
                sizes="15rem"
                className="!relative aspect-[2/3] !w-60 max-w-none object-cover opacity-20 lg:!w-80"
              />
            </MarqueeItem>
          ))}
        </InfiniteMarquee>
      </MotionDiv>
    </header>
  );
};
