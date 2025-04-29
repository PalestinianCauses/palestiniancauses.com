"use client";

// REVIEWED - 04

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { motions } from "@/lib/motion";

import { Container } from "../globals/container";
import { MotionLi } from "../globals/motion";
import {
  Paragraph,
  SectionHeading,
  SectionHeadingBadge,
  SubSectionHeading,
} from "../globals/typography";
import { Button } from "../ui/button";

const ctas = [
  {
    title: 'Get "A Human But From Gaza"',
    href: "/a-human-but-from-gaza",
  },
  {
    title: "Support Our Mission",
    href: "https://palestiniancauses.com/support",
  },
  {
    title: "Amplify Our Voice: Follow and Share",
    href: "https://www.instagram.com/palestiniancauses",
  },
  {
    title: "Contact Us",
    href: "mailto:palestiniancauses.com",
  },
];

export const CTA = function CTA() {
  return (
    <Container as="section" className="my-12 max-w-7xl xl:my-24">
      <SectionHeadingBadge as="h2" number="05" className="mb-8">
        Join Our Mission
      </SectionHeadingBadge>
      <SectionHeading
        as="h3"
        className="mb-8 max-w-none lg:!max-w-2xl xl:!max-w-3xl">
        Amplify Truth, Foster Resilience: Join Our Mission.
      </SectionHeading>
      <Paragraph className="mb-12 xl:mb-24">
        You&apos;ve learned about our commitment to illuminating the Gazan
        experience and standing in unwavering solidarity with Gaza. Now, help us
        transform awareness into meaningful action. Your support enables us to
        share authentic narratives like those in &ldquo;A Human But From
        Gaza,&ldquo; challenge harmful stereotypes, and invest in the long-term
        vision of empowering Gazan creativity and expertise for a
        self-sufficient future.
      </Paragraph>
      <ul className="grid h-full grid-rows-4">
        {ctas.map(({ title, href }) => (
          <MotionLi
            key={title}
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({})}>
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
          </MotionLi>
        ))}
      </ul>
    </Container>
  );
};
