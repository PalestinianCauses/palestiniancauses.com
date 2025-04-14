// REVIEWED - 01

import Image from "next/image";

import { motions } from "@/lib/motion";
import { Product } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";

import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import { MotionDiv, MotionP, MotionSpan } from "../globals/motion";
import { Badge } from "../ui/badge";

import { HeaderButtons } from "./header-buttons";

const pagesImages = [
  { name: "Image - 01", image: "/a-human-but-from-gaza/B-3.jpg" },
  { name: "Image - 02", image: "/a-human-but-from-gaza/B-6.jpg" },
  { name: "Image - 03", image: "/a-human-but-from-gaza/C-32.jpg" },
  { name: "Image - 04", image: "/a-human-but-from-gaza/C-35.jpg" },
  { name: "Image - 05", image: "/a-human-but-from-gaza/B-9.jpg" },
  { name: "Image - 06", image: "/a-human-but-from-gaza/B-14.jpg" },
  { name: "Image - 07", image: "/a-human-but-from-gaza/C-39.jpg" },
  { name: "Image - 08", image: "/a-human-but-from-gaza/C-42.jpg" },
  { name: "Image - 09", image: "/a-human-but-from-gaza/B-22.jpg" },
  { name: "Image - 10", image: "/a-human-but-from-gaza/B-11.jpg" },
  { name: "Image - 11", image: "/a-human-but-from-gaza/C-49.jpg" },
  { name: "Image - 12", image: "/a-human-but-from-gaza/C-36.jpg" },
  { name: "Image - 13", image: "/a-human-but-from-gaza/B-12.jpg" },
  { name: "Image - 14", image: "/a-human-but-from-gaza/B-19.jpg" },
  { name: "Image - 15", image: "/a-human-but-from-gaza/C-44.jpg" },
  { name: "Image - 16", image: "/a-human-but-from-gaza/C-54.jpg" },
  { name: "Image - 17", image: "/a-human-but-from-gaza/B-21.jpg" },
  { name: "Image - 18", image: "/a-human-but-from-gaza/C-52.jpg" },
];

export const Header = function Header({ product }: { product: Product }) {
  return (
    <header>
      <div className="my-32">
        <Container>
          <div className="mx-auto flex max-w-6xl flex-col items-start justify-center md:items-center">
            <MotionDiv
              initial={motions.fadeIn.initial}
              animate={motions.fadeIn.whileInView}
              transition={motions.transition({})}
              className="mb-4">
              <Badge variant="outline">
                Be Part For PalestinianCauses&apos; Journey
              </Badge>
            </MotionDiv>
            <h1 className="mb-6 flex w-full max-w-4xl flex-wrap justify-start gap-x-1.5 text-left text-6xl leading-none tracking-tight sm:text-7xl md:justify-center md:text-center lg:max-w-none lg:text-8xl xl:text-9xl">
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
              transition={motions.transition({ delay: 0.4 })}
              className="mb-12 max-w-5xl text-pretty text-left text-base text-muted-foreground sm:text-xl/8 md:text-center">
              Discover{" "}
              <span className="font-medium italic text-foreground">
                A Human But From Gaza
              </span>
              , a powerful book of diaries and art capturing Gazans&apos; pain,
              resilience, and hope of life under war. Stand with Gaza and share
              its people&apos;s voices—order your copy now.
            </MotionP>
            <HeaderButtons product={product} />
          </div>
        </Container>
      </div>
      <MotionDiv
        initial={motions.fadeInLeft.initial}
        animate={motions.fadeInLeft.whileInView}
        transition={motions.transition({})}
        className="relative max-w-full border-y border-muted py-5">
        <div className="absolute left-1/2 top-1/2 z-20 aspect-[2/3] h-auto w-72 -translate-x-1/2 -translate-y-1/2 lg:w-96">
          <MotionDiv
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({ delay: 0.5 })}
            className="relative h-full w-full border border-muted">
            <Image
              src="/a-human-but-from-gaza/book-cover.jpeg"
              alt="Book Cover"
              priority
              fill
              sizes="18rem"
              className="!relative object-cover object-left"
            />
          </MotionDiv>
        </div>
        <InfiniteMarquee speed={80}>
          {pagesImages.map(({ name, image }, index) => (
            <MarqueeItem key={name} delay={index * 0.1}>
              <Image
                src={image}
                alt={name}
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
