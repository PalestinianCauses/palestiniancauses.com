// REVIEWED

import { notFound } from "next/navigation";

import { AchievementsList } from "./_components/list";

export default async function AchievementsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (!Number.isInteger(userId)) notFound();

  return <AchievementsList userId={userId} />;
}
