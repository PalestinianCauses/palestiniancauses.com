// REVIEWED - 07

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
    title: "Hire PalestinianCauses for a one-time service.",
    href: "mailto:palestiniancauses.com",
  },
  {
    title: 'Get the "A Human But From Gaza" book today.',
    href: "/a-human-but-from-gaza",
  },
  {
    title: "Support Our Mission",
    href: "https://palestiniancauses.com/support",
  },
  {
    title: "Amplify our Work—Follow our Social Networks.",
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
        Now that you have read about our mission and efforts to deliver the best
        digital services to the world, see how Gazan experience turns into
        innovation and excellence. Now it is your turn to turn awareness into
        action. By hiring PalestinianCauses, you enjoy exceptional
        output—empowering Gazan talent, funding projects that demonstrate Gazan
        excellence, and championing sustainable development. By partnering on
        our work, you are helping us tell crucial stories, show how resilience
        makes excellence, and invest in the long term to empower Gazan
        creativity and expertise for a self-reliant future built on excellence.
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
