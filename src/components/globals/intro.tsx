// REVIEWED - 01

import Link from "next/link";
import { Fragment } from "react";

import { getAuth } from "@/actions/auth";
import { motions } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { SignOutButton } from "../auth/sign-out-button";
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

export const Intro = async function Intro() {
  const auth = await getAuth();

  return (
    <section className="grid snap-start grid-rows-[max-content_1fr_max-content] gap-5 p-5 xl:gap-10 xl:p-10">
      <nav className="flex flex-wrap items-center justify-between gap-5">
        <MotionDiv
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}>
          <Label className="text-base">
            <Link href="/">PalestinianCauses.</Link>
          </Label>
        </MotionDiv>
        <ul className="flex flex-row items-center justify-center gap-2.5">
          {auth &&
          auth.user &&
          (auth.user.role === "admin" || auth.user.role === "system-user") ? (
            <MotionDiv
              initial={motions.fadeIn.initial}
              animate={motions.fadeIn.whileInView}
              whileInView={motions.fadeIn.whileInView}
              transition={motions.transition({ delay: 0.1 })}>
              <Button variant="link" asChild>
                <Link href="/admin">Dashboard</Link>
              </Button>
            </MotionDiv>
          ) : null}
          {auth && auth.user ? <SignOutButton /> : null}
          {!auth || !auth.user ? (
            <Fragment>
              <MotionDiv
                initial={motions.fadeIn.initial}
                animate={motions.fadeIn.whileInView}
                whileInView={motions.fadeIn.whileInView}
                transition={motions.transition({ delay: 0.1 })}>
                <Button variant="outline" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </MotionDiv>
              <MotionDiv
                initial={motions.fadeIn.initial}
                animate={motions.fadeIn.whileInView}
                whileInView={motions.fadeIn.whileInView}
                transition={motions.transition({ delay: 0.2 })}>
                <Button asChild>
                  <Link href="/signin">Sign in</Link>
                </Button>
              </MotionDiv>
            </Fragment>
          ) : null}
        </ul>
      </nav>
      <div className="flex flex-col items-start justify-center">
        <h1 className="flex w-full max-w-2xl flex-wrap gap-3 text-6xl font-normal leading-none tracking-tight lg:text-7xl xl:text-8xl [@media_(max-height:48rem)_and_(max-width:27rem)]:text-5xl [@media_(max-height:48rem)_and_(min-width:64rem)]:text-5xl">
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
