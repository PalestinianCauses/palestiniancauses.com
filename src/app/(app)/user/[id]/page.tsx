// REVIEWED - 02

import { notFound } from "next/navigation";
import { Suspense } from "react";

import { DiaryEntryListLoading } from "@/components/diary-entry/loading";
import { Loading } from "@/components/globals/loading";
import {
  ProfileAchievements,
  ProfileAchievementsLoading,
} from "@/components/profile/achievements";
import { PublicProfile } from "@/components/profile/public-profile";
import { PublicProfileTabsProvider } from "@/components/profile/public-tabs-provider";
import { TabsContent } from "@/components/ui/tabs";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";

import { PublicProfileStatistics } from "./activity/_components/statistics";
import { PublicProfileCommentsList } from "./comments/_components/list";
import { PublicProfileDiaryEntriesList } from "./diary-entries/_components/list";
import { PublicProfileOrdersList } from "./orders/_components/list";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) notFound();

  const userResponse = await actionSafeExecute(
    payload.findByID({
      collection: "users",
      id: userId,
      depth: 1,
    }),
    messages.actions.user.serverError,
  );

  if (!userResponse.data || userResponse.error) notFound();

  const user = userResponse.data;

  return (
    <Suspense fallback={<Loading />}>
      <PublicProfileTabsProvider user={user}>
        <PublicProfile user={user} />

        <TabsContent value="comments">
          <Suspense fallback={<Loading className="max-h-48 min-h-24" />}>
            <PublicProfileCommentsList user={user} />
          </Suspense>
        </TabsContent>

        <TabsContent value="diary-entries">
          <Suspense fallback={<DiaryEntryListLoading />}>
            <PublicProfileDiaryEntriesList user={user} />
          </Suspense>
        </TabsContent>

        {user.privacySettings.showOrders ? (
          <TabsContent value="orders">
            <Suspense fallback={<Loading className="max-h-48 min-h-24" />}>
              <PublicProfileOrdersList user={user} />
            </Suspense>
          </TabsContent>
        ) : null}

        {user.privacySettings.showAchievements ? (
          <TabsContent value="achievements">
            <Suspense fallback={ProfileAchievementsLoading}>
              <ProfileAchievements isPublicProfile user={user} />
            </Suspense>
          </TabsContent>
        ) : null}

        {user.privacySettings.showActivity ? (
          <TabsContent value="activity">
            <PublicProfileStatistics user={user} />
          </TabsContent>
        ) : null}
      </PublicProfileTabsProvider>
    </Suspense>
  );
}
