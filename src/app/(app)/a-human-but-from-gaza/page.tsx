// REVIEWED - 04

import { Metadata } from "next";
import { Fragment } from "react";

import { About } from "@/components/a-human-but-from-gaza/about";
import { Header } from "@/components/a-human-but-from-gaza/header";
import { HeaderButtons } from "@/components/a-human-but-from-gaza/header-buttons";
import { Testimonials } from "@/components/a-human-but-from-gaza/testimonials";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { VideoOutroScene } from "@/components/globals/video-outro-scene";
import { getProduct } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "A Human But From Gaza",
  description:
    'Explore "A Human But From Gaza," an essential collection merging intimate diaries and powerful artwork. Witness firsthand the pain, resilience, and enduring hope of Gazans living through the war in Gaza. Amplify their authentic voices and stand in solidarity—order your copy today to support our mission.',

  openGraph: {
    images: [
      {
        url: "https://palestiniancauses.com/og-3.jpg",
        width: 1200,
        height: 630,
        alt: "PalestinianCauses A Human But From Gaza Thumbnail",
      },
    ],
  },

  twitter: {
    images: ["https://palestiniancauses.com/og-3.jpg"],
  },
};

export default async function AHumanButFromGazaPage() {
  const product = await getProduct("a-human-but-from-gaza-e-book");
  if (!product) return null;

  return (
    <Fragment>
      <Header product={product} />
      <About />
      <Testimonials />
      <VideoOutroScene duration={600} />
      <Container>
        <div className="relative z-50 flex w-full -translate-y-[3.25rem] items-center justify-center sm:-mt-[4.25rem] sm:translate-y-0 sm:pb-4 lg:-mt-[5.25rem] lg:pb-8">
          <HeaderButtons product={product} />
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
}
