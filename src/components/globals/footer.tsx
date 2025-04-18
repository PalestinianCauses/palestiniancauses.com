// REVIEWED

import Image from "next/image";
import Link from "next/link";

import { motions } from "@/lib/motion";

import { Button } from "../ui/button";

import { Container } from "./container";
import { MotionDiv } from "./motion";

export const Footer = function Footer() {
  return (
    <footer className="relative">
      <Container className="max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-8 pb-12 pt-0 sm:pt-12">
          <MotionDiv
            viewport={{ once: true }}
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.transition({})}
            className="relative flex items-center gap-5">
            <Image
              src="/pc-logo-primary-foreground.png"
              alt="PalestinianCauses LLC"
              priority
              fill
              sizes="2.5rem"
              className="!static !h-12 !w-12"
            />
            <p className="text-sm font-medium !leading-normal text-foreground sm:text-base">
              &copy; 2025 PalestinianCauses LLC. All Rights Reserved.
            </p>
          </MotionDiv>
          <ul className="flex flex-wrap items-center justify-start gap-5">
            {[
              { href: "/", label: "Home" },
              { href: "/cookie-policy", label: "Cookie Policy" },
              { href: "/privacy-policy", label: "Privacy Policy" },
              { href: "/returns-policy", label: "Returns Policy" },
              { href: "/terms-of-service", label: "Terms of Service" },
            ].map(({ href, label }, index) => (
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
        </div>
      </Container>
    </footer>
  );
};
