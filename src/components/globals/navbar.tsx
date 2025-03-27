"use client";

// REVIEWED - 02

import Image from "next/image";
import Link from "next/link";

import { Button } from "../ui/button";

import { Container } from "./container";

export const Navbar = function Navbar() {
  return (
    <nav
      aria-label="Global"
      className="fixed left-0 right-0 top-0 z-20 border-b border-foreground/10 py-5 backdrop-blur">
      <Container>
        <div className="xs:flex-row flex flex-col items-center justify-between gap-5">
          <Link href="/book" className="flex items-center gap-5">
            <Image
              src="/pc-logo-primary-foreground.png"
              alt="PC Logo"
              sizes="3rem"
              fill
              className="!static !h-auto !w-12"
            />
            <Button
              variant="link"
              className="h-auto px-0 py-0 text-base leading-none"
              asChild>
              <span>PalestinianCauses.</span>
            </Button>
          </Link>
          <ul className="xs:ml-auto flex items-center gap-3">
            <li>
              <Button variant="ghost" className="font-semibold" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </li>
            <li>
              <Button className="font-semibold" asChild>
                <Link href="/signin">Sign in</Link>
              </Button>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
};
