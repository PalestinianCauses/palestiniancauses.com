// REVIEWED - 02

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
        transmutes into excellence and creative achievement.
      </Paragraph>
      <Paragraph className="mb-8">
        Every project we undertake in collaboration and partnership with clients
        worldwide enables us to undersell the agency business and showcase Gazan
        excellence through our manifestations, Gazan resilience declarations,
        and Gazan achievements.
      </Paragraph>
      <Paragraph className="mb-8">
        We begin our mission by acting urgently: to make the case that adversity
        creates optimal conditions of creation.
      </Paragraph>
      <Paragraph className="mb-8">
        Our digital services—from web design and development services to product
        development, content creation, and marketing—are brilliant examples of
        our professional achievements and meaningful acts of meaning, showing
        the world how experience creates the most competitive conditions for
        global advantage.
      </Paragraph>
      <Paragraph className="mb-8">
        We create meaningful understanding bridges with clients and end-users
        with storytelling and innovative digital activism and manifestation,
        proving that excellence results from experience.
      </Paragraph>
      <Paragraph className="mb-8">
        We act profoundly and lastingly, creating provision and sustainable
        conditions for our action—ecosystem—that makes Gazans&apos; life stories
        a matter of urgency and also employing Gazans&apos; creativity,
        innovation, and professional pursuit—while underselling the agency
        model.
      </Paragraph>
      <Paragraph>
        It&apos;s the economic benefit and meaning multiply—resilience to
        excellence—formula that we fully can embody.
      </Paragraph>
    </Container>
  );
};
