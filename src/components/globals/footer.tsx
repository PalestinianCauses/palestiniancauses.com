// REVIEWED - 09

import Image from "next/image";
import Link from "next/link";

import { HumansButFromGazaPageLink } from "@/lib/utils/strings";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

import { Container } from "./container";
import { Paragraph, SubSectionHeading } from "./typography";

const lists = [
  {
    title: "Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about-us", label: "About us" },
      { href: "/support", label: "Support us" },
      { href: "/a-human-but-from-gaza", label: "A Human But From Gaza" },
      { href: HumansButFromGazaPageLink, label: "Humans But From Gaza" },
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
    <footer className="relative pb-12 lg:pb-24">
      <Separator className="my-12 lg:my-24" />
      <Container className="max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-8">
          <div className="relative flex flex-col items-start justify-start">
            <div className="relative mb-4 flex items-center gap-5">
              <Image
                src="/logo-primary.png"
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
              A world-class digital services agency powered by Gazan talent,
              PalestinianCauses specializes in Branded Web Applications,
              Strategic Content Creation, Expert Translation Services, and
              Comprehensive Digital Marketing Solutions. PalestinianCauses is
              where resilience turns into innovation and excellence, developing
              and delivering outstanding, globally competitive digital
              solutions.
            </Paragraph>
            <Paragraph
              small
              className="!text-sm !leading-normal text-foreground">
              &copy; 2025 PalestinianCauses LLC. All Rights Reserved.
            </Paragraph>
          </div>
          <div className="flex flex-wrap items-start justify-start gap-20">
            {lists.map((list) => (
              <div
                key={list.title}
                className="flex flex-col items-start justify-start gap-6">
                <Paragraph className="!text-sm font-medium uppercase tracking-[0.2em] text-foreground">
                  {list.title}
                </Paragraph>
                <ul className="flex flex-col items-start justify-start gap-4">
                  {list.links.map(({ href, label }) => (
                    <li key={href} className="flex items-center justify-center">
                      <Button variant="link" className="p-0" asChild>
                        <Link href={href}>{label}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
};
