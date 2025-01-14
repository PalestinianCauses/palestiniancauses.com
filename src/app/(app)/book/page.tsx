// REVIEWED - 03
import { Fragment } from "react";

import { About } from "@/components/book/about";
import { EarlyReviews } from "@/components/book/early-reviews";
import { Hero } from "@/components/book/hero";
import { Pricing } from "@/components/book/pricing";
import { SneakPeak } from "@/components/book/sneak-peak";

export default async function BookPage() {
  return (
    <Fragment>
      <Hero />
      <About />
      <SneakPeak />
      <EarlyReviews />
      <Pricing />
    </Fragment>
  );
}
