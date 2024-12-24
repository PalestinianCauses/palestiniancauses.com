// REVIEWED - 01

import Image from "next/image";

import { Container } from "../globals/container";

export const About = function About() {
  return (
    <div className="relative z-10 my-24 overflow-hidden sm:my-32">
      <Container className="max-w-2xl lg:max-w-7xl">
        <div className="max-w-4xl">
          <h2
            className="font-stretch mt-2 text-pretty bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-4xl font-semibold tracking-tight text-foreground sm:text-5xl/normal"
            style={{ WebkitTextFillColor: "transparent" }}>
            About The Book.
          </h2>
          <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
            &ldquo;
            <em>A Human But From Gaza</em>
            &ldquo; is not just a book—it&apos;s a collection of raw, unfiltered
            voices that unveil the human side of Gaza&apos;s untold stories.
            This project brings together the profoundly personal diaries of{" "}
            <span className="pr-1.5">
              <em>Maha</em>
            </span>
            and <em>Lama</em>, two resilient women who lived through the recent
            war in Gaza, alongside the powerful art-work of <em>Nour</em>, which
            captures the emotions, struggles, and hopes of a people under siege.
          </p>
        </div>
        <section className="grid-cols mt-20 grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-16">
          <div className="lg:pr-8">
            <h3 className="text-pretty text-2xl font-semibold text-foreground">
              What&apos;s Inside The Pages?
            </h3>
            <p className="mt-8 text-base/7 tracking-wide text-muted-foreground">
              Through their words and art, this book provides a rare glimpse
              into the daily lives of Palestinians enduring unimaginable
              hardships. It offers stories of survival, family, and the
              unwavering spirit of a community amidst destruction. From the
              poignant reflections of a mother comforting her children to the
              sketches that reveal the shadows of a war-torn city, every page
              resonates with humanity, strength, and resilience.
            </p>
            <p className="mt-8 text-base/7 tracking-wide text-muted-foreground">
              This is more than a book; it is a bridge to understanding, a call
              for empathy, and an invitation to witness the strength of those
              who refuse to be silenced. Let their stories inspire, challenge,
              and connect you to a reality too often overlooked.
            </p>
            <h3 className="mt-12 text-pretty text-2xl font-semibold text-foreground">
              Why This Book Matters?
            </h3>
            <ul className="mt-8 space-y-5 text-muted-foreground">
              <li className="flex items-center gap-x-3">
                <div className="m-1 size-2 flex-none rounded-full bg-secondary text-secondary ring-4 ring-secondary/30" />
                <span>
                  <strong className="font-medium text-foreground">
                    Authentic Voices.
                  </strong>{" "}
                  Written by Palestinians currently living through the war.
                </span>
              </li>
              <li className="flex items-center gap-x-3">
                <div className="m-1 size-2 flex-none rounded-full bg-secondary text-secondary ring-4 ring-secondary/30" />
                <span>
                  <strong className="font-medium text-foreground">
                    Unique Format.
                  </strong>{" "}
                  Combines intimate diaries with compelling art-work.
                </span>
              </li>
              <li className="flex items-center gap-x-3">
                <div className="m-1 size-2 flex-none rounded-full bg-secondary text-secondary ring-4 ring-secondary/30" />
                <span>
                  <strong className="font-medium text-foreground">
                    A Global Message.
                  </strong>{" "}
                  Aims to break stereotypes and build awareness.
                </span>
              </li>
            </ul>
          </div>
          <div className="pt-16 lg:row-span-2 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 items-start gap-4 sm:-mx-16 sm:grid-cols-4 lg:mx-0 lg:grid-cols-2 lg:gap-4 xl:gap-8">
              <div className="overflow-hidden rounded-3xl bg-foreground/5 p-3 shadow-2xl ring-1 ring-inset ring-foreground/10">
                <Image
                  src="/book/p-01.png"
                  alt="Book Page 01"
                  fill
                  sizes="12rem"
                  className="!static block aspect-[2/3] !h-auto !w-full rounded-2xl object-cover"
                />
              </div>
              <div className="-mt-8 overflow-hidden rounded-3xl bg-foreground/5 p-3 shadow-2xl ring-1 ring-inset ring-foreground/10 lg:-mt-40">
                <Image
                  src="/book/p-03.png"
                  alt="Book Page 02"
                  fill
                  sizes="12rem"
                  className="!static block aspect-[2/3] !h-auto !w-full rounded-2xl object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-3xl bg-foreground/5 p-3 shadow-2xl ring-1 ring-inset ring-foreground/10">
                <Image
                  src="/book/p-05.png"
                  alt="Book Page 03"
                  fill
                  sizes="12rem"
                  className="!static block aspect-[2/3] !h-auto !w-full rounded-2xl object-cover"
                />
              </div>
              <div className="-mt-8 overflow-hidden rounded-3xl bg-foreground/5 p-3 shadow-2xl ring-1 ring-inset ring-foreground/10 lg:-mt-40">
                <Image
                  src="/book/p-07.png"
                  alt="Book Page 04"
                  fill
                  sizes="12rem"
                  className="!static block aspect-[2/3] !h-auto !w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};
