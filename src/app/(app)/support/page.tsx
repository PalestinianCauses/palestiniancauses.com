// REVIEWED - 01
import { Metadata } from "next";

import { RedirectProvider } from "../providers";

export const metadata: Metadata = { title: "Support Us" };

export default function SupportPage() {
  return (
    <RedirectProvider
      path={[
        "https://www.paypal.com/donate/",
        [
          "hosted_button_id",
          process.env.NEXT_PUBLIC_PAYPAL_HOSTED_BUTTON_ID,
        ].join("="),
      ].join("?")}
    />
  );
}
