// REVIEWED - 10
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { PropsWithChildren } from "react";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
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
            <Providers>{children}</Providers>
          </ProductProvider>
        </CartProvider>
        <Footer />
        <script
          async
          src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"
        />
      </body>
    </html>
  );
};

export default RootLayout;
