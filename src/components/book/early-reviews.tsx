// REVIEWED - 01

import Image from "next/image";

import { cn } from "@/lib/utils";

import { Container } from "../globals/container";

const snippets = [
  [
    [
      "I heard the sound of windows and doors breaking around me followed by the screams of children and women.",
      "A child was playing in the next room, and the rest of the house collapsed. Her parents and siblings were martyred, but she...",
      "He was inspiring and generous with his knowledge. He loved his home, poetry, and strawberries. This loss is painful, but it brings hope. If you must die, my teacher, we must live to tell your tale.",
      "So my brother rushed to tell us about the evacuation, and I thought it was a lie. I laughed! They said we were in a safe area a few days ago!",
    ],
    [
      "Which of them will I scatter my papers carrying babble that only my friends can understand? How many libraries are left? Instead...",
    ],
  ],
  [
    [
      "My brother returned from the scene and informed us: An entire residential block was destroyed in the area while eight buildings flattened to the ground.",
    ],
    [
      "That moment when the missile goes down, the seconds between its descent and its explosion, all of us shrink into ourselves, staring at each other.",
      "Unconsciously, I found my whole family, me and our relatives, at the same house, running on the street.",
      "A mother who lost her husband and continued to take his role of supporting the family and continuing on the road alone.",
      'The Dr. stopped. I raised my hand and continued: an ENGAGED, "If you want to be an intellectual, you have to be engaged."',
    ],
  ],
];

export const EarlyReviews = function EarlyReviews() {
  return (
    <section
      id="early-reviews"
      data-section="early-reviews"
      className="relative isolate pt-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold uppercase tracking-[0.2em] text-foreground">
            Surrounded By The Snippets From The Book.
          </h2>
          <p
            className="font-stretch mt-2 text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            style={{ WebkitTextFillColor: "transparent" }}>
            What Gym Rat In Gaza Said About Us?
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-foreground sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
          <figure className="rounded-2xl bg-background shadow-lg ring-1 ring-foreground/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
            <blockquote className="p-6 text-lg font-medium tracking-tight text-foreground sm:p-12 sm:text-xl/8">
              <p>
                As a Gazan who has been through all the difficulties and
                atrocities, anyone could imagine (and not imagine). I never
                thought anyone could express our feelings and thoughts through
                everything we&apos;ve lived so far, but I&apos;m glad this book
                disappointed me.
              </p>
              <p className="mt-8">
                Reading this book and going through its chapters felt like a
                journey, even to me, someone who lived these feelings and
                emotions. And I can only imagine how deeply it will affect
                everyone who reads it.
              </p>
              <p className="mt-8">
                I wouldn&apos;t hesitate to recommend it to anyone who wants to
                understand people&apos;s lives in Gaza better and what it&apos;s
                like to live through such times.
              </p>
            </blockquote>
            <figcaption className="relative flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-foreground/5 px-6 py-4 sm:flex-nowrap">
              <div className="flex-auto">
                <div className="font-semibold">Gym Rat In Gaza</div>
                <div className="text-muted-foreground">Content Creator</div>
              </div>
              <Image
                src="/book/e-01.png"
                alt="Gym Rat In Gaza"
                sizes="2.5rem"
                fill
                className="!static !h-10 !w-10 flex-none rounded-full ring-1 ring-foreground/5 grayscale"
              />
            </figcaption>
          </figure>
          {snippets.map((columnGroup, columnGroupIndex) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={columnGroupIndex}
              className="space-y-8 xl:contents xl:space-y-0">
              {columnGroup.map((column, columnIndex) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={columnIndex}
                  className={cn(
                    (columnGroupIndex === 0 && columnIndex === 0) ||
                      (columnGroupIndex === snippets.length - 1 &&
                        columnIndex === columnGroup.length - 1)
                      ? "xl:row-span-2"
                      : "xl:row-start-1",
                    "space-y-8",
                  )}>
                  {column.map((snippet) => (
                    <figure
                      key={snippet}
                      className="rounded-2xl bg-background p-6 shadow-lg ring-1 ring-foreground/5">
                      <blockquote className="italic text-muted-foreground">
                        <p>{snippet}</p>
                      </blockquote>
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};
