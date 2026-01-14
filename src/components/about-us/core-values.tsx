// REVIEWED - 05

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
      "Our top priority is sharing truthful, unfiltered voices and perspectives directly from Gaza. The authenticity of the lived experience is at the heart of everything we do—from the stories we tell to the client services we provide.",
  },
  {
    title: "Professional Excellence",
    description:
      "Our world-class digital services adhere to the highest international standards and quality. We exceed client expectations and outperform industry benchmarks, demonstrating the talent and quality of digital work Gaza offers.",
  },
  {
    title: "Resilience (Sumoud)",
    description:
      "We honor, embrace, and spread the tremendous and inherent spirit of resilience shown by the people of Gaza, thanks to a long-standing culture and identity. This strength is embedded in every project we take on.",
  },
  {
    title: "Solidarity",
    description:
      "We are by the side of the people of Gaza and do not waver. In our professional work, we act as advocates of justice for their rights and leverage our learning to help amplify their voices and stories.",
  },
  {
    title: "Empowerment",
    description:
      "We believe in enabling Gazan voices, creativity, and talent through long-term economic opportunities. Our agency model uniquely establishes self-reliance, economic development, and community growth.",
  },
  {
    title: "Integrity",
    description:
      "We uphold transparency and accountability. We have a high regard for the people whose perspectives we promote, the people we assist, and the clients who entrust us with their favorite projects.",
  },
  {
    title: "Innovation",
    description:
      "We use cutting-edge technology and creative expression in the arts, literature, and digital media to provide a fresh and innovative vision in creating stellar and effective outcomes for storytelling and linking people.",
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
          The Principles That Determine Our Excellence and Define Our Character
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
