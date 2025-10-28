// REVIEWED - 02

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
      "Our founder, CEO, and lead developer who architected our agency's digital infrastructure and structured service offerings. He crafts bespoke web applications and strategic technical solutions while building innovative platforms that demonstrate Gazan excellence on the global stage.",
  },
  {
    letter: "N.",
    description:
      "Our talented artist who creates original, powerful artwork and illustrations that give our projects their soul. She transforms complex concepts into compelling visual storytelling through her original artwork, giving form to the emotions and enduring spirit of Gaza.",
  },
  {
    letter: "L.",
    description:
      "Our expert content strategist and translator who crafts compelling copy and develops content strategies for global brands. She builds foundational narratives that ensure authentic Gazan voices resonate across languages and cultures while driving measurable results.",
  },
  {
    letter: "M.",
    description:
      "Our dedicated content writer and translator who develops comprehensive content strategies for international clients. She forges vital bridges of understanding through authentic storytelling and cultural translation, ensuring messages resonate globally.",
  },
  {
    letter: "G.",
    description:
      "Our strategic digital marketing expert who drives growth for businesses globally through data-driven campaigns and brand positioning. He builds connections between Gazan stories and the world while fostering solidarity and supporting community empowerment through sustainable growth.",
  },
];

export const WhoAreWe = function WhoAreWe() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="01" className="mb-8">
        Who Are We
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-8">
        Meet the Creators: A Collective of World-Class Talent from Gaza
      </SectionHeading>
      <Paragraph>
        We are a passionate team of Gazan developers, writers, translators, and
        artists who have built something extraordinary: a professional digital
        services agency that crafts outstanding, globally competitive solutions
        while demonstrating how adversity transforms into innovation and
        excellence. Our agency operates with clear processes, transparent
        pricing, and guaranteed outcomes—ensuring that when you hire
        PalestinianCauses, you&apos;re not just getting world-class work,
        you&apos;re partnering with creators who forge valuable solutions from
        the depths of experience, building pathways toward sustainable futures
        rooted in Gazan expertise and creative excellence.
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
        Together, we are PalestinianCauses—a professional digital services
        agency that crafts outstanding solutions while demonstrating how
        resilience transforms into innovation. Every project we undertake serves
        both our clients&apos; success and our community&apos;s empowerment,
        operating with the highest professional standards and clear, measurable
        outcomes that stand as declarations of Gazan excellence on the global
        stage.
      </Paragraph>
    </Container>
  );
};
