// REVIEWED
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = { title: "Support Us" };

export default function SupportPage() {
  redirect(
    [
      "https://www.paypal.com/donate/",
      [
        "hosted_button_id",
        process.env.NEXT_PUBLIC_PAYPAL_HOSTED_BUTTON_ID,
      ].join("="),
    ].join("?"),
  );
}
