"use client";

// REVIEWED - 01

import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowDownIcon, ArrowUpRightIcon, BookTextIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { getPublicCollection } from "@/lib/api/public";
import { cn } from "@/lib/utils/styles";
import { BlogsRoom } from "@/payload-types";

import { BlogPostListItem } from "./item";

export const BlogPostListLoading = function BlogPostListLoading() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="h-40 animate-pulse border border-input bg-foreground/5"
        />
      ))}
    </div>
  );
};

export const BlogPostList = function BlogPostList({
  blogRoomId,
  language,
  color,
}: {
  blogRoomId: number;
  language: BlogsRoom["language"];
  color: BlogsRoom["color"];
}) {
  const queryKey = useMemo(() => ["blog-posts", blogRoomId], [blogRoomId]);

  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
  } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPublicCollection<"blogs-posts">({
        collection: "blogs-posts",
        page: pageParam,
        limit: 10,
        sort: ["-publishedAt", "-createdAt"].join(","),
        where: {
          blogRoom: { equals: blogRoomId },
          status: { equals: "published" },
        },
        depth: 1,
      });

      if (!response.data || response.error || response.data.docs.length === 0)
        return null;

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  const { posts } = useMemo(() => {
    if (!data) return { posts: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { posts: pages };
  }, [data]);

  if (isLoading) return <BlogPostListLoading />;

  if (posts.length === 0)
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pt-10 text-center">
        <div className="relative mb-6 flex w-max items-end lg:mb-8">
          <BookTextIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
        </div>
        <SubSectionHeading small className="mb-4 lg:mb-6">
          {language === "arabic"
            ? "عذراً، لا توجد مقالات منشورة حالياً"
            : "No Posts Available"}
        </SubSectionHeading>
        <Paragraph small className="mb-6 lg:mb-12">
          {language === "arabic"
            ? "لم يتم نشر أي مقالات في هذه المدونة حتى الآن. ندعوكم للعودة قريباً للإطلاع على مقالات مميزة وثرية يقدِّمها مؤلفونا، أو تصفح أقسام الموقع الأخرى لإستكشاف المزيد من المحتوى."
            : "There are currently no posts published in this blog room. Please explore other sections or return later to discover insightful new entries from our contributors."}
        </Paragraph>
        <Button variant="default" asChild>
          <Link href="/blogs">
            <ArrowUpRightIcon />
            {language === "arabic"
              ? "إستكشف وإستعرض المزيد"
              : "Discover and explore more"}
          </Link>
        </Button>
      </div>
    );

  return (
    <div className="space-y-10">
      <section
        className={cn("grid grid-cols-1 gap-10 lg:grid-cols-2", {
          "pointer-events-none opacity-50": isFetching,
        })}>
        {posts.map((post) => (
          <BlogPostListItem
            key={post.id}
            post={post}
            language={language}
            color={color}
          />
        ))}
      </section>

      {hasNextPage ? (
        <div className="flex w-full items-center justify-center">
          <Button
            variant="link"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? "Loading more posts..." : "Load more posts"}
            <ArrowDownIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
