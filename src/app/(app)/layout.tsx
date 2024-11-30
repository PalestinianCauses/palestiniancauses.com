// REVIEWED - 05
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shawqi Stack",
  description: "Created by @shawqicauses.",
};

const RootLayout = function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
