// REVIEWED - 08

import { Suspense } from "react";

import { getBlobsByPrefix } from "@/actions/blob";

import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import { SuspenseImage } from "../globals/suspense-image";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

import { HeaderButtons } from "./header-buttons";

const isLoadingElement = <Skeleton className="absolute inset-0 bg-primary/5" />;

const HeaderImages = async function HeaderImages() {
  const { data: images } = await getBlobsByPrefix("book-pages-images/");

  if (!images || images.blobs.filter((blob) => blob.size !== 0).length === 0)
    return null;

  return (
    <InfiniteMarquee speed={80}>
      {images.blobs
        .filter((blob) => blob.size !== 0)
        .map(async (blob, index) => (
          <MarqueeItem key={blob.pathname}>
            <SuspenseImage
              isLoadingElement={isLoadingElement}
              src={blob.url}
              alt={`Book Image ${index.toString()}`}
              fill
              sizes="(min-width: 64rem) 10rem, 7.5rem"
              containerClassName="w-60 lg:w-80"
              className="!relative object-cover object-top opacity-20"
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
      <div className="relative h-full w-full border border-muted">
        <SuspenseImage
          isLoadingElement={isLoadingElement}
          src={cover.blobs.filter((blob) => blob.size !== 0)[0].url}
          alt="Book Cover"
          priority
          fill
          placeholder="empty"
          sizes="(min-width: 64rem) 12rem, 9rem"
          className="!relative object-cover object-left"
        />
      </div>
    </div>
  );
};

export const Header = function Header() {
  return (
    <header>
      <Container className="my-32">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-center md:items-center">
          <Badge variant="outline" className="mb-4">
            Be Part Of PalestinianCauses&apos; Journey
          </Badge>
          <h1 className="mb-6 flex w-full max-w-4xl flex-wrap justify-start gap-x-1.5 text-left text-6xl !leading-none tracking-tight sm:text-7xl md:justify-center md:text-center lg:max-w-none lg:text-8xl xl:text-9xl">
            Families&apos; Shadows Over Gaza&apos;s Rubble.
          </h1>
          <p className="mb-12 max-w-5xl text-pretty text-left text-base text-muted-foreground sm:text-xl/8 md:text-center">
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
          </p>
          <HeaderButtons />
        </div>
      </Container>
      <div className="relative h-[25rem] w-full max-w-full border-y border-input py-5 lg:h-[32.5rem]">
        <div className="absolute left-1/2 top-1/2 z-10 aspect-[2/3] h-auto w-72 -translate-x-1/2 -translate-y-1/2 lg:w-96">
          <Suspense fallback={isLoadingElement}>
            <HeaderCover />
          </Suspense>
        </div>
        <Suspense fallback={isLoadingElement}>
          <HeaderImages />
        </Suspense>
      </div>
    </header>
  );
};
