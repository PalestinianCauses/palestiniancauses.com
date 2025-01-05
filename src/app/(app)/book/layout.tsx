// REVIEWED - 01
import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "A Human But From Gaza: PalestinianCauses' Book",
  description:
    '"A Human But From Gaza" shares the powerful diaries of M. and L., revealing life during the ongoing war in Gaza. Enhanced with the artwork of N., these three sisters and the PalestinianCauses team capture the resilience, loss, and hope of those fighting to be seen and remembered.',
};

export default function BookLayout({ children }: PropsWithChildren) {
  return children;
}
