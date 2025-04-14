// REVIEWED

import { motions } from "@/lib/motion";

import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import { MotionDiv, MotionSpan } from "../globals/motion";
import { Heading, Paragraph, SectionBadge } from "../globals/typography";

export const About = function About() {
  return (
    <section className="relative my-24 xl:my-32">
      <Container className="mb-24 max-w-7xl xl:mb-32">
        <SectionBadge number="01" className="mb-8">
          About The Book
        </SectionBadge>
        <Heading className="mb-8">
          A collection of raw and un-filtered voices that un-veil the human side
          of Gazans&apos; un-told stories.
        </Heading>
        <Paragraph>
          <span className="font-medium text-foreground">
            &ldquo;A Human But From Gaza&ldquo;
          </span>{" "}
          is not just a book—it is a collection of raw and un-filtered voices
          that un-veil the human side of Gaza&apos;s un-told stories. This
          project brings together the profoundly personal diaries of{" "}
          <span className="font-medium text-foreground">M.</span> and{" "}
          <span className="font-medium text-foreground">L.</span>, two resilient
          women who lived through the recent war in Gaza, alongside the powerful
          artwork of <span className="font-medium text-foreground">N.</span>,
          which captures the emotions, struggles, and hopes of a people under
          siege.
        </Paragraph>
      </Container>
      <Container className="mb-24 max-w-7xl xl:mb-32">
        <SectionBadge number="02" className="mb-8">
          What&apos;s Inside The Pages?
        </SectionBadge>
        <Heading className="mb-8">
          Through their words and art, this book provides a rare glimpse into
          the daily lives of Palestinians.
        </Heading>
        <Paragraph className="mb-8">
          Through their words and art, this book provides a rare glimpse into
          the daily lives of Palestinians enduring unimaginable hardships. It
          offers stories of survival, family, and the unwavering spirit of a
          community amidst destruction. From the poignant reflections of a
          mother comforting her children to the sketches that reveal the shadows
          of a war-torn city, every page resonates with humanity, strength, and
          resilience.
        </Paragraph>
        <Paragraph>
          It is more than a book; it is a bridge to understanding, a call for
          empathy, and an invitation to witness the strength of those who refuse
          to be silenced. Let the authors&apos; stories inspire, challenge, and
          connect you to a reality too often overlooked.
        </Paragraph>
      </Container>
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        whileInView={motions.fadeIn.whileInView}
        transition={motions.transition({})}
        className="w-full bg-foreground text-background">
        <InfiniteMarquee speed={80}>
          {[
            "Authentic",
            "Voices:",
            "Written",
            "by",
            "Palestinians",
            "currently",
            "living",
            "through",
            "the",
            "war.",
            "A",
            "Global",
            "Message:",
            "Aims",
            "to",
            "break",
            "stereo-types",
            "and",
            "build",
            "awareness.",
            "Unique",
            "Format:",
            "Combines",
            "intimate",
            "diaries",
            "with",
            "compelling",
            "artwork.",
          ].map((word, index) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <MarqueeItem key={word + index} delay={index * 0.1}>
              <MotionSpan
                initial={motions.fadeIn.initial}
                animate={motions.fadeIn.whileInView}
                transition={motions.transition({ delay: index * 0.1 })}
                className="mr-2 text-4xl font-medium !leading-normal tracking-tight lg:mr-4 lg:text-5xl xl:text-6xl">
                {word}
              </MotionSpan>
            </MarqueeItem>
          ))}
        </InfiniteMarquee>
      </MotionDiv>
    </section>
  );
};
