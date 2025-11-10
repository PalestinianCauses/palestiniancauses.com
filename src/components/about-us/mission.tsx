// REVIEWED - 03

import { Container } from "@/components/globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "@/components/globals/typography";

export const Mission = function Mission() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="03" className="mb-8">
        Our Mission
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-8">
        Our Mission: Building Tomorrow&apos;s Solutions from Today&apos;s
        Challenges
      </SectionHeading>
      <Paragraph className="mb-8">
        Thus, at the heart of our agency model stand two interconnected
        missions: our professional services strive to produce world-class,
        excellence-driven digital services that embody the best of Gazan talent,
        innovation, and professional accomplishment—while at the same time
        serving as influential acts of meaning by illustrating how resistance
        transforms into excellence and creative achievement.
      </Paragraph>
      <Paragraph className="mb-8">
        Every project we undertake in collaboration and partnership with clients
        worldwide enables us to highlight our work ethic and showcase Gazan
        excellence.
      </Paragraph>
      <Paragraph className="mb-8">
        We began our mission by acting with urgency: to make the case that
        adversity creates optimal conditions of creation.
      </Paragraph>
      <Paragraph className="mb-8">
        Our digital services—from web design and development services to product
        development, content creation, and marketing—are brilliant examples of
        our professional achievements and meaningful acts, showing the world how
        experience creates the most competitive conditions for global advantage.
      </Paragraph>
      <Paragraph className="mb-8">
        We create valuable bridges with clients and end-users with storytelling
        and innovative digital activism and manifestation, proving that
        excellence results from experience.
      </Paragraph>
      <Paragraph className="mb-8">
        We act profoundly and lastingly, creating sustainable conditions for our
        action—ecosystem—that makes Gazans&apos; life stories a matter of
        urgency and also employing Gazans&apos; creativity, innovation, and
        professional pursuit—while achieving our agency model.
      </Paragraph>
      <Paragraph>
        We fully embody the economic benefit derived from our formula which
        multiples resilience with excellence.
      </Paragraph>
    </Container>
  );
};
