// REVIEWED - 01

import type { Metadata } from "next";

import { Container } from "@/components/globals/container";
import { SectionHeading } from "@/components/globals/typography";
import { ProfileActivity } from "@/components/profile/activity";
import { ProfileNavigation } from "@/components/profile/navigation";

export const metadata: Metadata = {
  title: "Activity",
  robots: { index: false, follow: false },
};

const ProfileActivityPage = function ProfileActivityPage() {
  return (
    <Container
      as="main"
      className="section-padding-start-xl section-padding-end-xl max-w-7xl space-y-10">
      <SectionHeading as="h1" className="font-semibold">
        Activity
      </SectionHeading>
      <ProfileNavigation />
      <ProfileActivity />
    </Container>
  );
};

export default ProfileActivityPage;
