// REVIEWED - 01

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";

const team = [
  {
    letter: "S.",
    description:
      "Our founder, CEO, and web developer leads this vision and has architected the digital platforms essential for sharing narratives and building our sustainable ecosystem.",
  },
  {
    letter: "N.",
    description:
      "Our talented artist gives visual form to complex emotions and the enduring spirit of Gaza, illuminating experiences words alone can not capture.",
  },
  {
    letter: "L.",
    description:
      "Our committed content writer and translator weaves the foundational narratives and ensures genuine voices from Gaza resonate across languages. Thereby creating essential links for global comprehension and solidarity.",
  },
  {
    letter: "M.",
    description:
      "Our dedicated content writer and translator crafts the core narratives, ensures authentic voices from Gaza are heard clearly across linguistic divides, and builds those vital bridges of understanding.",
  },
  {
    letter: "G.",
    description:
      "Our strategic digital marketing expert connects these stories with the world, driving engagement, fostering solidarity, and supporting the long-term growth that empowers our community.",
  },
];

export const WhoAreWe = function WhoAreWe() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="01" className="mb-8">
        Who Are We
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-8">
        We are a team of five passionate and creative individuals united by one
        mission:
      </SectionHeading>
      <Paragraph>
        To illuminate the Gazans&apos; experience, amplify Gaza&apos;s voice
        during the current crisis, and build pathways toward sustainable futures
        rooted in the Gazans&apos; resilience and expertise. We strive to forge
        connections through authentic storytelling and digital innovation,
        fostering global solidarity while championing community empowerment.
      </Paragraph>
      <ul className="my-12 grid w-full grid-cols-1 gap-12 md:grid-cols-2 xl:my-24">
        {team.map(({ letter, description }) => (
          <li
            key={letter}
            className="flex flex-col items-start justify-start gap-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-background ring-1 ring-input md:h-28 md:w-28 lg:h-32 lg:w-32">
              <SectionHeading as="h4">{letter}</SectionHeading>
            </div>
            <div>
              <Paragraph small>{description}</Paragraph>
            </div>
          </li>
        ))}
      </ul>
      <Paragraph>
        Together, we are PalestinianCauses—committed equally to bearing witness
        now and contributing to the vital reconstruction and renewal of
        Gazans&apos; futures.
      </Paragraph>
    </Container>
  );
};
