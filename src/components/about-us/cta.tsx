// REVIEWED - 06

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Container } from "../globals/container";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";
import { Button } from "../ui/button";

const ctas = [
  {
    title: "Hire PalestinianCauses",
    href: "mailto:palestiniancauses.com",
  },
  {
    title: 'Get "A Human But From Gaza"',
    href: "/a-human-but-from-gaza",
  },
  {
    title: "Support Our Mission",
    href: "https://palestiniancauses.com/support",
  },
  {
    title: "Amplify Our Work: Follow and Share",
    href: "https://www.instagram.com/palestiniancauses",
  },
];

export const CTA = function CTA() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="06" className="mb-8">
        Partner With Us
      </SectionHeadingBadge>
      <SectionHeading
        as="h3"
        className="mb-8 max-w-none lg:!max-w-2xl xl:!max-w-3xl">
        Ready to Partner? Let&apos;s Build Something Extraordinary Together
      </SectionHeading>
      <Paragraph className="mb-12 xl:mb-24">
        You&apos;ve learned about our commitment to delivering world-class
        digital services while demonstrating how Gazan experience transforms
        into innovation and excellence. Now, help us transform awareness into
        meaningful action. When you hire PalestinianCauses, you&apos;re not just
        getting exceptional results—you&apos;re directly empowering Gazan
        talent, funding initiatives that showcase Gazan excellence, and
        contributing to sustainable community development. Your partnership
        enables us to forge vital narratives, demonstrate how resilience
        transforms into innovation, and invest in the long-term vision of
        empowering Gazan creativity and expertise for a self-sufficient future
        built on excellence.
      </Paragraph>
      <ul className="grid h-full grid-rows-4">
        {ctas.map(({ title, href }) => (
          <li key={title}>
            <Button
              variant="outline"
              className="h-full w-full justify-start gap-5 whitespace-break-spaces p-5 text-left font-normal md:p-10"
              asChild>
              <Link href={href}>
                <ArrowUpRight className="!h-7 !w-7 stroke-[1.5] md:!h-10 md:!w-10" />
                <SubSectionHeading
                  as="p"
                  className="font-normal !leading-relaxed">
                  {title}
                </SubSectionHeading>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </Container>
  );
};
