"use client";

// REVIEWED

import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowDownIcon, ArrowUpRightIcon, BookAlertIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/styles";

import { BlogRoomListItem } from "./item";

export const BlogRoomListLoading = function BlogRoomListLoading() {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          className="h-96 animate-pulse border border-input bg-foreground/5"
        />
      ))}
    </div>
  );
};

export const BlogRoomList = function BlogRoomList() {
  const queryKey = useMemo(() => ["blog-rooms"], []);

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
        collection: "blogs-rooms",
        filters: { page: pageParam, limit: 10 },
        depth: 1,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  const { rooms } = useMemo(() => {
    if (!data) return { rooms: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { rooms: pages };
  }, [data]);

  if (isLoading) return <BlogRoomListLoading />;

  if (rooms.length === 0)
    return (
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center pt-10 text-center">
        <div className="relative mb-6 flex w-max items-end lg:mb-8">
          <BookAlertIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
        </div>
        <SubSectionHeading small className="mb-4 lg:mb-6">
          The Riwaq Is Not Yet Available
        </SubSectionHeading>
        <Paragraph small className="mb-6 lg:mb-12">
          At this time, there are no rooms published for you to join in The
          Riwaq. We invite you to explore other areas or return soon, as new
          rooms and conversations are regularly introduced. Thank you for your
          interest and curiosity.
        </Paragraph>
        <Button variant="default" asChild>
          <Link href="/">
            <ArrowUpRightIcon />
            Return to Home
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
        {rooms.map((room) => (
          <BlogRoomListItem key={room.id} room={room} />
        ))}
      </section>

      {hasNextPage ? (
        <div className="flex w-full items-center justify-center">
          <Button
            variant="link"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}>
            {isFetchingNextPage
              ? "Loading more rooms..."
              : "Discover more rooms"}
            <ArrowDownIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
