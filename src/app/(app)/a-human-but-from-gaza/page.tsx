// REVIEWED - 01

import { Fragment } from "react";

import { About } from "@/components/a-human-but-from-gaza/about";
import { Header } from "@/components/a-human-but-from-gaza/header";
import { Testimonials } from "@/components/a-human-but-from-gaza/testimonials";
import { getProduct } from "@/lib/shopify";

export default async function AHumanButFromGazaPage() {
  const product = await getProduct("a-human-but-from-gaza-e-book");
  if (!product) return null;

  return (
    <Fragment>
      <Header product={product} />
      <About />
      <Testimonials />
      <div className="py-20" />
    </Fragment>
  );
}
