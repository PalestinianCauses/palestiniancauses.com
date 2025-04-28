// REVIEWED - 01

import { motions } from "@/lib/motion";

import { Container } from "../globals/container";
import { MotionLi } from "../globals/motion";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";

const values = [
  {
    title: "Authenticity",
    description:
      "We are committed to sharing genuine, un-filtered narratives and perspectives directly from Gaza, ensuring the truth of the lived experience is central to all our work.",
  },
  {
    title: "Solidarity",
    description:
      "We stand unwaveringly with the people of Gaza, advocating for their rights, amplifying their voices, and acting as allies in their struggle for justice and self-determination.",
  },
  {
    title: "Resilience (Sumoud)",
    description:
      "We honor, celebrate, and amplify the profound steadfastness, enduring spirit, and cultural richness of the Gazan people in the face of adversity.",
  },
  {
    title: "Empathy and Understanding",
    description:
      "We strive to build bridges across cultures and communities by fostering deep empathy through powerful storytelling while aiming to break down barriers and challenge harmful stereotypes.",
  },
  {
    title: "Empowerment",
    description:
      "We believe in empowering Gazan's voices, creativity, and expertise. Our long-term vision focuses on creating opportunities that contribute to self-sufficiency, economic growth, and the rebuilding of futures.",
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency, accountability, and profound respect for the individuals whose stories we share and the communities we serve.",
  },
  {
    title: "Creativity and Innovation",
    description:
      "We leverage the power of creative expression—through art, writing, and digital media—and embrace innovative approaches to effectively share stories, connect people, and achieve our mission.",
  },
];

export const CoreValues = function CoreValues() {
  return (
    <Container
      as="section"
      className="my-12 bg-foreground px-0 py-12 xl:my-24 xl:py-24">
      <Container className="max-w-7xl">
        <SectionHeadingBadge
          as="h2"
          number="04"
          className="mb-8 text-background">
          Our Core Values
        </SectionHeadingBadge>
        <SectionHeading as="h3" className="mb-12 text-background xl:mb-24">
          Rooted in authentic storytelling, inspired by unwavering Gazans&apos;
          resilience.
        </SectionHeading>
        <ul className="grid w-full grid-cols-1 items-start gap-8 text-background md:grid-cols-2">
          {values.map(({ title, description }) => (
            <MotionLi
              key={title}
              viewport={{ once: true }}
              initial={motions.fadeIn.initial}
              whileInView={motions.fadeIn.whileInView}
              transition={motions.transition({})}
              className="relative flex items-baseline border-l border-background/10 pl-5">
              <div className="absolute -left-px top-0 h-8 w-px bg-background" />
              <Paragraph small className="text-muted/75">
                <span className="font-medium text-background">{title}:</span>{" "}
                {description}
              </Paragraph>
            </MotionLi>
          ))}
        </ul>
      </Container>
    </Container>
  );
};
