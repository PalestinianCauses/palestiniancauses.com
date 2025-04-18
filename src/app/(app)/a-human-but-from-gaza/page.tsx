// REVIEWED - 02

import { Metadata } from "next";
import { Fragment } from "react";

import { About } from "@/components/a-human-but-from-gaza/about";
import { Footer } from "@/components/a-human-but-from-gaza/footer";
import { Header } from "@/components/a-human-but-from-gaza/header";
import { Testimonials } from "@/components/a-human-but-from-gaza/testimonials";
import { getProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "A Human But From Gaza",
  description:
    'Explore "A Human But From Gaza," an essential collection merging intimate diaries and powerful artwork. Witness firsthand the pain, resilience, and enduring hope of Gazans living through the war in Gaza. Amplify their authentic voices and stand in solidarity—order your copy today to support our mission.',
};

export default async function AHumanButFromGazaPage() {
  const product = await getProduct("a-human-but-from-gaza-e-book");
  if (!product) return null;

  return (
    <Fragment>
      <Header product={product} />
      <About />
      <Testimonials />
      <Footer product={product} />
    </Fragment>
  );
}
