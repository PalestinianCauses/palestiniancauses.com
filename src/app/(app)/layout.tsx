// REVIEWED - 06
import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Home - PalestinianCauses",
  description: "No description available for now.",
};

const RootLayout = function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
