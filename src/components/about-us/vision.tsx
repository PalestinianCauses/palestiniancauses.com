// REVIEWED

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";

export const Vision = function Vision() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="03" className="mb-8">
        Our Vision
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-8">
        Our Vision for Tomorrow: Illuminating truth today, empowering Gazan
        talent for a thriving future.
      </SectionHeading>
      <Paragraph className="mb-8">
        We envision a world where authentic Gazan narratives are central to
        global understanding, fostering deep and impactful solidarity,
        especially during crises faced by communities in Gaza. PalestinianCauses
        strives to be a vital bridge, connecting the world directly to the Gazan
        experience, ensuring these stories are there for the world to hear,
        value, and act upon.
      </Paragraph>
      <Paragraph>
        Our ultimate vision extends beyond immediate support to establish
        PalestinianCauses as a self-sustaining entity rooted in Gazan talent. We
        aspire to a future where Gazan&apos;s resilience, creativity, and
        expertise are globally recognized and celebrated, powering impactful
        services offered through our platform that contribute directly to
        economic empowerment. This sustainable model will drive community
        development, cultivate long-term opportunities leveraging Gazan skills,
        and enable Gazans to rebuild with dignity, achieve self-sufficiency,
        thrive in freedom, shape their prosperous futures, realize their right
        to self-determination, and contribute significantly to community renewal
        and lasting justice.
      </Paragraph>
    </Container>
  );
};
