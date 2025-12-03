// REVIEWED - 01

import { notFound } from "next/navigation";

import { getUser } from "@/actions/user";

import { PublicProfileStatistics } from "./_components/statistics";

export default async function PublicProfileActivityPage({
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

  return <PublicProfileStatistics userId={userId} />;
}
