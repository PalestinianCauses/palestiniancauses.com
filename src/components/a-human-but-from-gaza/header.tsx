// REVIEWED - 14

import { Suspense } from "react";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getMediaSizeURL } from "@/lib/utils/media";

import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import { SafeHydrate } from "../globals/safe-hydrate";
import { SuspenseImage } from "../globals/suspense-image";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

import { HeaderButtons } from "./header-buttons";
import { SalesAlert } from "./sales-alert";

const isLoadingElement = <Skeleton className="absolute inset-0 bg-primary/5" />;

const HeaderImages = async function HeaderImages() {
  const response = await actionSafeExecute(
    payload.find({
      collection: "media-public",
      where: { alt: { like: "book-pages-images-" } },
      limit: 0,
    }),
    messages.http.serverError,
  );

  if (!response.data || response.data.docs.length === 0) return null;

  const images = response.data.docs;

  return (
    <SafeHydrate>
      <InfiniteMarquee speed={80}>
        {images.map(async (doc, index) => {
          const src = getMediaSizeURL(doc, "room-photograph");

          if (!src) return null;

          return (
            <MarqueeItem key={doc.id}>
              <SuspenseImage
                isLoadingElement={isLoadingElement}
                src={src}
                alt={`Book Image ${index.toString()}`}
                fill
                containerClassName="w-60 lg:w-80"
                className="!relative object-cover object-top opacity-20"
              />
            </MarqueeItem>
          );
        })}
      </InfiniteMarquee>
    </SafeHydrate>
  );
};

const HeaderCover = async function HeaderCover() {
  const response = await actionSafeExecute(
    payload.find({
      collection: "media-public",
      where: { alt: { like: "book-cover-new" } },
      limit: 0,
    }),
    messages.http.serverError,
  );

  if (!response.data || response.data.docs.length === 0) return null;

  const cover = response.data.docs[0];
  const src = getMediaSizeURL(cover, "room-photograph");

  if (!src) return null;

  return (
    <div className="absolute left-1/2 top-1/2 z-20 aspect-[2/3] h-auto w-72 -translate-x-1/2 -translate-y-1/2 lg:w-96">
      <div className="relative h-full w-full border border-muted">
        <SuspenseImage
          isLoadingElement={isLoadingElement}
          src={src}
          alt="Book Cover"
          priority
          fill
          placeholder="empty"
          className="!relative object-cover object-left"
        />
      </div>
    </div>
  );
};

export const Header = function Header() {
  return (
    <header>
      <Container className="section-padding-start-xl section-padding-end-xl">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-center md:items-center">
          <Badge variant="outline" className="mb-4">
            Be Part Of PalestinianCauses&apos; Journey
          </Badge>
          <SalesAlert />
          <h1 className="mb-6 w-full max-w-4xl text-left text-6xl !leading-none tracking-tight sm:text-7xl md:justify-center md:text-center lg:max-w-none lg:text-8xl xl:text-9xl">
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
