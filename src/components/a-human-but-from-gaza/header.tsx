// REVIEWED - 07

import Image from "next/image";
import { Suspense } from "react";

import { getBlobsByPrefix } from "@/actions/blob";
import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils/styles";

import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import { MotionDiv, MotionP, MotionSpan } from "../globals/motion";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

import { HeaderButtons } from "./header-buttons";

const HeaderImages = async function HeaderImages() {
  const { data: images } = await getBlobsByPrefix("book-pages-images/");

  if (!images || images.blobs.filter((blob) => blob.size !== 0).length === 0)
    return null;

  return (
    <InfiniteMarquee speed={80}>
      {images.blobs
        .filter((blob) => blob.size !== 0)
        .map(async (blob, index) => (
          <MarqueeItem key={blob.pathname} delay={index * 0.1}>
            <Image
              src={blob.url}
              alt={`Book Image ${index.toString()}`}
              fill
              sizes="(min-width: 64rem) 12rem, (min-width: 48rem) 10rem, 8rem"
              placeholder="empty"
              className="!relative aspect-[2/3] !w-60 max-w-none object-cover opacity-20 lg:!w-80"
            />
          </MarqueeItem>
        ))}
    </InfiniteMarquee>
  );
};

const HeaderCover = async function HeaderCover() {
  const { data: cover } = await getBlobsByPrefix("book-cover/");

  if (!cover || cover.blobs.filter((blob) => blob.size !== 0).length === 0)
    return null;

  return (
    <div className="absolute left-1/2 top-1/2 z-20 aspect-[2/3] h-auto w-72 -translate-x-1/2 -translate-y-1/2 lg:w-96">
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        animate={motions.fadeIn.whileInView}
        transition={motions.transition({ delay: 0.3 })}
        className="relative h-full w-full border border-muted">
        <Image
          src={cover.blobs.filter((blob) => blob.size !== 0)[0].url}
          alt="Book Cover"
          priority
          fill
          placeholder="empty"
          sizes="(min-width: 64rem) 14rem, (min-width: 48rem) 12rem, 10rem"
          className="!relative object-cover object-left"
        />
      </MotionDiv>
    </div>
  );
};

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
          <Suspense
            fallback={<Skeleton className="h-full w-full bg-primary/5" />}>
            <HeaderCover />
          </Suspense>
        </div>
        <Suspense
          fallback={
            <Skeleton className="h-[22.5rem] w-full bg-primary/5 lg:h-[30rem]" />
          }>
          <HeaderImages />
        </Suspense>
      </MotionDiv>
    </header>
  );
};
