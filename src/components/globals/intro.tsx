// REVIEWED - 12

import Link from "next/link";

import { AuthenticationButtons } from "../auth/buttons";
import { NotificationButton } from "../notification/button";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

const navigation = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
];

export const Intro = function Intro() {
  return (
    <section className="grid h-full grid-rows-[max-content_1fr_max-content] gap-5 p-5 xl:gap-10 xl:p-10">
      <nav className="flex flex-wrap items-center justify-between gap-5">
        <Label className="text-base">
          <Link href="/">PalestinianCauses.</Link>
        </Label>
        <AuthenticationButtons />
      </nav>
      <div className="flex flex-col items-start justify-center">
        <h1 className="flex w-full max-w-2xl flex-wrap gap-x-3 text-6xl leading-none tracking-tight sm:text-8xl lg:text-7xl xl:text-8xl [@media_(max-height:48rem)_and_(max-width:27rem)]:text-5xl [@media_(max-height:48rem)_and_(min-width:40rem)]:text-7xl">
          Passionate and Creative Individuals United By One Mission.
        </h1>
      </div>
      <footer className="flex w-full flex-col flex-wrap justify-start gap-5 xl:flex-row xl:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <p className="mr-auto text-sm leading-normal tracking-wide text-foreground">
            &copy; 2025 PalestinianCauses LLC. All Rights Reserved.
          </p>
          <NotificationButton />
        </div>
        <ul className="flex flex-row flex-wrap items-center justify-start gap-5">
          {[
            navigation.map(({ label, href }) => (
              <li key={href}>
                <Button variant="link" className="p-0" asChild>
                  <Link href={href}>{label}</Link>
                </Button>
              </li>
            )),
          ]}
        </ul>
      </footer>
    </section>
  );
};
