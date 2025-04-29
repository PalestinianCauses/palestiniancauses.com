// REVIEWED - 02

import { Metadata } from "next";

import { CoreValues } from "@/components/about-us/core-values";
import { CTA } from "@/components/about-us/cta";
import { Mission } from "@/components/about-us/mission";
import { Vision } from "@/components/about-us/vision";
import { WhoAreWe } from "@/components/about-us/who-are-we";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { SectionHeading } from "@/components/globals/typography";
import { VideoOutroScene } from "@/components/globals/video-outro-scene";

const sequence = [
  {
    word: "The Team",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "That",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "Embodies",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "The",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "Gazan",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "Identity",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "Mission",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "and",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "Values.",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
];

export const metadata: Metadata = {
  title: "About Us",

  openGraph: {
    images: [
      {
        url: "https://palestiniancauses.com/og-2.jpg",
        width: 1200,
        height: 630,
        alt: "PalestinianCauses About Us Thumbnail",
      },
    ],
  },

  twitter: {
    images: ["https://palestiniancauses.com/og-2.jpg"],
  },
};

export default async function AboutPage() {
  return (
    <main className="relative">
      <Container className="max-w-7xl pb-12 pt-24 xl:pb-24 xl:pt-32">
        <SectionHeading>About us.</SectionHeading>
      </Container>

      <VideoOutroScene
        sequence={sequence}
        duration={800}
        containerClassName="mb-12 xl:mb-24"
      />

      <WhoAreWe />
      <Mission />
      <Vision />
      <CoreValues />

      <CTA />

      <Footer />
    </main>
  );
}
