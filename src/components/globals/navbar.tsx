"use client";

// REVIEWED - 01

import Link from "next/link";

import { Button } from "../ui/button";

import { Container } from "./container";

export const Navbar = function Navbar() {
  return (
    <nav
      aria-label="Global"
      className="fixed left-0 right-0 top-0 z-10 border-b border-foreground/10 bg-foreground/5 py-5 backdrop-blur-md">
      <Container>
        <div className="flex items-center justify-between">
          <ul className="ml-auto flex items-center gap-5">
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
