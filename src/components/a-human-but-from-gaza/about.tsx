// REVIEWED - 03

import { Container } from "../globals/container";
import { InfiniteMarquee, MarqueeItem } from "../globals/marquee";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";

export const About = function About() {
  return (
    <div className="relative my-24 xl:my-32">
      <Container as="section" className="mb-24 max-w-7xl xl:mb-32">
        <SectionHeadingBadge as="h2" number="01" className="mb-8">
          About The Book
        </SectionHeadingBadge>
        <SectionHeading as="h3" className="mb-8">
          Embodying our commitment to authentic storytelling and solidarity.
        </SectionHeading>
        <Paragraph>
          <span className="font-medium text-foreground">
            &ldquo;A Human But From Gaza&ldquo;
          </span>{" "}
          is a vital testament to the Gazan experience. It offers a raw,
          un-filtered collection of voices illuminating the human realities
          often obscured in narratives about Gaza. This project amplifies the
          profoundly personal diaries of M. and L., two women demonstrating
          immense resilience while living through the recent war, presented
          alongside the powerful and evocative artwork of N. Together, their
          words and images capture the complex emotions, daily struggles, and
          steadfast hopes of a people under siege, creating a crucial bridge for
          fostering the global empathy and understanding central to our mission.
        </Paragraph>
      </Container>
      <Container as="section" className="mb-24 max-w-7xl xl:mb-32">
        <SectionHeadingBadge as="h2" number="02" className="mb-8">
          What&apos;s Inside The Pages?
        </SectionHeadingBadge>
        <SectionHeading as="h3" className="mb-8">
          Within this book, the words of M. and L. and the art of N. offer an
          intimate window into:
        </SectionHeading>
        <Paragraph className="mb-8">
          The daily realities of Gazans navigating extreme adversity. Readers
          will find powerful accounts of survival, the enduring strength of
          family bonds, and the collective spirit of a community facing
          widespread destruction. From poignant diary entries detailing moments
          of quiet endurance to artwork capturing the stark landscapes of
          conflict, each page conveys profound humanity and resilience.
        </Paragraph>
        <Paragraph>
          This collection is more than testimony; it is an essential bridge for
          building understanding and fostering the empathy central to our work.
          We invite readers to witness these authentic voices, challenge
          preconceived notions, and connect deeply with a reality demanding
          global attention.
        </Paragraph>
      </Container>
      <div className="w-full bg-foreground text-background">
        <InfiniteMarquee speed={80}>
          {[
            "Authentic",
            "Voices:",
            "Written",
            "by",
            "Gazans",
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
              <span className="mr-2 whitespace-nowrap text-4xl font-medium !leading-normal tracking-tight lg:mr-4 lg:text-5xl xl:text-6xl">
                {word}
              </span>
            </MarqueeItem>
          ))}
        </InfiniteMarquee>
      </div>
    </div>
  );
};
