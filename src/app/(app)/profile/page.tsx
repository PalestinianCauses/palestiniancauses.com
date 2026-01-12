// REVIEWED - 03

import type { Metadata } from "next";
import { Fragment, Suspense } from "react";

import {
  ProfileAchievements,
  ProfileAchievementsLoading,
} from "@/components/profile/achievements";
import { ProfileActivity } from "@/components/profile/activity";
import { LoadingActivity } from "@/components/profile/globals";
import { ProfileInfo } from "@/components/profile/info";
import { ProfileNotifications } from "@/components/profile/notifications";
import { ProfileSettings } from "@/components/profile/settings";
import { TabsContent } from "@/components/ui/tabs";
import { getAuthentication } from "@/lib/server/auth";

import { RedirectProvider } from "../providers";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false, follow: false },
};

const ProfilePage = async function ProfilePage() {
  const user = await getAuthentication();

  if (!user)
    return (
      <RedirectProvider path={["/signin", "redirect=profile"].join("?")} />
    );

  return (
    <Fragment>
      <TabsContent value="info">
        <ProfileInfo user={user} />
      </TabsContent>
      <TabsContent value="activity">
        <Suspense fallback={LoadingActivity}>
          <ProfileActivity user={user} />
        </Suspense>
      </TabsContent>
      <TabsContent value="achievements">
        <Suspense fallback={ProfileAchievementsLoading}>
          <ProfileAchievements user={user} />
        </Suspense>
      </TabsContent>
      <TabsContent value="notifications">
        <ProfileNotifications user={user} />
      </TabsContent>
      <TabsContent value="settings">
        <ProfileSettings user={user} />
      </TabsContent>
    </Fragment>
  );
};

export default ProfilePage;
