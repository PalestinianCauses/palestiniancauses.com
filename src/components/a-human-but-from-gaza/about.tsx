// REVIEWED - 05

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
          is an essential testament to the Gazan experience. Rich with raw,
          unadulterated voices that finally illuminate the human face often
          hidden in the narrative about Gaza, this book is a testament to the
          power of authentic storytelling.
        </Paragraph>
        <Paragraph>
          Our project is given voice through the powerfully personal diaries of
          our two friends M. and L., who survived tragedy after tragedy
          alongside artist N.&apos;s evocative artwork. Together, they speak in
          the universal language of emotion and hope, rage and love, fear and
          pride—building the connective tissue of understanding at the center of
          our advocacy work.
        </Paragraph>
      </Container>
      <Container as="section" className="mb-24 max-w-7xl xl:mb-32">
        <SectionHeadingBadge as="h2" number="02" className="mb-8">
          What&apos;s Inside The Pages?
        </SectionHeadingBadge>
        <SectionHeading as="h3" className="mb-8">
          In this book, the words of M. and L. and the art of N. share a
          close-up view of the following:
        </SectionHeading>
        <Paragraph className="mb-8">
          —The Gazans fight to live an everyday life despite the harsh
          conditions. The reader will read gripping stories of struggle, a
          strong bond between family members, and a struggling community.
          Touching diary scenes of quiet survival to bellwether art pieces about
          the stark combat zone land, each page conveys immeasurable humanity
          and antifragility.
        </Paragraph>
        <Paragraph>
          This set of pages is more than a companion; it is an essential bridge
          to understanding and creating the favorable impression that guides our
          work. We ask you to read these genuine tales, question your
          assumptions, and immerse yourself in the new, urgent global inquiry.
        </Paragraph>
      </Container>
      <div className="relative left-1/2 -translate-x-1/2 overflow-hidden bg-foreground text-background transition-[width] duration-100 ease-in-out">
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
            <MarqueeItem key={word + index}>
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
