// REVIEWED - 06

import { Metadata } from "next";

import { RedirectProvider } from "../providers";

export const metadata: Metadata = {
  title: "A Human But From Gaza",
  description:
    'Explore "A Human But From Gaza," an essential collection merging intimate diaries and powerful artwork. Witness firsthand the pain, resilience, and enduring hope of Gazans living through the war in Gaza. Amplify their authentic voices and stand in solidarity—order your copy today to support our mission.',
};

export default async function BookPage() {
  return <RedirectProvider path="/a-human-but-from-gaza" />;
}
