// REVIEWED - 14
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import { Toaster } from "@/components/ui/sonner";

import { Providers } from "./providers";

import "./globals.css";

export const metadata: Metadata = {
  title: { template: "%s | PalestinianCauses", default: "PalestinianCauses" },
  description:
    "PalestinianCauses LLC is a U.S.-registered company that creates innovative digital solutions and e-commerce experiences driven by Palestinians with specialized expertise and a unique perspective. Our platform is structured around 'rooms,' each offering exceptional content, services, or products. Our current project features the book A Human But From Gaza, and we have long-term plans to develop team members' rooms to showcase their digital solutions and tech-based services. We aim to foster meaningful connections and global awareness through storytelling, creativity, and technology.",
};

const RootLayout = async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>{children}</Providers>
        <Toaster richColors />
      </body>
    </html>
  );
};

export default RootLayout;
