// REVIEWED - 01

import { notFound } from "next/navigation";

import { PublicProfileDiaryEntriesList } from "./_components/list";

export default async function PublicProfileDiaryEntriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (!Number.isInteger(userId)) notFound();

  return <PublicProfileDiaryEntriesList userId={userId} />;
}
