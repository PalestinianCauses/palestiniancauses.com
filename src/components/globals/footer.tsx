// REVIEWED - 04

import Image from "next/image";
import Link from "next/link";

import { motions } from "@/lib/motion";

import { Button } from "../ui/button";

import { Container } from "./container";
import { MotionDiv } from "./motion";
import { Paragraph, SubSectionHeading } from "./typography";

const lists = [
  {
    title: "Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about-us", label: "About us" },
      { href: "/support", label: "Support us" },
      { href: "/a-human-but-from-gaza", label: "A Human But From Gaza" },
      { href: "/humans-but-from-gaza", label: "Humans But From Gaza" },
    ],
  },
  {
    title: "Policies",
    links: [
      { href: "/acceptable-use-policy", label: "Acceptable Use Policy" },
      { href: "/cookie-policy", label: "Cookie Policy" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/returns-policy", label: "Returns Policy" },
      { href: "/terms-of-service", label: "Terms of Service" },
    ],
  },
  {
    title: "Socials",
    links: [
      { href: "mailto:hello@palestiniancauses.com", label: "Email" },
      {
        href: "https://instagram.com/palestiniancauses",
        label: "Instagram",
      },
    ],
  },
];

export const Footer = function Footer() {
  return (
    <footer className="relative">
      <Container className="max-w-7xl pb-12 pt-0 sm:pt-12">
        <div className="mb-12 grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-8">
          <MotionDiv
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({})}
            className="relative flex flex-col items-start justify-start">
            <div className="relative mb-4 flex items-center gap-5">
              <Image
                src="/pc-logo-primary-foreground.png"
                alt="PalestinianCauses LLC"
                priority
                fill
                sizes="2.5rem"
                className="!static !h-12 !w-12"
              />
              <SubSectionHeading as="h2" className="!text-base">
                PalestinianCauses LLC.
              </SubSectionHeading>
            </div>
            <Paragraph small className="mb-8">
              A mission-driven creative and digital platform dedicated to
              illuminating the Gazan experience, with an urgent focus on
              amplifying authentic voices and realities from Gaza during the
              current crisis.
            </Paragraph>
            <Paragraph
              small
              className="!text-sm !leading-normal text-foreground">
              &copy; 2025 PalestinianCauses LLC. All Rights Reserved.
            </Paragraph>
          </MotionDiv>
          <div className="flex flex-wrap items-start justify-start gap-20">
            {lists.map((list) => (
              <MotionDiv
                key={list.title}
                viewport={{ once: true }}
                initial={motions.fadeIn.initial}
                whileInView={motions.fadeIn.whileInView}
                transition={motions.transition({})}
                className="flex flex-col items-start justify-start gap-6">
                <Paragraph className="!text-sm font-medium uppercase tracking-[0.2em] text-foreground">
                  {list.title}
                </Paragraph>
                <ul className="flex flex-col items-start justify-start gap-4">
                  {list.links.map(({ href, label }, index) => (
                    <li key={href}>
                      <MotionDiv
                        viewport={{ once: true }}
                        initial={motions.fadeIn.initial}
                        whileInView={motions.fadeIn.whileInView}
                        transition={motions.transition({ delay: index * 0.1 })}
                        className="flex items-center justify-center">
                        <Button variant="link" className="p-0" asChild>
                          <Link href={href}>{label}</Link>
                        </Button>
                      </MotionDiv>
                    </li>
                  ))}
                </ul>
              </MotionDiv>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
