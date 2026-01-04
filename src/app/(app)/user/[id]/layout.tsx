// REVIEWED - 04

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment, PropsWithChildren } from "react";

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

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const profileURL = `${siteURL}/user/${userId}`;

  const userName =
    userResponse.data.firstName && userResponse.data.lastName
      ? `${userResponse.data.firstName} ${userResponse.data.lastName}`
      : userResponse.data.firstName || "Anonymous User";

  return {
    title: `${userName}'s Profile`,
    description: `Discover more about ${userName}—explore their contributions, achievements, and journey within the PalestinianCauses community.`,
    openGraph: {
      type: "profile",
      siteName: "PalestinianCauses Digital Agency",
      url: profileURL,
      title: `${userName}'s Profile | PalestinianCauses Digital Agency`,
      description: `Discover more about ${userName}—explore their contributions, achievements, and journey within the PalestinianCauses community.`,
    },
    twitter: {
      card: "summary",
      title: `${userName}'s Profile | PalestinianCauses Digital Agency`,
      description: `Discover more about ${userName}—explore their contributions, achievements, and journey.`,
    },
    alternates: { canonical: profileURL },
    robots: { index: true, follow: true },
  };
};

const PublicProfileLayout = async function PublicProfileLayout({
  params,
  children,
}: { params: Promise<{ id: string }> } & PropsWithChildren) {
  const { id } = await params;
  const userId = parseInt(id, 10);

  if (Number.isNaN(userId)) notFound();

  const userResponse = await getUser(userId);

  if (!userResponse.data || userResponse.error) notFound();

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const profileURL = `${siteURL}/user/${userId}`;

  const userName =
    userResponse.data.firstName && userResponse.data.lastName
      ? `${userResponse.data.firstName} ${userResponse.data.lastName}`
      : userResponse.data.firstName || "Anonymous User";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": userName,
    "url": profileURL,
    "email": userResponse.data.email,
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      <Container
        as="main"
        id="main-content"
        className="section-padding-start-xl section-padding-end-xl max-w-7xl space-y-10">
        <PublicProfile user={userResponse.data} />
        {children}
      </Container>
    </Fragment>
  );
};

export default PublicProfileLayout;
