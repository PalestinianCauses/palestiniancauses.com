// REVIEWED

import { notFound } from "next/navigation";

import { getUser } from "@/actions/user";
import { ProfileStatistics } from "@/components/profile/statistics";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (!Number.isInteger(userId)) notFound();

  const userResponse = await getUser(userId);

  if (!userResponse.data || userResponse.error) notFound();

  if (!userResponse.data.privacySettings.showActivity) notFound();

  return <ProfileStatistics userId={userId} />;
}
