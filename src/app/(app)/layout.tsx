// REVIEWED - 22
import type { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import colors from "tailwindcss/colors";

import { BackButton } from "@/components/globals/back-button";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { QueryProvider, TokenProvider } from "./providers";

export const metadata: Metadata = {
  applicationName: "PalestinianCauses",
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

  icons: [
    {
      rel: "shortcut icon",
      type: "image/x-icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/icon-01.svg",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      url: "/icon-01.png",
    },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      sizes: "180x180",
      url: "/apple.png",
    },
  ],

  manifest: "/manifest.json",

  appleWebApp: {
    title: "PC",
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: "/logo-primary.png",
  },

  formatDetection: { telephone: true },

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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: colors.zinc["900"],
};

const RootLayout = async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/apple.png" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/manifest-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="/manifest-512x512.png"
        />
      </head>
      <body>
        <BackButton />
        <QueryProvider>
          <TokenProvider />
        </QueryProvider>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
};

export default RootLayout;
