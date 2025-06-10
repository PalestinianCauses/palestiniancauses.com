// REVIEWED - 06

import Image from "next/image";

import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils/styles";

/* eslint-disable import/extensions */
import pagesImagesBlurHashes from "../../../data/book-pages-images-blur-hashes.json";
import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import { MotionDiv, MotionP, MotionSpan } from "../globals/motion";
import { Badge } from "../ui/badge";

import { HeaderButtons } from "./header-buttons";

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
              src={`https://qwvvvruhbe.ufs.sh/f/${pagesImagesBlurHashes[0].id}`}
              alt="Book Cover"
              priority
              fill
              placeholder="blur"
              blurDataURL={pagesImagesBlurHashes[0].base64}
              sizes="(min-width: 1024px) 16rem, (min-width: 768px) 14rem, 12rem"
              className="!relative object-cover object-left"
            />
          </MotionDiv>
        </div>
        <InfiniteMarquee speed={80}>
          {pagesImagesBlurHashes.slice(1).map(async (image, index) => (
            <MarqueeItem key={image.id} delay={index * 0.1}>
              <Image
                src={`https://qwvvvruhbe.ufs.sh/f/${image.id}`}
                alt={`Book Image ${index.toString()}`}
                fill
                sizes="(min-width: 1024px) 12rem, (min-width: 768px) 10rem, 8rem"
                placeholder="blur"
                blurDataURL={image.base64}
                className="!relative aspect-[2/3] !w-60 max-w-none object-cover opacity-20 lg:!w-80"
              />
            </MarqueeItem>
          ))}
        </InfiniteMarquee>
      </MotionDiv>
    </header>
  );
};
