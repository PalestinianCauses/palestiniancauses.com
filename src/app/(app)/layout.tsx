// REVIEWED - 32

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { PropsWithChildren } from "react";
import colors from "tailwindcss/colors";

import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import {
  ActivityProvider,
  QueryProvider,
  SidebarMainProvider,
} from "./providers";

export const metadata: Metadata = {
  applicationName: "PalestinianCauses",
  title: {
    template: "%s | PalestinianCauses Digital Agency",
    default: "PalestinianCauses Digital Agency",
  },
  description:
    "A world-class digital services agency powered by Gazan talent, PalestinianCauses specializes in Branded Web Applications, Strategic Content Creation, Expert Translation Services, and Comprehensive Digital Marketing Solutions. PalestinianCauses is where resilience turns into innovation and excellence, developing and delivering outstanding, globally competitive digital solutions.",

  keywords: [
    "palestine",
    "palestinians",
    "gaza",
    "gazans",
    "palestinian causes",
    "palestiniancauses",
    "gazan talent",
    "digital agency",
    "world-class solutions",
    "professional services",
    "creative excellence",
    "resilience innovation",
    "global competitive",

    "web development",
    "content creation",
    "translation services",
    "digital marketing",

    "shawqicauses",
    "shawqi",
    "a human but from gaza",
    "humans but from gaza",
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
    siteName: "PalestinianCauses Digital Agency",
    url: "https://palestiniancauses.com",
    images: [
      {
        url: "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXfJafovpKAixQkOwjFU9IWn4ZtucV2dL16J7T",
        width: 1200,
        height: 630,
        alt: "PalestinianCauses Digital Agency - World-Class Solutions from Gazan Talent",
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

const RootLayout = function RootLayout({ children }: PropsWithChildren) {
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
        <QueryProvider>
          <SidebarMainProvider>{children}</SidebarMainProvider>
          <ActivityProvider />
          <ReactQueryDevtools />
        </QueryProvider>
        <Toaster theme="dark" richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
