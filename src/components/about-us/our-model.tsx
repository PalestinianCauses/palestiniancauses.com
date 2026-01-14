// REVIEWED - 02
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
        PalestinianCauses embodies a revolutionary manifesto, illustrating how
        adversity is the foundation of world-class creation. Our engagements are
        meticulously structured—from our clear road maps, transparent pricing,
        and guaranteed outcomes—to ensure clients objectives are successfully
        accomplished.
      </Paragraph>
      <Paragraph className="mb-8">
        All the projects we design and deliver follow a carefully laid-out path.
        The steps involved in each project, from initial consultation and
        strategic development to actual product delivery and post-project
        support, are meticulously specified to ensure they are adequately
        defined and required.
      </Paragraph>
      <Paragraph className="mb-8">
        Our structured packages ensure clients achieve their outsourced dreams
        while meeting the highest professional excellence. Our services—a single
        strategic consultation, a custom web application, an end-to-end digital
        marketing service, or content strategies and pieces for multiple
        cultures and entities—are defined in terms, periods, and proven
        outcomes.
      </Paragraph>
      <Paragraph className="mb-8">
        This client-centric approach maximizes each cent spent on our services
        while directly funding our initiatives, demonstrating Gazan excellence
        and creative innovation.
      </Paragraph>
      <Paragraph className="mb-8">
        This sustainable model will advance community resurgence, foster
        long-term opportunities rooted in Gazan skills, and let Gazans rebuild
        with self-respect. Gazan self-sufficiency will be reclaimed, power will
        be retained, dreams of freedom will flourish, and the present and future
        of the Gazan state will be explicitly defined.
      </Paragraph>
    </Container>
  );
};
