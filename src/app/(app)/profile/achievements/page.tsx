// REVIEWED

import type { Metadata } from "next";

import { Container } from "@/components/globals/container";
import { SectionHeading } from "@/components/globals/typography";
import { ProfileAchievements } from "@/components/profile/achievements";
import { ProfileNavigation } from "@/components/profile/navigation";

export const metadata: Metadata = {
  title: "Achievements",
  robots: { index: false, follow: false },
};

const ProfileAchievementsPage = function ProfileAchievementsPage() {
  return (
    <Container as="main" className="section-padding-y-lg max-w-7xl space-y-10">
      <SectionHeading as="h1" className="font-semibold">
        Achievements
      </SectionHeading>
      <ProfileNavigation />
      <ProfileAchievements />
    </Container>
  );
};

export default ProfileAchievementsPage;
