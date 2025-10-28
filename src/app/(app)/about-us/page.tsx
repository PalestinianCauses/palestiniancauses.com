// REVIEWED - 04

import { Metadata } from "next";

import { CoreValues } from "@/components/about-us/core-values";
import { CTA } from "@/components/about-us/cta";
import { Mission } from "@/components/about-us/mission";
import { OurModel } from "@/components/about-us/our-model";
import { Vision } from "@/components/about-us/vision";
import { WhoAreWe } from "@/components/about-us/who-are-we";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { SectionHeading } from "@/components/globals/typography";
import { VideoOutroScene } from "@/components/globals/video-outro-scene";

const sequence = [
  {
    word: "Excellence",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "Meets",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "Purpose",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "in",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "Every",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "Project",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "We",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "Deliver.",
    textColor: "text-primary",
    bgColor: "--background",
  },
];

export const metadata: Metadata = {
  title: "About Us - PalestinianCauses Digital Agency",
  description:
    "Meet the creators behind PalestinianCauses Digital Agency - a collective of world-class talent from Gaza delivering bespoke web applications, strategic content creation, expert translation services, and comprehensive digital marketing solutions. Learn how we turn adversity into competitive advantage and forge outstanding solutions from experience.",
  openGraph: {
    images: [
      {
        url: "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXSuH99qlsn0FbZuLtPqh2VI6Qs7jcgKfzwkTX",
        width: 1200,
        height: 630,
        alt: "PalestinianCauses About Us - World-Class Digital Agency from Gazan Talent",
      },
    ],
  },

  twitter: {
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXSuH99qlsn0FbZuLtPqh2VI6Qs7jcgKfzwkTX",
    ],
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
      <OurModel />
      <Mission />
      <Vision />
      <CoreValues />

      <CTA />

      <Footer />
    </main>
  );
}
