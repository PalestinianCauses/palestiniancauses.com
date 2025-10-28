// REVIEWED - 01

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";

export const Vision = function Vision() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="04" className="mb-8">
        Our Vision
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-8">
        Our Vision: A World Where Gazan Innovation Leads Global Progress
      </SectionHeading>
      <Paragraph className="mb-8">
        We envision PalestinianCauses as the premier digital agency that clients
        worldwide choose not just for exceptional results, but for the
        meaningful impact their partnership creates. Our vision extends beyond
        immediate support to establish PalestinianCauses as a self-sustaining
        entity rooted in Gazan talent, where every successful project
        demonstrates Gazan excellence and empowers community development through
        outstanding creative work.
      </Paragraph>
      <Paragraph>
        Our ultimate vision is a world where Gazan resilience, creativity, and
        expertise are globally recognized and celebrated, powering impactful
        digital services that contribute directly to economic empowerment. This
        sustainable model will drive community development, cultivate long-term
        opportunities leveraging Gazan skills, and enable Gazans to rebuild with
        dignity, achieve self-sufficiency, thrive in freedom, shape their
        prosperous futures, realize their right to self-determination, and
        contribute significantly to community renewal and lasting justice—all
        while delivering world-class digital solutions to clients across the
        globe and demonstrating how adversity transforms into innovation and
        excellence.
      </Paragraph>
    </Container>
  );
};
