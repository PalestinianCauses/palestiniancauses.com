// REVIEWED - 07

import { Metadata } from "next";
import { Fragment } from "react";

import { About } from "@/components/a-human-but-from-gaza/about";
import { Header } from "@/components/a-human-but-from-gaza/header";
import { HeaderButtons } from "@/components/a-human-but-from-gaza/header-buttons";
import { Testimonials } from "@/components/a-human-but-from-gaza/testimonials";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { VideoOutroScene } from "@/components/globals/video-outro-scene";

export const metadata: Metadata = {
  title: "A Human But From Gaza",
  description:
    'Explore "A Human But From Gaza," an essential collection merging intimate diaries and powerful artwork. Witness firsthand the pain, resilience, and enduring hope of Gazans living through the war in Gaza. Amplify their authentic voices and stand in solidarity—order your copy today to support our mission.',

  openGraph: {
    images: [
      {
        url: "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXPchqygYObQW56zq7xX4EhSd9ZLHtm1gnvoV3",
        width: 1200,
        height: 630,
        alt: "PalestinianCauses A Human But From Gaza Thumbnail",
      },
    ],
  },

  twitter: {
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXPchqygYObQW56zq7xX4EhSd9ZLHtm1gnvoV3",
    ],
  },
};

export default async function AHumanButFromGazaPage() {
  return (
    <Fragment>
      <Header />
      <About />
      <Testimonials />
      <Container className="mb-24 flex items-center justify-center lg:mb-32">
        <HeaderButtons />
      </Container>
      <VideoOutroScene duration={600} containerClassName="-mb-12 lg:-mb-24" />
      <Footer />
    </Fragment>
  );
}
