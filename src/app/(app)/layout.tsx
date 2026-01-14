// REVIEWED - 35

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { PropsWithChildren, Suspense } from "react";
import colors from "tailwindcss/colors";

import { DynamicBreadcrumb } from "@/components/globals/dynamic-breadcrumb";
import { SafeHydrate } from "@/components/globals/safe-hydrate";
import { SidebarLoading } from "@/components/globals/sidebar/loading";
import { SidebarContentPreFetch } from "@/components/globals/sidebar/pre-fetch-provider";
import { SidebarUser } from "@/components/globals/sidebar/user";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import { ActivityProvider, QueryProvider } from "./providers";

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
    type: "website",
    locale: "en_US",
    siteName: "PalestinianCauses Digital Agency",
    url: "https://palestiniancauses.com",
    title: "PalestinianCauses Digital Agency",
    description:
      "A world-class digital services agency powered by Gazan talent, PalestinianCauses specializes in Branded Web Applications, Strategic Content Creation, Expert Translation Services, and Comprehensive Digital Marketing Solutions.",
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
    creator: "@palestiniancauses",
    title: "PalestinianCauses Digital Agency",
    description:
      "A world-class digital services agency powered by Gazan talent, PalestinianCauses specializes in Branded Web Applications, Strategic Content Creation, Expert Translation Services, and Comprehensive Digital Marketing Solutions.",
    images: [
      "https://qwvvvruhbe.ufs.sh/f/ZhaM3m5tNWzXfJafovpKAixQkOwjFU9IWn4ZtucV2dL16J7T",
    ],
  },
  alternates: { canonical: "https://palestiniancauses.com" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: colors.zinc["900"],
};

const RootLayout = function RootLayout({ children }: PropsWithChildren) {
  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PalestinianCauses Digital Agency",
    "url": siteURL,
    "logo": `${siteURL}/logo-primary.png`,
    "description":
      "A world-class digital services agency powered by Gazan talent, PalestinianCauses specializes in Branded Web Applications, Strategic Content Creation, Expert Translation Services, and Comprehensive Digital Marketing Solutions.",
    "sameAs": ["https://www.instagram.com/palestiniancauses/"],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "PalestinianCauses Digital Agency",
    "url": siteURL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": [
          `${siteURL}/blogs`,
          [`title`, `{search_term_string}`].join("="),
        ].join("?"),
      },
      "query-input": ["required name", "search_term_string"].join("="),
    },
  };

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
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body>
        <Button variant="default" size="lg" asChild>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-5 focus:z-[100]">
            Skip to main content
          </a>
        </Button>
        <QueryProvider>
          <SafeHydrate>
            <SidebarProvider defaultOpen>
              <Sidebar collapsible="icon">
                <Suspense fallback={<SidebarLoading />}>
                  <SidebarContentPreFetch />
                </Suspense>
                <SidebarFooter>
                  <SidebarUser />
                </SidebarFooter>
              </Sidebar>
              <SidebarInset className="w-full max-w-full">
                <header className="fixed left-0 right-0 top-0 z-40 flex shrink-0 items-center justify-start bg-background py-4 transition-all duration-100 ease-in-out">
                  <div className="flex flex-col items-start justify-start gap-4 px-5 lg:px-7 xs:flex-row xs:items-center">
                    <SidebarTrigger />
                    <Separator
                      orientation="vertical"
                      className="hidden data-[orientation_=_vertical]:h-5 xs:block"
                    />
                    <DynamicBreadcrumb />
                  </div>
                </header>
                {children}
              </SidebarInset>
            </SidebarProvider>
          </SafeHydrate>
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
