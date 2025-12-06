// REVIEWED - 01

import type { Metadata } from "next";

import { Container } from "@/components/globals/container";
import { SectionHeading } from "@/components/globals/typography";
import { ProfileNavigation } from "@/components/profile/navigation";
import { ProfileNotifications } from "@/components/profile/notifications";

export const metadata: Metadata = {
  title: "Notifications",
  robots: { index: false, follow: false },
};

const NotificationsPage = function NotificationsPage() {
  return (
    <Container
      as="main"
      className="section-padding-start-xl section-padding-end-xl max-w-7xl space-y-10">
      <SectionHeading as="h1" className="font-semibold">
        Notifications
      </SectionHeading>
      <ProfileNavigation />
      <ProfileNotifications />
    </Container>
  );
};

export default NotificationsPage;
