"use client";

// REVIEWED

import { useInfiniteQuery } from "@tanstack/react-query";
import { ArrowDownIcon, ArrowUpRightIcon, PencilOffIcon } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { DiaryEntryListItem } from "@/components/diary-entry/list";
import { DiaryEntryListLoading } from "@/components/diary-entry/loading";
import { Paragraph, SubSectionHeading } from "@/components/globals/typography";
import { Button } from "@/components/ui/button";
import { HumansButFromGazaPageLink } from "@/lib/utils/strings";
import { cn } from "@/lib/utils/styles";

export const DiaryEntriesList = function DiaryEntriesList({
  userId,
}: {
  userId: number;
}) {
  const queryKey = useMemo(
    () => ["public-user-diary-entries", userId],
    [userId],
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
      const response = await getCollection({
        collection: "diary-entries",
        filters: {
          page: pageParam,
          limit: 5,
          fields: {
            author: { equals: userId },
            status: { equals: "approved" },
          },
        },
        depth: 2,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
  });

  const { diaryEntries } = useMemo(() => {
    if (!data) return { diaryEntries: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { diaryEntries: pages };
  }, [data]);

  if (isLoading) return <DiaryEntryListLoading />;

  return (
    <div className="space-y-10">
      <section
        className={cn("grid grid-cols-1 gap-10", {
          "pointer-events-none opacity-50": isFetching,
        })}>
        {diaryEntries.length !== 0 ? (
          diaryEntries.map((diaryEntry) => (
            <DiaryEntryListItem key={diaryEntry.id} diaryEntry={diaryEntry} />
          ))
        ) : (
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-center text-center">
            <div className="relative mb-6 flex w-max items-end lg:mb-8">
              <PencilOffIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
            </div>
            <SubSectionHeading small className="mb-4 lg:mb-6">
              This user has not published any diary entries yet
            </SubSectionHeading>
            <Paragraph small className="mb-6 lg:mb-12">
              There are currently no diary entries available for this user.
              Explore other profiles or check back soon for new stories and
              authentic perspectives.
            </Paragraph>
            <Button variant="default" asChild>
              <Link href={HumansButFromGazaPageLink}>
                <ArrowUpRightIcon />
                Read more diary entries
              </Link>
            </Button>
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
              ? "Loading more diary entries..."
              : "Read more diary entries"}
            <ArrowDownIcon />
          </Button>
        </div>
      ) : null}
    </div>
  );
};
