// REVIEWED

import { notFound } from "next/navigation";

import { CommentsList } from "./_components/list";

export default async function CommentsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (!Number.isInteger(userId)) notFound();

  return <CommentsList userId={userId} />;
}
