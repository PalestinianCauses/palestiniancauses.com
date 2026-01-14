// REVIEWED - 08

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
    type: "website",
    siteName: "PalestinianCauses Digital Agency",
    url: `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/a-human-but-from-gaza`,
    title: "A Human But From Gaza | PalestinianCauses Digital Agency",
    description:
      'Explore "A Human But From Gaza," an essential collection merging intimate diaries and powerful artwork. Witness firsthand the pain, resilience, and enduring hope of Gazans living through the war in Gaza.',
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
    card: "summary_large_image",
    title: "A Human But From Gaza | PalestinianCauses Digital Agency",
    description:
      'Explore "A Human But From Gaza," an essential collection merging intimate diaries and powerful artwork.',
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXPchqygYObQW56zq7xX4EhSd9ZLHtm1gnvoV3",
    ],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/a-human-but-from-gaza`,
  },
};

export default async function AHumanButFromGazaPage() {
  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";

  const bookSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    "name": "A Human But From Gaza",
    "url": `${siteURL}/a-human-but-from-gaza`,
    "description":
      "An essential collection merging intimate diaries and powerful artwork. Witness firsthand the pain, resilience, and enduring hope of Gazans living through the war in Gaza.",
    "publisher": {
      "@type": "Organization",
      "name": "PalestinianCauses Digital Agency",
      "url": siteURL,
    },
    "offers": {
      "@type": "Offer",
      "price": "18.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
    },
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bookSchema),
        }}
      />

      <main id="main-content">
        <Header />
        <About />
        <Testimonials />
        <Container className="mb-24 flex items-center justify-center lg:mb-32">
          <HeaderButtons />
        </Container>
        <VideoOutroScene duration={600} containerClassName="-mb-12 lg:-mb-24" />
      </main>
      <Footer />
    </Fragment>
  );
}
