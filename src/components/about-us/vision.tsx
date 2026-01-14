// REVIEWED - 03

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
        We aspire for PalestinianCauses to be the agency that clients everywhere
        choose, not just for excellent outcomes. Still, for the meaningful
        change, their partnership helps effect.
      </Paragraph>
      <Paragraph className="mb-8">
        Going beyond just backing us in the present, this vision is one of
        PalestinianCauses being self-sustaining, founded on Gazan talent, where
        every successful project is a telling, distinguished example of Gazan
        talent and success; every exceptional creative work is another project
        driving community development.
      </Paragraph>
      <Paragraph className="mb-8">
        We see PalestinianCauses becoming a major, worldwide brand: Gazan
        resilience, resourcefulness, and skill, aiding in reshaping how the
        implications of digital service work are material to economic
        empowerment. The effect of a direct, self-sustaining community
        development on our clients can not be overstated.
      </Paragraph>
      <Paragraph>
        It will all foster the development of long-term aspects and pathways for
        Gazan opportunity, allowing Gazans to get back to reconstruction with
        dignity, to perpetuate themselves, to thrive in freedom and safety, to
        orient their globally diversified futures, to flourish in their moral
        and human right to self-determination, and, above all, Gazan community
        revival and enduring justice, while continually creating and delivering
        outstanding world service to the globe, exhibiting Gazan reality that
        hardship can solve, evolve, and produce.
      </Paragraph>
    </Container>
  );
};
