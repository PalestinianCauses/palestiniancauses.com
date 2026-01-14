// REVIEWED - 07

import { Metadata } from "next";
import { Fragment } from "react";

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
  title: "About Us",
  description:
    "Learn about PalestinianCauses Digital Agency - where excellence meets purpose in every project. Discover our mission, vision, core values, and the resilient Gazan talent powering world-class digital solutions.",
  openGraph: {
    type: "website",
    siteName: "PalestinianCauses Digital Agency",
    url: `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/about-us`,
    title: "About Us | PalestinianCauses Digital Agency",
    description:
      "Learn about PalestinianCauses Digital Agency - where excellence meets purpose in every project. Discover our mission, vision, core values, and the resilient Gazan talent powering world-class digital solutions.",
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
    card: "summary_large_image",
    title: "About Us | PalestinianCauses Digital Agency",
    description:
      "Learn about PalestinianCauses Digital Agency - where excellence meets purpose in every project.",
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXSuH99qlsn0FbZuLtPqh2VI6Qs7jcgKfzwkTX",
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/about-us`,
  },
};

export default async function AboutPage() {
  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Us",
    "url": `${siteURL}/about-us`,
    "description":
      "Learn about PalestinianCauses Digital Agency - where excellence meets purpose in every project. Discover our mission, vision, core values, and the resilient Gazan talent powering world-class digital solutions.",
    "mainEntity": {
      "@type": "Organization",
      "name": "PalestinianCauses Digital Agency",
      "url": siteURL,
      "logo": `${siteURL}/logo-primary.png`,
      "description":
        "A world-class digital services agency powered by Gazan talent, PalestinianCauses specializes in Branded Web Applications, Strategic Content Creation, Expert Translation Services, and Comprehensive Digital Marketing Solutions.",
    },
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema),
        }}
      />

      <main id="main-content" className="section-padding-start-xl relative">
        <Container className="mb-12 max-w-7xl">
          <header>
            <SectionHeading as="h1">About us.</SectionHeading>
          </header>
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
    </Fragment>
  );
}
