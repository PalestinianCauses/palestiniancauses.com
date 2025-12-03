// REVIEWED

import { notFound } from "next/navigation";

import { getUser } from "@/actions/user";

import { OrdersList } from "./_components/list";

export default async function PublicProfileOrdersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) notFound();

  const userResponse = await getUser(userId);

  if (!userResponse.data || userResponse.error) notFound();

  if (!userResponse.data.privacySettings.showOrders) notFound();

  return <OrdersList userId={userId} />;
}
