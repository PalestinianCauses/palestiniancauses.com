// REVIEWED - 01

import type { Metadata } from "next";

import { Container } from "@/components/globals/container";
import { SectionHeading } from "@/components/globals/typography";
import { ProfileInfo } from "@/components/profile/info";
import { ProfileNavigation } from "@/components/profile/navigation";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

const ProfilePage = function ProfilePage() {
  return (
    <Container
      as="main"
      className="section-padding-start-xl section-padding-end-xl max-w-7xl space-y-10">
      <SectionHeading as="h1" className="font-semibold">
        Profile
      </SectionHeading>
      <ProfileNavigation />
      <ProfileInfo />
    </Container>
  );
};

export default ProfilePage;
