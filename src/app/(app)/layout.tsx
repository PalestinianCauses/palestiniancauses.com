// REVIEWED - 20
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { BackButton } from "@/components/globals/back-button";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: { template: "%s | PalestinianCauses", default: "PalestinianCauses" },
  description:
    'PalestinianCauses LLC is a mission-driven creative and digital platform dedicated to illuminating the Gazan experience, with an urgent focus on amplifying authentic voices and realities from Gaza during the current crisis. Through compelling storytelling, evocative artwork (as we showcased in our project "A Human But From Gaza"), and innovative digital solutions developed by our dedicated team, we strive to build global solidarity and foster deep empathy.',

  keywords: [
    "palestine",
    "palestinians",
    "gaza",
    "gazans",
    "palestinian causes",
    "palestiniancauses",
    "a human but from gaza",
    "humans but from gaza",
    "creative",
    "digital",
    "platform",
    "dedicated",
    "authentic",
    "crisis",
    "storytelling",
    "artwork",
    "innovative",
    "solutions",
    "global",
    "solidarity",
    "empathy",
    "shawqicauses",
    "shawqi",
  ],

  robots: { index: true, follow: true },

  icons: "/logo-primary.png",

  openGraph: {
    siteName: "PalestinianCauses",
    url: "https://palestiniancauses.com",
    images: [
      {
        url: "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXfJafovpKAixQkOwjFU9IWn4ZtucV2dL16J7T",
        width: 1200,
        height: 630,
        alt: "PalestinianCauses Website Thumbnail",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@palestiniancauses",
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXfJafovpKAixQkOwjFU9IWn4ZtucV2dL16J7T",
    ],
  },
};

const RootLayout = async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body>
        <BackButton />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
};

export default RootLayout;
