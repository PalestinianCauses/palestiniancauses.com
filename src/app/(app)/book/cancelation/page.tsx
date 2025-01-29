"use clients";

// REVIEWED - 01
/* eslint-disable no-shadow */

import Link from "next/link";

import { redirectToCheckout } from "@/actions/cart";
import { HeroBackgroundPattern } from "@/components/book/hero-background-pattern";
import { Container } from "@/components/globals/container";
import { Button } from "@/components/ui/button";

export default function CancelationPage() {
  return (
    <main
      id="cancelation"
      data-section="cancelation"
      className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <HeroBackgroundPattern />
      <Container>
        <div className="text-center">
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Have you changed your mind? It is fine.
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-base text-muted-foreground sm:text-lg/8">
            Even though your donation means the world to us and directly impacts
            the lives of the PalestinianCauses family, we are still giving you
            your free copy of &quot;A Human But From Gaza&quot;.
          </p>
          <form
            action={async () => {
              "use server";

              await redirectToCheckout();
            }}
            className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant="secondary">Get Your Free Copy</Button>
            <Button variant="link" asChild>
              <Link href="/#pricing">Donate Again</Link>
            </Button>
          </form>
        </div>
      </Container>
    </main>
  );
}
