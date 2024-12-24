// REVIEWED - 01
import { Fragment } from "react";

import { About } from "@/components/book/about";
import { Hero } from "@/components/book/hero";

// REVIEWED
export default function BookPage() {
  return (
    <Fragment>
      <Hero />
      <About />
      <div className="py-24" />
    </Fragment>
  );
}
