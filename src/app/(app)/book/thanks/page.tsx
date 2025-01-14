// REVIEWED - 01
import { MailCheckIcon } from "lucide-react";
import Link from "next/link";

import { HeroBackgroundPattern } from "@/components/book/hero-background-pattern";
import { Container } from "@/components/globals/container";
import { Button } from "@/components/ui/button";

export default function ThanksPage() {
  return (
    <main
      id="thanks"
      data-section="thanks"
      className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <HeroBackgroundPattern />
      <Container>
        <div className="text-center">
          <Button
            variant="outline"
            className="gap-3 rounded-full border-0 bg-secondary/15 px-5 py-6 text-lg text-foreground ring-1 ring-inset ring-secondary/35 hover:bg-secondary"
            asChild>
            <p>
              <MailCheckIcon className="!size-6" />{" "}
              <span>We have sent you an email</span>
            </p>
          </Button>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
            Thank you for your purchase 💚!
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-pretty text-lg text-muted-foreground sm:text-xl/8">
            Your support means the world to us and directly impacts the lives of
            the PalestinianCauses family, helping us to rebuild after
            unimaginable hardships.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button variant="secondary" asChild>
              <Link href="/">Go Back Home</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href="mailto:hello@palestiniancauses.com">Contact</Link>
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}
