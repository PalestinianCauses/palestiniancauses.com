// REVIEWED

import type { Metadata } from "next";

import { Container } from "@/components/globals/container";
import { SectionHeading } from "@/components/globals/typography";
import { ProfileNavigation } from "@/components/profile/navigation";
import { ProfileSettings } from "@/components/profile/settings";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false, follow: false },
};

const SettingsPage = function SettingsPage() {
  return (
    <Container as="main" className="section-padding-y-lg max-w-7xl space-y-10">
      <SectionHeading as="h1" className="font-semibold">
        Account Settings
      </SectionHeading>
      <ProfileNavigation />
      <ProfileSettings />
    </Container>
  );
};

export default SettingsPage;
