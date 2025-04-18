// REVIEWED

import { Container } from "@/components/globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "@/components/globals/typography";

export const Mission = function Mission() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="02" className="mb-8">
        Our Mission
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-8">
        Is to illuminate the rich, complex tapestry of the Gazans&apos;
        experience for a global audience.
      </SectionHeading>
      <Paragraph className="mb-8">
        We begin with an urgent focus: amplifying the immediate realities, the
        harrowing voices, and the profound resilience emerging from Gaza during
        the current crisis, ensuring these critical perspectives are not lost or
        ignored. We strive to build meaningful bridges of understanding,
        empathy, and actionable solidarity across borders through compelling,
        authentic storytelling and innovative digital platforms.
      </Paragraph>
      <Paragraph>
        Our enduring commitment involves cultivating a dynamic and sustainable
        platform—an ecosystem designed to continue sharing these vital
        Gazans&apos; narratives while actively championing and showcasing
        Gazans&apos; creativity, ingenuity, and professional expertise. By
        fostering economic opportunities and celebrating cultural contributions,
        we aim to contribute significantly to long-term community empowerment
        and the vital reconstruction and renewal of Gazans&apos; futures within
        Gaza and beyond.
      </Paragraph>
    </Container>
  );
};
