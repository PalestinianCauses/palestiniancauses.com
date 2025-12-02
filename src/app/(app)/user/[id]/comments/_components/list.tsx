"use client";

// REVIEWED - 01

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  MessagesSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { CommentItem } from "@/components/comments/item";
import { Loading } from "@/components/globals/loading";
import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";

export const CommentsList = function CommentsList({
  userId,
}: {
  userId: number;
}) {
  const { isLoading: isLoadingUser, data: user } = useUser();

  const queryKey = useMemo(() => ["public-user-comments", userId], [userId]);

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
      const response = await getCollection({
        collection: "comments",
        filters: {
          page: pageParam,
          limit: 5,
          fields: {
            user: { equals: userId },
            status: { equals: "approved" },
          },
        },
        depth: 4,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  const { comments } = useMemo(() => {
    if (!data) return { comments: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { comments: pages };
  }, [data]);

  if (isLoadingUser || isLoading)
    return <Loading className="max-h-48 min-h-24" />;

  return (
    <div className="space-y-10">
      <section
        className={cn("flex w-full flex-col gap-5", {
          "pointer-events-none opacity-50": isFetching,
        })}>
        {comments.length !== 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="border border-input/50 p-5">
              {isObject(comment.on.value) ? (
                <Button
                  variant="link"
                  className="mb-5 p-0 text-muted-foreground hover:text-foreground"
                  asChild>
                  <Link
                    href={`/${comment.on.relationTo === "diary-entries" ? "humans-but-from-gaza" : "blog"}/${comment.on.value.id}`}>
                    <ArrowUpRightIcon />
                    Commented on{" "}
                    <span className="text-foreground">
                      {comment.on.value.title.slice(0, 24)}
                      {comment.on.value.title.length > 24 ? "..." : ""}
                    </span>
                  </Link>
                </Button>
              ) : null}

              <CommentItem
                isActivityComment
                queryKey={queryKey}
                depth={0}
                user={user}
                comment={comment}
              />
            </div>
          ))
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pt-10 text-center">
            <div className="relative mb-6 flex w-max items-end lg:mb-8">
              <MessagesSquareIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
            </div>
            <SubSectionHeading small className="mb-4 lg:mb-6">
              This user has not published any comments yet
            </SubSectionHeading>
            <Paragraph small className="mb-6 lg:mb-12">
              There are currently no comments available for this user. Explore
              other profiles or check back soon for more discussions and
              perspectives.
            </Paragraph>
          </div>
        )}
      </section>

      {hasNextPage ? (
        <div className="flex w-full items-center justify-center">
          <Button
            variant="link"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage
              ? "Loading more comments..."
              : "Read more comments"}
            <ArrowDownIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
