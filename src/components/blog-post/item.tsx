"use client";

// REVIEWED - 01

import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { ArrowUpRightIcon, CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { isObject } from "@/lib/types/guards";
import { getMediaURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";
import { BlogsCategory, BlogsPost, BlogsRoom } from "@/payload-types";

import { SuspenseImage } from "../globals/suspense-image";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { InformationBadges } from "../room/globals";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";

export const BlogPostImageFeatured = function BlogPostImageFeatured({
  sizes,
  title,
  image,
  color,
}: {
  sizes?: string;
  title: BlogsPost["title"];
  image: BlogsPost["imageFeatured"];
  color: BlogsRoom["color"];
}) {
  const imageURL = getMediaURL(image);
  const imageSizes =
    sizes || "(max-width: 48rem) 100vw, (max-width: 75rem) 50vw, 33vw";

  return imageURL ? (
    <figure className="relative shrink-0">
      <SuspenseImage
        itemProp="image"
        isLoadingElement={<Skeleton className="h-full w-full" />}
        src={imageURL}
        alt={title}
        fill
        sizes={imageSizes}
        containerClassName="relative aspect-video h-auto shrink-0"
        className="!static object-cover"
      />
      <figcaption className="sr-only">{title}</figcaption>
    </figure>
  ) : (
    <div
      aria-hidden="true"
      className={cn(
        "aspect-[1.905/1] w-full shrink-0 border bg-gradient-to-br opacity-25",
        {
          "border-red-500/50 from-red-500/50 via-red-700/50 to-red-900/50":
            color === "red",
          "border-yellow-500/50 from-yellow-500/50 via-yellow-700/50 to-yellow-900/50":
            color === "yellow",
          "border-green-500/50 from-green-500/50 via-green-700/50 to-green-900/50":
            color === "green",
          "border-teal-500/50 from-teal-500/50 via-teal-700/50 to-teal-900/50":
            color === "teal",
          "border-blue-500/50 from-blue-500/50 via-blue-700/50 to-blue-900/50":
            color === "blue",
        },
      )}
    />
  );
};

export const BlogPostCategories = function BlogPostCategories({
  categories,
  color,
}: {
  categories: BlogsCategory[];
  color: BlogsRoom["color"];
}) {
  return categories.length !== 0 ? (
    <nav
      aria-label="Post Categories"
      className="flex flex-wrap items-center justify-start gap-2.5">
      {categories.map((category) => (
        <Badge
          key={category.id}
          itemProp="articleSection"
          size="sm"
          className={cn("border-s-2 !font-[Gilroy] text-sm ring-0", {
            "border-red-500 bg-red-500/10 text-red-500 hover:bg-red-500/10":
              color === "red",
            "border-yellow-500 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
              color === "yellow",
            "border-green-500 bg-green-500/10 text-green-500 hover:bg-green-500/10":
              color === "green",
            "border-teal-500 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
              color === "teal",
            "border-blue-500 bg-blue-500/10 text-blue-500 hover:bg-blue-500/10":
              color === "blue",
          })}>
          <ArrowUpRightIcon aria-hidden="true" className="size-4" />
          {category.name}
        </Badge>
      ))}
    </nav>
  ) : null;
};

export const BlogPostListItem = function BlogPostListItem({
  post,
  language,
  color,
}: {
  post: BlogsPost;
  language: BlogsRoom["language"];
  color: BlogsRoom["color"];
}) {
  const categories = post.categories
    ? post.categories.filter((category): category is BlogsCategory =>
        isObject(category),
      )
    : [];

  const datePublished = useMemo(
    () =>
      format(new Date(post.publishedAt || post.createdAt), "MMMM d, yyyy", {
        locale: language === "arabic" ? ar : enUS,
      }),
    [post.publishedAt, post.createdAt, language],
  );

  return (
    <article
      itemScope
      itemType="https://schema.org/BlogPosting"
      className="group relative flex flex-col items-start justify-start gap-10 py-10">
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 flex w-full items-center justify-start gap-2.5">
        <div
          className={cn("h-px w-5 shrink-0 bg-foreground", {
            "bg-red-500": color === "red",
            "bg-yellow-500": color === "yellow",
            "bg-green-500": color === "green",
            "bg-teal-500": color === "teal",
            "bg-blue-500": color === "blue",
          })}
        />

        <div className="h-px w-full bg-input/50" />
      </div>

      <BlogPostImageFeatured
        title={post.title}
        image={post.imageFeatured}
        color={color}
      />

      <div className="flex flex-1 flex-col items-start justify-start gap-5">
        <InformationBadges
          badges={[{ icon: CalendarIcon, label: datePublished }]}
          aria-label="Publication date"
          className="mb-0"
        />

        <header className="space-y-2.5">
          <SubSectionHeading
            as="h2"
            itemProp="headline"
            className="line-clamp-2">
            {post.title}
          </SubSectionHeading>
          <Paragraph small itemProp="description" className="line-clamp-3">
            {post.excerpt}
          </Paragraph>
        </header>

        <BlogPostCategories categories={categories} color={color} />

        <Button
          variant="link"
          size="lg"
          dir={language === "arabic" ? "rtl" : "ltr"}
          className="p-0"
          asChild>
          <Link
            href={`/blogs/posts/${post.slug}`}
            aria-label={`Read more: ${post.title}`}>
            <ArrowUpRightIcon aria-hidden="true" />
            {language === "arabic" ? "إقرأ المزيد" : "Read More"}
          </Link>
        </Button>
      </div>
    </article>
  );
};
