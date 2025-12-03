// REVIEWED - 01

import { notFound } from "next/navigation";

import { RedirectProvider } from "../../providers";

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) notFound();

  return <RedirectProvider path={`/user/${userId}/diary-entries`} />;
}
