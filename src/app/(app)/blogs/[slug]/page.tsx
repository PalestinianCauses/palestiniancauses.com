// REVIEWED

import { Metadata } from "next";
import { Fragment } from "react";

import { getBlogRoom } from "@/actions/blog-room";
import { BlogRoomHeader } from "@/components/blog-room/header";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { isObject } from "@/lib/types/guards";

import { RedirectProvider } from "../../providers";

// eslint-disable-next-line func-style
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;
  const response = await getBlogRoom(slug);

  if (!response.data || response.error) return { title: "Blog Room Not Found" };

  const room = response.data;
  const roomOwner = isObject(room.roomOwner) ? room.roomOwner : null;
  // eslint-disable-next-line no-nested-ternary
  const ownerName = roomOwner
    ? roomOwner.firstName || "Anonymous"
    : "Anonymous";

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const roomURL = `${siteURL}/blogs/${slug}`;

  return {
    title: `${room.name} by ${ownerName} | The Riwaq`,
    description: room.description || undefined,
    openGraph: {
      url: roomURL,
      siteName: "PalestinianCauses Digital Agency",
      type: "website",
      title: `${room.name} by ${ownerName} | The Riwaq`,
      description: room.description || undefined,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${room.name} by ${ownerName} | The Riwaq`,
      description: room.description || undefined,
    },
  };
}

export default async function BlogRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;
  const response = await getBlogRoom(slug);

  if (!response.data || response.error)
    return <RedirectProvider path="/blogs" />;

  const room = response.data;

  return (
    <Fragment>
      <main
        className="section-padding-start-xl section-padding-end-xl"
        style={{ direction: room.language === "arabic" ? "rtl" : "ltr" }}>
        <Container className="max-w-7xl">
          <BlogRoomHeader room={room} />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
}
