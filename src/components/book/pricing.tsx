// REVIEWED - 01
import { CheckIcon } from "lucide-react";
import { notFound } from "next/navigation";

import { getProduct } from "@/lib/shopify";

import { Container } from "../globals/container";

import { PricingButton } from "./pricing-button";

export const Pricing = async function Pricing() {
  const product = await getProduct("a-human-but-from-gaza-e-book");

  if (!product) return notFound();

  return (
    <section
      id="pricing"
      data-section="pricing"
      className="relative z-10 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2
            className="font-stretch mt-2 text-balance bg-gradient-to-b from-foreground/25 via-foreground to-foreground/50 bg-cover bg-clip-text bg-center bg-no-repeat text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            style={{ WebkitTextFillColor: "transparent" }}>
            Discover the Value of Our Stories.
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-pretty text-lg text-muted-foreground sm:text-xl/8">
            Explore the cost of our transformative book and see how your
            purchase supports a meaningful cause. Choose between the instantly
            accessible e-book or the upcoming hard-copy edition.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-foreground/5 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
          <div className="p-8 sm:p-10 lg:flex-auto">
            <h3 className="text-3xl font-semibold tracking-tight text-foreground">
              Why This Book is Worth It?
            </h3>
            <p className="mt-6 text-base/7 text-muted-foreground">
              Our book offers more than just compelling narratives—it delivers
              real-world impact and a profoundly moving experience.
            </p>
            <div className="mt-10 flex items-center gap-x-4">
              <h4 className="flex-none text-sm/6 font-medium text-foreground">
                That means:
              </h4>
              <div className="h-px flex-auto bg-border" />
            </div>
            <ul className="is mt-8 grid grid-cols-1 gap-4 text-sm/6 text-foreground sm:grid-cols-2 sm:gap-6">
              {[
                "Support a Cause",
                "Exclusive Content",
                "Be Inspired",
                "Instant Access",
              ].map((experience) => (
                <li key={experience} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className="h-6 w-5 flex-none text-secondary"
                  />
                  {experience}
                </li>
              ))}
            </ul>
          </div>
          <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:shrink-0">
            <div className="rounded-2xl bg-foreground/5 py-10 text-center ring-1 ring-inset ring-foreground/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
              <PricingButton product={product} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
