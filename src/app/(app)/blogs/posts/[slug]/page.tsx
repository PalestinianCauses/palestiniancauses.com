// REVIEWED - 02

import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import {
  CalendarIcon,
  ExternalLinkIcon,
  InfoIcon,
  ListTreeIcon,
} from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { ElementType, Fragment, ReactNode } from "react";

import {
  BlogPostCategories,
  BlogPostImageFeatured,
} from "@/components/blog-post/item";
import { Container } from "@/components/globals/container";
import { Footer } from "@/components/globals/footer";
import { RichText } from "@/components/globals/rich-text";
import { Paragraph, SectionHeading } from "@/components/globals/typography";
import { UserAvatar } from "@/components/globals/user-avatar";
import { StatusBadge } from "@/components/profile/globals";
import { InformationBadges } from "@/components/room/globals";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { isObject } from "@/lib/types/guards";
import { getMediaURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";
import { BlogsCategory, BlogsRoom } from "@/payload-types";

import { RedirectProvider } from "../../../providers";

const BlogPostDetails = function BlogPostDetails({
  Icon,
  name,
  content,
}: {
  Icon: ElementType;
  name: ReactNode;
  content: ReactNode;
}) {
  return (
    <div className="flex flex-col items-start justify-start gap-2.5">
      <Paragraph className="flex items-center justify-start gap-2.5 text-base font-medium text-foreground lg:text-base">
        <Icon className="size-5" />
        {name}
      </Paragraph>
      {content}
    </div>
  );
};

// eslint-disable-next-line func-style
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;
  const response = await actionSafeExecute(
    payload.find({
      collection: "blogs-posts",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 2,
    }),
    messages.actions.blogPost.serverErrorGet,
  );

  if (!response.data || response.error || response.data.docs.length === 0)
    return { title: "Blog Post Not Found" };

  const post = response.data.docs[0];
  const imageFeatured = getMediaURL(post.imageFeatured);

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const postURL = `${siteURL}/blogs/posts/${slug}`;

  return {
    title: `${post.title} | The Riwaq`,
    description: post.excerpt,
    openGraph: {
      url: postURL,
      siteName: "PalestinianCauses Digital Agency",
      type: "article",
      title: post.title,
      description: post.excerpt,
      images: imageFeatured
        ? [{ url: imageFeatured, alt: post.title, width: 1200, height: 630 }]
        : [],
      authors: post.authors.map((author) =>
        isObject(author) && author.firstName && author.lastName
          ? `${author.firstName} ${author.lastName}`
          : (isObject(author) && author.firstName) || "Anonymous",
      ),
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt || post.publishedAt || post.createdAt,
      tags: post.tags || [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: imageFeatured ? [imageFeatured] : [],
    },
    alternates: { canonical: postURL },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // eslint-disable-next-line prefer-destructuring
  const slug = (await params).slug;
  const response = await actionSafeExecute(
    payload.find({
      collection: "blogs-posts",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 2,
    }),
    messages.actions.blogPost.serverErrorGet,
  );

  if (!response.data || response.error || response.data.docs.length === 0)
    return <RedirectProvider path="/blogs" />;

  const post = response.data.docs[0];
  const blogRoom = isObject(post.blogRoom) ? post.blogRoom : null;
  const blogRoomLanguage: BlogsRoom["language"] =
    blogRoom?.language || "english";

  const imageFeatured = getMediaURL(post.imageFeatured);

  const authors = post.authors
    ? post.authors.filter((author) => isObject(author))
    : [];

  const translators = post.translators
    ? post.translators.filter((translator) => isObject(translator))
    : [];

  const categories = post.categories
    ? post.categories.filter((category): category is BlogsCategory =>
        isObject(category),
      )
    : [];

  const datePublished = format(
    new Date(post.publishedAt || post.createdAt),
    "MMMM d, yyyy",
    { locale: blogRoomLanguage === "arabic" ? ar : enUS },
  );

  const siteURL =
    process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com";
  const blogRoomURL = blogRoom
    ? `${siteURL}/blogs/${blogRoom.slug}`
    : undefined;
  const postURL = `${siteURL}/blogs/posts/${slug}`;

  // Structured Data (JSON-LD) for Article
  const dataStructured = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": imageFeatured ? [imageFeatured] : undefined,
    "datePublished": post.publishedAt || post.createdAt,
    "dateModified": post.updatedAt || post.publishedAt || post.createdAt,
    "publisher": {
      "@type": "Organization",
      "name": "PalestinianCauses Digital Agency",
      "url": siteURL,
    },
    "isPartOf": blogRoom
      ? { "@type": "Blog", "name": blogRoom.name, "url": blogRoomURL }
      : undefined,
    "inLanguage": blogRoomLanguage === "arabic" ? "ar" : "en",
    "author": [...authors, ...translators].map((author) => ({
      "@type": "Person",
      "name":
        author.firstName && author.lastName
          ? `${author.firstName} ${author.lastName}`
          : author.firstName || "Anonymous",
      "url": `${siteURL}/user/${author.id}`,
    })),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postURL,
    },
    "articleSection":
      categories.map((category) => category.name).join(", ") || undefined,
    "keywords": post.tags || undefined,
  };

  const authorLabel = blogRoomLanguage === "arabic" ? "مؤلفـ/ـة" : "Author";
  const translatorLabel =
    blogRoomLanguage === "arabic" ? "مترجمـ/ـة" : "Translator";

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
          direction: blogRoomLanguage === "arabic" ? "rtl" : "ltr",
          fontFamily:
            blogRoomLanguage === "arabic" ? "ShamelSansOne" : "Gilroy",
        }}>
        <Container className="grid max-w-7xl grid-cols-12 gap-5">
          <article
            itemScope
            itemType="https://schema.org/BlogPosting"
            className="col-span-12 lg:col-span-8">
            <header className="mb-10 space-y-5">
              <InformationBadges
                badges={[
                  {
                    icon: CalendarIcon,
                    label:
                      blogRoomLanguage === "arabic"
                        ? datePublished.replaceAll(",", "،")
                        : datePublished,
                  },
                ]}
                aria-label="Publication Date"
                className="mb-0"
              />

              <SectionHeading as="h1" itemProp="headline">
                {post.title}
              </SectionHeading>

              <BlogPostImageFeatured
                sizes="(max-width: 48rem) 100vw, (max-width: 75rem) 80vw, 64rem"
                title={post.title}
                image={post.imageFeatured}
                color={blogRoom?.color || "red"}
              />
            </header>

            <div itemProp="articleBody">
              <RichText data={post.content} color={blogRoom?.color} />
            </div>
          </article>
          <aside className="col-span-12 h-min space-y-5 border border-input p-5 lg:sticky lg:top-20 lg:col-span-4">
            <BlogPostDetails
              Icon={InfoIcon}
              name={blogRoomLanguage === "arabic" ? "الوصف" : "Description"}
              content={
                <Paragraph
                  itemProp="description"
                  className="text-lg lg:text-lg">
                  {post.excerpt}
                </Paragraph>
              }
            />

            {categories.length !== 0 ? (
              <BlogPostDetails
                Icon={ListTreeIcon}
                name={
                  blogRoomLanguage === "arabic"
                    ? "فئات المدونة"
                    : "Blog Categories"
                }
                content={
                  <BlogPostCategories
                    categories={categories}
                    color={blogRoom?.color || "red"}
                  />
                }
              />
            ) : null}

            {authors.length !== 0 ? (
              <div className="flex flex-col items-start justify-start gap-2.5">
                <Paragraph className="flex items-center justify-start gap-2.5 text-base font-medium text-foreground lg:text-base">
                  <InfoIcon className="size-5" />
                  {blogRoomLanguage === "arabic"
                    ? "مؤلفو المدونة"
                    : "Blog Authors"}
                </Paragraph>
                <div className="flex w-full flex-col items-start justify-start gap-2.5">
                  {[...authors, ...translators].map((user) => (
                    <Link
                      key={user.id}
                      href={`/user/${user.id}`}
                      dir="ltr"
                      className="flex w-full items-center justify-start gap-2.5">
                      <UserAvatar
                        user={user}
                        className="w-10"
                        fallbackClassName="!font-[Gilroy]"
                      />

                      <Paragraph className="flex items-center justify-start gap-1.5 !font-[Gilroy] text-base font-medium text-foreground lg:text-base">
                        {user.firstName || "Anonymous"} {user.lastName || ""}
                        <ExternalLinkIcon className="size-4" />
                      </Paragraph>

                      {authors.length !== 0 && translators.length !== 0 ? (
                        <StatusBadge
                          label={
                            (authors.includes(user) && authorLabel) ||
                            (translators.includes(user) && translatorLabel)
                          }
                          className={cn(
                            "border-input bg-background font-[inherit] font-medium text-foreground hover:bg-background",
                          )}
                        />
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </aside>
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
}
