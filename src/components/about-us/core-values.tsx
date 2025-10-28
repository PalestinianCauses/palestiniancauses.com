// REVIEWED - 03

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";

const values = [
  {
    title: "Authenticity",
    description:
      "We are committed to sharing genuine, un-filtered narratives and perspectives directly from Gaza, ensuring the truth of the lived experience is central to all our work—both in storytelling and client services.",
  },
  {
    title: "Professional Excellence",
    description:
      "We deliver world-class digital services that meet the highest international standards, showcasing Gazan talent and expertise while exceeding client expectations and industry benchmarks.",
  },
  {
    title: "Resilience (Sumoud)",
    description:
      "We honor, celebrate, and amplify the profound steadfastness, enduring spirit, and cultural richness of the Gazan people in the face of adversity, infusing this resilience into every project we undertake.",
  },
  {
    title: "Solidarity",
    description:
      "We stand unwaveringly with the people of Gaza, advocating for their rights, amplifying their voices, and acting as allies in their struggle for justice and self-determination through our professional work.",
  },
  {
    title: "Empowerment",
    description:
      "We believe in empowering Gazan voices, creativity, and expertise through sustainable economic opportunities. Our agency model creates pathways to self-sufficiency, economic growth, and community rebuilding.",
  },
  {
    title: "Integrity",
    description:
      "We operate with transparency, accountability, and profound respect for the individuals whose stories we share, the communities we serve, and the clients who trust us with their projects.",
  },
  {
    title: "Innovation",
    description:
      "We leverage cutting-edge technology and creative expression—through art, writing, and digital media—embracing innovative approaches to deliver exceptional results while effectively sharing stories and connecting people.",
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
          number="05"
          className="mb-8 text-background">
          Our Core Values
        </SectionHeadingBadge>
        <SectionHeading as="h3" className="mb-12 text-background xl:mb-24">
          The Principles That Drive Our Excellence and Define Our Character
        </SectionHeading>
        <ul className="grid w-full grid-cols-1 items-start gap-8 text-background md:grid-cols-2">
          {values.map(({ title, description }) => (
            <li
              key={title}
              className="relative flex items-baseline border-l border-background/10 pl-5">
              <div className="absolute -left-px top-0 h-8 w-px bg-background" />
              <Paragraph small className="text-muted/75">
                <span className="font-medium text-background">{title}:</span>{" "}
                {description}
              </Paragraph>
            </li>
          ))}
        </ul>
      </Container>
    </Container>
  );
};
