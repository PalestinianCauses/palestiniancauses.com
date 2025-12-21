"use client";

// REVIEWED

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

export const BlogPostListItem = function BlogPostListItem({
  post,
  language,
  color,
}: {
  post: BlogsPost;
  language: BlogsRoom["language"];
  color: BlogsRoom["color"];
}) {
  const imageURL = getMediaURL(post.imageFeatured);

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
    <article className="group relative flex flex-col items-start justify-start gap-10 py-10">
      <div className="absolute left-0 top-0 flex w-full items-center justify-start gap-2.5">
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

      {imageURL ? (
        <SuspenseImage
          isLoadingElement={<Skeleton className="h-full w-full" />}
          src={imageURL}
          alt={post.title}
          fill
          sizes="16rem"
          containerClassName="relative aspect-video h-auto shrink-0"
          className="!static object-cover"
        />
      ) : (
        <div
          className={cn(
            "aspect-video w-full shrink-0 border bg-gradient-to-br opacity-25",
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
      )}

      <div className="flex flex-1 flex-col items-start justify-start gap-5">
        <InformationBadges
          badges={[{ icon: CalendarIcon, label: datePublished }]}
          className="mb-0"
        />

        <div className="space-y-2.5">
          <SubSectionHeading as="h2" className="line-clamp-2">
            {post.title}
          </SubSectionHeading>
          <Paragraph small className="line-clamp-3">
            {post.excerpt}
          </Paragraph>
        </div>

        {categories.length !== 0 ? (
          <div className="flex flex-wrap items-center justify-start gap-2.5">
            {categories.map((category) => (
              <Badge
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
                {category.name}
              </Badge>
            ))}
          </div>
        ) : null}

        <Button
          variant="link"
          size="lg"
          dir={language === "arabic" ? "rtl" : "ltr"}
          className="p-0"
          asChild>
          <Link href={`/blogs/posts/${post.slug}`}>
            <ArrowUpRightIcon />
            {language === "arabic" ? "إقرأ المزيد" : "Read More"}
          </Link>
        </Button>
      </div>
    </article>
  );
};
