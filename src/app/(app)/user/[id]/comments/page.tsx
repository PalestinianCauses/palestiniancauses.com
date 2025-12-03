// REVIEWED - 01

import { notFound } from "next/navigation";

import { PublicProfileCommentsList } from "./_components/list";

export default async function PublicProfileCommentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (!Number.isInteger(userId)) notFound();

  return <PublicProfileCommentsList userId={userId} />;
}
