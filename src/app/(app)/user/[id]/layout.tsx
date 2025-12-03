// REVIEWED - 01

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

import { getUser } from "@/actions/user";
import { Container } from "@/components/globals/container";
import { PublicProfile } from "@/components/profile/public-profile";

export const generateMetadata = async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (Number.isNaN(userId))
    return {
      title: "User Not Found",
    };

  const userResponse = await getUser(userId);

  if (!userResponse.data || userResponse.error)
    return {
      title: "User Not Found",
    };

  return {
    title: `${userResponse.data.firstName || "Anonymous User"}'s Profile`,
    description: `Discover more about ${userResponse.data.firstName || "this user"}—explore their contributions, achievements, and journey within the PalestinianCauses community.`,
    robots: { index: true, follow: true },
  };
};

const PublicProfilePage = async function PublicProfilePage({
  params,
  children,
}: { params: Promise<{ id: string }> } & PropsWithChildren) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) notFound();

  const userResponse = await getUser(userId);

  if (!userResponse.data || userResponse.error) notFound();

  return (
    <Container as="main" className="section-padding-y-lg max-w-7xl space-y-10">
      <PublicProfile user={userResponse.data} />
      {children}
    </Container>
  );
};

export default PublicProfilePage;
