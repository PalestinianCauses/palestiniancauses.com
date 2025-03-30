// REVIEWED - 12
import { Mic2Icon } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { PropsWithChildren } from "react";
import "./globals.css";

import { Navbar } from "@/components/globals/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CartProvider } from "@/contexts/cart";
import { ProductProvider } from "@/contexts/product";
import { getCart } from "@/lib/shopify";

import { Providers } from "./providers";

export const metadata: Metadata = {
  title: { template: "%s | PalestinianCauses", default: "PalestinianCauses" },
  description:
    "PalestinianCauses LLC is a U.S.-registered company that creates innovative digital solutions and e-commerce experiences driven by Palestinians with specialized expertise and a unique perspective. Our platform is structured around 'rooms,' each offering exceptional content, services, or products. Our current project features the book A Human But From Gaza, and we have long-term plans to develop team members' rooms to showcase their digital solutions and tech-based services. We aim to foster meaningful connections and global awareness through storytelling, creativity, and technology.",
};

const RootLayout = async function RootLayout({ children }: PropsWithChildren) {
  const cartId = (await cookies()).get("cartId")?.value;
  const cart = getCart(cartId);

  return (
    <html lang="en" className="dark">
      <body>
        <CartProvider cartPromise={cart}>
          <ProductProvider>
            <Providers>
              <Navbar />
              {children}
              <Footer />
              <Button
                variant="outline"
                className="fixed bottom-2 left-2 right-2 z-50 h-auto flex-col gap-4 rounded-md border-0 bg-background/50 p-3 pt-5 text-foreground ring-1 ring-inset ring-foreground/15 backdrop-blur-md hover:bg-background/75 sm:bottom-10 sm:left-1/2 sm:right-[initial] sm:-translate-x-1/2 sm:flex-row sm:rounded-full sm:pl-5 sm:pt-3"
                asChild>
                <Link href="/share-the-truth">
                  <div className="flex items-center gap-4">
                    <Mic2Icon className="!h-5 !w-5 stroke-foreground" />
                    Share The Truth With PalestinianCauses.
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full sm:w-max sm:rounded-full"
                    asChild>
                    <span>Announcing Humans But From Gaza.</span>
                  </Button>
                </Link>
              </Button>
            </Providers>
          </ProductProvider>
        </CartProvider>
        <script
          async
          src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
        />
      </body>
    </html>
  );
};

export default RootLayout;
