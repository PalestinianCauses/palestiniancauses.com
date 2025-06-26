"use client";

// REVIEWED - 04

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ArrowDownIcon } from "lucide-react";
import { GeneratedTypes } from "payload";
import { Fragment, useMemo } from "react";

import { getCollection, ResponseDataCollection } from "@/actions/collection";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { FiltersOptions } from "@/lib/types";
import { cn } from "@/lib/utils/styles";

import { Button } from "../ui/button";

import { CommentItem } from "./item";

export const CommentList = function CommentList({
  commentsInitial,
  filters,
  fieldsSearch,
}: {
  commentsInitial: ResponseDataCollection<"comments">;
  filters: FiltersOptions;
  fieldsSearch: (keyof GeneratedTypes["collections"]["comments"])[];
}) {
  const { elementId, jumpToPlusHighlight } = useHashScroll();

  const {
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
  } = useSuspenseInfiniteQuery({
    queryKey: ["comments", filters, fieldsSearch],
    queryFn: async ({ pageParam = filters.page }) => {
      const response = await getCollection({
        collection: "comments",
        filters: { ...filters, page: pageParam },
        fieldsSearch,
        depth: 1,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialData: { pageParams: [filters.page], pages: [commentsInitial] },
    initialPageParam: filters.page,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  const comments = useMemo(() => {
    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return pages;
  }, [data.pages]);

  return (
    <Fragment>
      <section
        className={cn("flex w-full flex-col gap-5 md:gap-10", {
          "opacity-50": isPending || isFetching,
        })}>
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            depth={0}
            comment={comment}
            elementId={elementId}
            jumpToPlusHighlight={jumpToPlusHighlight}
          />
        ))}
      </section>

      {!isPending && hasNextPage ? (
        <div className="mt-12 flex w-full items-center justify-center lg:mt-24 xl:mt-32">
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
    </Fragment>
  );
};
