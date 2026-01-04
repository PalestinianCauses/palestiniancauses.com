// REVIEWED - 02

import { Metadata } from "next";
import { Fragment } from "react";

import { getBlogRoom } from "@/actions/blog-room";
import { BlogPostList } from "@/components/blog-post/list";
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
      type: "website",
      locale: room.language === "arabic" ? "ar" : "en",
      siteName: "PalestinianCauses Digital Agency",
      url: roomURL,
      title: `${room.name} by ${ownerName} | The Riwaq`,
      description: room.description || undefined,
      images: [],
    },
    twitter: {
      card: "summary",
      title: `${room.name} by ${ownerName} | The Riwaq`,
      description: room.description || undefined,
    },
    alternates: { canonical: roomURL },
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
  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const roomURL = `${siteURL}/blogs/${room.slug}`;

  const roomOwner = isObject(room.roomOwner) ? room.roomOwner : null;
  const authors = room.authors
    ? room.authors.filter((author) => isObject(author))
    : [];

  // Structured Data (JSON-LD) for Blog
  const dataStructured = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": room.name,
    "description": room.description || undefined,
    "url": roomURL,
    "inLanguage": room.language === "arabic" ? "ar" : "en",
    "publisher": {
      "@type": "Organization",
      "name": "PalestinianCauses Digital Agency",
      "url": siteURL,
    },
    "author": roomOwner
      ? {
          "@type": "Person",
          "name": roomOwner.firstName || "Anonymous",
          "url": `${siteURL}/user/${roomOwner.id}`,
        }
      : undefined,
    "contributor": authors.map((author) => ({
      "@type": "Person",
      "name": author.firstName || "Anonymous",
      "url": `${siteURL}/user/${author.id}`,
    })),
  };

  return (
    <Fragment>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dataStructured) }}
      />

      <main
        id="main-content"
        className="section-padding-start-xl section-padding-end-xl [&_*]:font-[inherit]"
        style={{
          direction: room.language === "arabic" ? "rtl" : "ltr",
          fontFamily: room.language === "arabic" ? "ShamelSansOne" : "Gilroy",
        }}>
        <Container className="mb-10 max-w-7xl">
          <BlogRoomHeader room={room} />
        </Container>
        <Container className="max-w-7xl">
          <section aria-label="Blog Posts">
            <BlogPostList
              blogRoomId={room.id}
              language={room.language}
              color={room.color}
            />
          </section>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
}
