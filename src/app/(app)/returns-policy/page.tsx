// REVIEWED
import Link from "next/link";

import { HeroBackgroundPattern } from "@/components/book/hero-background-pattern";
import { Container } from "@/components/globals/container";
import { Button } from "@/components/ui/button";

export default function ReturnsPolicyPage() {
  return (
    <main className="relative py-48">
      <HeroBackgroundPattern />
      <Container>
        <section
          id="returns-policy"
          data-section="returns-policy"
          className="mx-auto flex max-w-3xl flex-col gap-10">
          <div className="flex flex-col items-start gap-2">
            <h1
              className="font-stretch text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-center text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              style={{ WebkitTextFillColor: "transparent" }}>
              PalestinianCauses LLC Returns Policy.
            </h1>
          </div>
          <div className="flex flex-col gap-10 text-lg/9 text-muted-foreground">
            <p>Last updated: January 9, 2025</p>
            <p>
              We understand there may be a time to return a purchase, and we aim
              to make the return process as simple as possible.
            </p>
            <p>
              If you want to return or exchange your order, we offer returns
              within 30 days of purchase. You can return your product for store
              credit or a refund using the original payment method.
            </p>
            <p>
              Please note: All returned items must be in new and unused
              condition, with the original tags and labels attached.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Return Process.
            </h2>
            <p>
              To return an item, email us at{" "}
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="mailto:hello@palestiniancauses.com">
                    hello@palestiniancauses.com
                  </Link>
                </Button>
              </span>{" "}
              with your Order Number and return reason, and our support team
              will be happy to assist you with the next steps.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Refunds.
            </h2>
            <p>
              After receiving your item/s and inspecting the condition, we will
              process your refund or exchange. Please allow at least 3 days from
              receiving your item/s to process your return.
            </p>
            <h2 className="mt-6 text-3xl font-semibold text-foreground">
              Questions.
            </h2>
            <p>
              For questions about our returns policy, please contact us at{" "}
              <span>
                <Button
                  variant="link"
                  className="p-0 text-lg/9 font-medium text-foreground"
                  asChild>
                  <Link href="mailto:hello@palestiniancauses.com">
                    hello@palestiniancauses.com
                  </Link>
                </Button>
              </span>{" "}
              .
            </p>
          </div>
        </section>
      </Container>
    </main>
  );
}
