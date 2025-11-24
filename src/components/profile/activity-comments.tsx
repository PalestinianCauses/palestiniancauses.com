"use client";

// REVIEWED

import { useInfiniteQuery } from "@tanstack/react-query";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  MessageSquareDotIcon,
  MessageSquareIcon,
  MessageSquareOffIcon,
  MessageSquarePlusIcon,
  MessagesSquareIcon,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { useUser } from "@/hooks/use-user";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";

import { CommentItem } from "../comments/item";
import { SafeHydrate } from "../globals/safe-hydrate";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

import { LoadingActivity, StatCard } from "./activity";

export const ActivityComments = function ActivityComments() {
  const { isLoading: isLoadingUser, data: user } = useUser();

  const queryKey = useMemo(
    () => ["user-activity-comments", user?.id],
    [user?.id],
  );

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
      if (!user) return null;

      const response = await getCollection({
        collection: "comments",
        req: { user: { collection: "users", ...user } },
        user,
        filters: {
          page: pageParam,
          limit: 2,
          fields: { user: { equals: user.id } },
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

  const { stats, comments } = useMemo(() => {
    if (!data)
      return {
        stats: { total: 0, approved: 0, pending: 0, rejected: 0 },
        comments: [],
      };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return {
      stats: {
        total: pages.length,
        approved: pages.filter((page) => page.status === "approved").length,
        pending: pages.filter((page) => page.status === "pending").length,
        rejected: pages.filter((page) => page.status === "rejected").length,
      },
      comments: pages,
    };
  }, [data]);

  return (
    <SafeHydrate
      isLoading={isLoadingUser || isLoading}
      isLoadingComponent={LoadingActivity}>
      {(() => {
        if (!user || !data || comments.length === 0) return null;

        return (
          <div className="space-y-10">
            <div className="space-y-0.5">
              <SubSectionHeading
                as="h2"
                className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
                <MessagesSquareIcon className="size-6 stroke-[1.5]" />
                Comments Activity
              </SubSectionHeading>
              <Paragraph className="text-sm lg:text-sm">
                Your comments and their status across our platform
              </Paragraph>
            </div>

            <div className="!mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                color="blue"
                label="Total"
                value={stats.total}
                icon={MessageSquareIcon}
              />

              <StatCard
                color="green"
                label="Approved"
                value={stats.approved}
                icon={MessageSquarePlusIcon}
              />

              <StatCard
                color="yellow"
                label="Pending"
                value={stats.pending}
                icon={MessageSquareDotIcon}
              />

              <StatCard
                color="red"
                label="Rejected"
                value={stats.rejected}
                icon={MessageSquareOffIcon}
              />
            </div>

            <section
              className={cn("flex w-full flex-col gap-10", {
                "pointer-events-none opacity-50": isFetching,
              })}>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-l border-input/25 py-2.5 pl-5">
                  <div className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-5">
                    <Badge
                      size="sm"
                      className={cn(
                        "border px-2 py-1 text-xs capitalize ring-0",
                        {
                          "border-tertiary-2/10 bg-tertiary-2/10 text-tertiary-2 hover:bg-tertiary-2/10":
                            comment.status === "approved",
                          "border-yellow-500/10 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
                            comment.status === "pending",
                          "border-secondary/10 bg-secondary/10 text-secondary hover:bg-secondary/10":
                            comment.status === "rejected",
                        },
                      )}>
                      {comment.status}
                    </Badge>

                    {comment.parent ? (
                      <Badge
                        size="sm"
                        className={cn(
                          "border border-tertiary/10 bg-tertiary/10 px-2 py-1 text-xs text-tertiary ring-0 hover:bg-tertiary/10",
                        )}>
                        A reply to a comment
                      </Badge>
                    ) : null}

                    {isObject(comment.on.value) ? (
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-muted-foreground hover:text-foreground"
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
                  </div>
                  <CommentItem
                    isActivityComment
                    queryKey={queryKey}
                    user={user}
                    comment={comment}
                    depth={0}
                  />
                </div>
              ))}
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
      })()}
    </SafeHydrate>
  );
};
