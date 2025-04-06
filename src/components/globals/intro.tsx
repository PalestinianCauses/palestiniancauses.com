// REVIEWED

import Link from "next/link";

import { MotionDiv, MotionSpan } from "@/lib/motion";
import { cn, motions } from "@/lib/utils";

import { Button } from "../ui/button";
import { Label } from "../ui/label";

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
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.fadeIn.transition({})}>
          <Label className="text-base">
            <Link href="/">PalestinianCauses.</Link>
          </Label>
        </MotionDiv>
        <ul className="flex flex-row items-center justify-center gap-5">
          <MotionDiv
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.fadeIn.transition({ delay: 0.1 })}>
            <Button variant="link" asChild>
              <Link href="/signin">Sign up</Link>
            </Button>
          </MotionDiv>
          <MotionDiv
            initial={motions.fadeIn.initial}
            whileInView={motions.fadeIn.whileInView}
            transition={motions.fadeIn.transition({ delay: 0.2 })}>
            <Button asChild>
              <Link href="/signin">Sign in</Link>
            </Button>
          </MotionDiv>
        </ul>
      </nav>
      <div className="flex flex-col items-start justify-center">
        <h1 className="flex w-full max-w-2xl flex-wrap gap-3 text-6xl font-normal leading-none tracking-tight lg:text-7xl xl:text-8xl">
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
              initial={motions.fadeIn.initial}
              whileInView={motions.fadeIn.whileInView}
              transition={motions.fadeIn.transition({ delay: index * 0.1 })}
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
        <p className="mr-auto text-sm leading-normal tracking-wide text-foreground">
          &copy; 2025 PalestinianCauses LLC. All Rights Reserved.
        </p>
        <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
          {[
            navigation.map(({ label, href }, index) => (
              <li key={href}>
                <MotionDiv
                  initial={motions.fadeIn.initial}
                  whileInView={motions.fadeIn.whileInView}
                  transition={motions.fadeIn.transition({
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
