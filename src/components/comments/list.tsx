"use client";

// REVIEWED - 11

import { QueryKey, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ArrowDownIcon, MessagesSquareIcon } from "lucide-react";
import { GeneratedTypes } from "payload";
import { Fragment, useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { useUser } from "@/hooks/use-user";
import { FiltersOptions } from "@/lib/types";
import { cn } from "@/lib/utils/styles";

import { Container } from "../globals/container";
import { Loading } from "../globals/loading";
import { SafeHydrate } from "../globals/safe-hydrate";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

import { CommentItem } from "./item";

export const CommentList = function CommentList({
  queryKey,
  filters,
  fieldsSearch,
}: {
  queryKey: QueryKey;
  filters: FiltersOptions;
  fieldsSearch: (keyof GeneratedTypes["collections"]["comments"])[];
}) {
  const { isLoading, data: user } = useUser();
  const { elementId, jumpToPlusHighlight } = useHashScroll();

  const { isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, data } =
    useSuspenseInfiniteQuery({
      queryKey,
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
      initialPageParam: filters.page,
      getNextPageParam: (lastPage) =>
        lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
    });

  const comments = useMemo(() => {
    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return pages;
  }, [data.pages]);

  if (comments.length === 0)
    return (
      <Container
        as="section"
        className={cn(
          "flex max-w-4xl flex-col px-0 lg:items-center lg:px-0 lg:text-center",
          { "pointer-events-none opacity-50": isFetching },
        )}>
        <div className="relative mb-6 flex w-max items-end lg:mb-8">
          <MessagesSquareIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
        </div>
        <SubSectionHeading small className="mb-4 lg:mb-6">
          No comments yet
        </SubSectionHeading>
        <Paragraph small>
          Be the first to contribute to this meaningful conversation. Your
          thoughtful words can provide comfort and foster solidarity with those
          sharing their experiences.
        </Paragraph>
      </Container>
    );

  return (
    <SafeHydrate
      isLoading={isLoading}
      isLoadingComponent={<Loading className="min-h-80" />}>
      <Fragment>
        <section
          className={cn("flex w-full flex-col gap-10", {
            "pointer-events-none opacity-50": isFetching,
          })}>
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              queryKey={queryKey}
              depth={0}
              user={user}
              comment={comment}
              elementId={elementId}
              jumpToPlusHighlight={jumpToPlusHighlight}
            />
          ))}
        </section>

        {hasNextPage ? (
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
    </SafeHydrate>
  );
};
