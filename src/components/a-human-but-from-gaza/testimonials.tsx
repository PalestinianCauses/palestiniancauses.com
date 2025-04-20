// REVIEWED - 01

import Image from "next/image";
import Link from "next/link";

import { motions } from "@/lib/motion";

import { Container } from "../globals/container";
import {
  MotionBlockquote,
  MotionDiv,
  MotionFigcaption,
} from "../globals/motion";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";
import { Button } from "../ui/button";

const testimonials = [
  {
    name: "@Gym_Rat_in_Gaza",
    link: "https://instagram.com/gym_rat_in_gaza",
    image: "/a-human-but-from-gaza/e-01.png",
    paragraphs: [
      "As a Gazan who has been through all the difficulties and atrocities, anyone could imagine (and not imagine). I never thought anyone could express our feelings and thoughts through everything we have lived so far, but I am glad this book disappointed me.",
      "Reading this book and going through its chapters felt like a journey, even to me, someone who lived these feelings and emotions. And I can only imagine how deeply it will affect everyone who reads it.",
      "I would not hesitate to recommend it to anyone who wants to understand people's lives in Gaza better and what it is like to live through such times.",
    ],
  },
  {
    name: "@NadaSenjer2000",
    link: "https://instagram.com/nadasenjer2000",
    image: "/a-human-but-from-gaza/e-02.jpg",
    paragraphs: [
      'I deeply understand that language can not accurately describe our emotions, which is precisely why we often say, "Only the Gazan can truly understand another Gazan" one who has experienced the same conditions of war and tasted its bitterness with all their senses. As a Gazan, this book was a magnificent attempt to describe the most challenging and delicate human emotions the Gazans still faces. The authors expressed themselves with great courage amidst all these circumstances.',
      "As I write these words, I feel genuinely proud. I am honored to have had the opportunity to read the diaries of three Gazan women twice through the magic of words. Once through the magic of art and painting, and having witnessed this war and lived through it firsthand, I know very well how difficult it is to produce anything or think about anything else other than what you will eat during the day!",
      '"Human, but from Gaza" is a book that will make you experience the tragic experience in Gaza, understand it a little, and feel it with your heart. It tells what the fast-paced digital media has failed to speak because only the details can make you understand what it means to be from Gaza amidst a war and its harsh conditions."',
    ],
  },
];

export const Testimonials = function Testimonials() {
  return (
    <section className="relative my-24 xl:my-32">
      <Container className="max-w-7xl">
        <SectionHeadingBadge as="h2" number="03" className="mb-8">
          What Did Gazans Feel?
        </SectionHeadingBadge>
        <SectionHeading as="h3" className="mb-24 xl:mb-32">
          Glimpses into Gazans&apos; hearts. Here is what they had to say about
          our book.
        </SectionHeading>
        <div className="flex w-full flex-col gap-24">
          {testimonials.map(({ name, link, image, paragraphs }) => (
            <figure
              key={name}
              className="relative flex flex-col gap-6 lg:flex-row lg:gap-10">
              <figcaption className="flex shrink-0 flex-col items-start gap-2.5">
                <MotionDiv
                  viewport={{ once: true }}
                  initial={motions.fadeIn.initial}
                  whileInView={motions.fadeIn.whileInView}
                  transition={motions.transition({})}
                  className="relative">
                  <Image
                    src={image}
                    alt={[name, "Profile Picture"].join(" ")}
                    priority
                    fill
                    sizes="14rem"
                    className="!relative !h-56 !w-56 flex-none ring-1 ring-input grayscale"
                  />
                </MotionDiv>
                <MotionFigcaption
                  viewport={{ once: true }}
                  initial={motions.fadeIn.initial}
                  whileInView={motions.fadeIn.whileInView}
                  transition={motions.transition({ delay: 0.1 })}>
                  <Button variant="default" asChild>
                    <Link href={link} target="_blank">
                      {name}
                    </Link>
                  </Button>
                </MotionFigcaption>
              </figcaption>
              <MotionBlockquote
                viewport={{ once: true }}
                initial={motions.fadeIn.initial}
                whileInView={motions.fadeIn.whileInView}
                transition={motions.transition({})}
                className="relative border-t border-input pt-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0 [&_>_p:not(:last-child)]:mb-6 xl:[&_>_p:not(:last-child)]:mb-8">
                <div className="absolute -top-px left-0 h-px w-10 bg-foreground lg:-left-px lg:top-0 lg:h-10 lg:w-px" />
                {paragraphs.map((paragraph) => (
                  <Paragraph key={paragraph}>{paragraph}</Paragraph>
                ))}
              </MotionBlockquote>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
};
