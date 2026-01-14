// REVIEWED - 02
import { Metadata } from "next";

import { RedirectProvider } from "../providers";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support PalestinianCauses Digital Agency and help empower Gazan talent. Your contribution helps us continue delivering world-class digital solutions and supporting our community.",
  openGraph: {
    type: "website",
    siteName: "PalestinianCauses Digital Agency",
    url: `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/support`,
    title: "Support Us | PalestinianCauses Digital Agency",
    description:
      "Support PalestinianCauses Digital Agency and help empower Gazan talent. Your contribution helps us continue delivering world-class digital solutions.",
  },
  twitter: {
    card: "summary",
    title: "Support Us | PalestinianCauses Digital Agency",
    description:
      "Support PalestinianCauses Digital Agency and help empower Gazan talent.",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/support`,
  },
};

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
