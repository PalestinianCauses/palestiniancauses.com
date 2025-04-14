// REVIEWED - 04

import Link from "next/link";

import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { AuthButtons } from "../auth/buttons";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

import { MotionDiv, MotionP, MotionSpan } from "./motion";

const navigation = [
  // { label: "Acceptable Use Policy", href: "/acceptable-use-policy" },
  // { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  // { label: "Returns Policy", href: "/returns-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const Intro = function Intro() {
  return (
    <section className="grid snap-start grid-rows-[max-content_1fr_max-content] gap-5 p-5 xl:gap-10 xl:p-10">
      <nav className="flex flex-wrap items-center justify-between gap-5">
        <MotionDiv
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}>
          <Label className="text-base">
            <Link href="/">PalestinianCauses.</Link>
          </Label>
        </MotionDiv>
        <AuthButtons />
      </nav>
      <div className="flex flex-col items-start justify-center">
        <h1 className="flex w-full max-w-2xl flex-wrap gap-x-3 text-6xl leading-none tracking-tight sm:text-8xl lg:text-7xl xl:text-8xl [@media_(max-height:48rem)_and_(max-width:27rem)]:text-5xl [@media_(max-height:48rem)_and_(min-width:40rem)]:text-7xl">
          {[
            "Passionate",
            "and",
            "Creative",
            { text: "Individuals", class: "italic font-semibold" },
            "United",
            "By",
            "One",
            { text: "Mission.", class: "italic font-semibold" },
          ].map((word, index) => (
            <MotionSpan
              key={typeof word === "string" ? word : word.text}
              viewport={{ once: true }}
              initial={motions.fadeIn.initial}
              whileInView={motions.fadeIn.whileInView}
              transition={motions.transition({ delay: index * 0.1 })}
              className={cn(
                "whitespace-break-spaces",
                typeof word === "string" ? "" : word.class,
              )}>
              {typeof word === "string" ? word : word.text}
            </MotionSpan>
          ))}
        </h1>
      </div>
      <footer className="flex w-full flex-row flex-wrap items-center justify-start gap-5">
        <MotionP
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}
          className="mr-auto text-sm leading-normal tracking-wide text-foreground">
          &copy; 2025 PalestinianCauses LLC. All Rights Reserved.
        </MotionP>
        <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
          {[
            navigation.map(({ label, href }, index) => (
              <li key={href}>
                <MotionDiv
                  viewport={{ once: true }}
                  initial={motions.fadeIn.initial}
                  whileInView={motions.fadeIn.whileInView}
                  transition={motions.transition({
                    delay: index * 0.1,
                  })}>
                  <Button variant="link" className="p-0" asChild>
                    <Link href={href}>{label}</Link>
                  </Button>
                </MotionDiv>
              </li>
            )),
          ]}
        </ul>
      </footer>
    </section>
  );
};
