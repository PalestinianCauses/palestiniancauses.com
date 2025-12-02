// REVIEWED

import { notFound } from "next/navigation";

import { DiaryEntriesList } from "./_components/list";

export default async function DiaryEntriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (!Number.isInteger(userId)) notFound();

  return <DiaryEntriesList userId={userId} />;
}
