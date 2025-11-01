// REVIEWED - 03

import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";
import { Button } from "../ui/button";

const team = [
  {
    letter: "S.",
    description:
      "Founder, CEO, and lead developer of the agency who architects our digital infrastructure and the structures of our services' and packages' offerings, as well as crafts bespoke web applications and strategic technical solutions. He also supports the development of almost all innovative platforms that can demonstrate Gaza's global excellence.",
    roomExists: true,
    roomSlug: "shawqi",
  },
  {
    letter: "N.",
    description:
      "Talented artist who gave our projects their soul through original, powerful illustrations and artwork. She instills new shape into the emotions and continued spirit of the people of Gaza, converting and simplifying complex concepts into intricate visual stories.",
  },
  {
    letter: "L.",
    description:
      "Expert content strategist and translator, bridges cultures and develops narrative foundations for global brands. She is responsible for crafting compelling copy and developing content strategies that make our authentic Gazan voices heard worldwide while driving measurable results—yet, in many tongues and locations.",
  },
  {
    letter: "M.",
    description:
      "Dedicated content writer and translator, responsible for developing comprehensive content strategies for our clients abroad. She is in charge of bridging the cultural gap through developing authentic storytelling while creating cultural translations that keep the message of projects intact and universally resonating.",
  },
  {
    letter: "G.",
    description:
      "Strategic digital marketing expert who drives the business growth worldwide through data-driven, prominent campaigns and brand positioning. He is behind new, innovative ways to tell Gazan stories to the world, starting diverse international projects and driving solidarity and community empowerment through development.",
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
      <Paragraph className="mb-8">
        We are a team of Gazan developers, writers, translators, and artists
        that is proud to have created an exceptional agency to reimagine how
        professional digital services can be provided—their works can compete in
        the global market with optimism while embodying what it means to
        transform adversity into excellence and creativity.
      </Paragraph>
      <Paragraph>
        When you choose our agency, you select transparent processes, fair
        pricing, and guaranteed results—
        <Button
          variant="link"
          className="p-0 font-normal"
          style={{ fontSize: "inherit" }}
          asChild>
          <Link href="mailto:hello@palestiniancauses.com">hiring us</Link>
        </Button>{" "}
        for your work means collaborating with world-class creators who develop
        meaningful solutions developed from experience and innovation to
        cultivate sustainable futures using Gaza&apos;s expertise and
        creativity.
      </Paragraph>
      <ul className="my-12 grid w-full grid-cols-1 gap-12 md:grid-cols-2 xl:my-24">
        {team.map(({ letter, description, roomExists, roomSlug }) => (
          <li
            key={letter}
            className="flex flex-col items-start justify-start gap-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center bg-foreground text-background ring-1 ring-foreground md:h-28 md:w-28 lg:h-32 lg:w-32">
              <SectionHeading as="h4" className="text-background">
                {letter}
              </SectionHeading>
            </div>
            <div>
              <Paragraph small>{description}</Paragraph>
            </div>
            {roomExists ? (
              <Button variant="default" asChild>
                <Link href={`/rooms/${roomSlug}`}>
                  <ArrowUpRightIcon />
                  Explore Professional Collaboration
                </Link>
              </Button>
            ) : null}
          </li>
        ))}
      </ul>
      <Paragraph>
        Together, we are PalestinianCauses—a professional digital services
        agency that crafts outstanding solutions while demonstrating how
        resilience transforms into innovation. Every project we undertake serves
        our clients&apos; success and our community&apos;s empowerment. We
        operate with the highest professional standards and clear, measurable
        outcomes that stand as declarations of Gazan excellence on the global
        stage.
      </Paragraph>
    </Container>
  );
};
