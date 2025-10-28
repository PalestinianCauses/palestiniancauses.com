// REVIEWED
import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
} from "../globals/typography";

export const OurModel = function OurModel() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="02" className="mb-8">
        Our Model
      </SectionHeadingBadge>
      <SectionHeading as="h3" className="mb-8">
        How We Work: Turning Adversity Into Competitive Advantage
      </SectionHeading>
      <Paragraph className="mb-8">
        PalestinianCauses operates on a revolutionary model that demonstrates
        how adversity becomes the foundation for world-class creation. We
        structure every client engagement with clear roadmaps, transparent
        pricing, and guaranteed outcomes—ensuring that professional excellence
        emerges from the depths of experience. Every project we deliver follows
        a systematic approach: from initial consultation and strategic planning
        to final delivery and ongoing support, each step crafted with precision
        and purpose.
      </Paragraph>
      <Paragraph className="mb-8">
        Our structured packages are designed to meet diverse client needs while
        maintaining the highest professional standards. Whether you need a
        strategic consultation, a bespoke web application, or comprehensive
        digital marketing services, we provide clear deliverables, transparent
        timelines, and measurable outcomes. This client-focused approach ensures
        that every dollar invested in our services delivers exceptional value
        while directly funding our initiatives that showcase Gazan excellence
        and creative innovation.
      </Paragraph>
      <Paragraph>
        This sustainable model allows us to deliver outstanding results for our
        clients while maintaining our independence and staying true to our
        mission. We&apos;re building a future where Gazan expertise is globally
        recognized, where resilience transforms into innovation, and where
        economic empowerment drives lasting positive change—all through a
        professional agency structure that clients can trust and depend on.
      </Paragraph>
    </Container>
  );
};
