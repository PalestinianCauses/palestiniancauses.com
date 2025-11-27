"use client";

// REVIEWED - 01

import {
  QueryKey,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { format } from "date-fns";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  FileClockIcon,
  FilePlusIcon,
  FileTextIcon,
  FileX2Icon,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { getCollection } from "@/actions/collection";
import { getUserActivityDiaryEntriesStats } from "@/actions/user-activity-diary-entries";
import { useDiaryEntry } from "@/hooks/use-diary-entry";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils/styles";
import { DiaryEntry } from "@/payload-types";

import { SafeHydrate } from "../globals/safe-hydrate";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

// eslint-disable-next-line import/no-cycle
import { LoadingActivity } from "./activity";
import { StatCard, StatusBadge } from "./globals";

const DiaryEntryItem = function DiaryEntryItem({
  queryKey,
  diaryEntry,
}: {
  queryKey: QueryKey;
  diaryEntry: DiaryEntry;
}) {
  const queryClient = useQueryClient();
  const { deleteDiaryEntry } = useDiaryEntry();

  const isAnonymousLabel = diaryEntry.isAnonymous
    ? "Shared Anonymously"
    : "Shared Publicly";

  return (
    <div className="relative flex flex-col items-start justify-start border border-input/25 p-5">
      <div className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-5">
        <div className="mr-2.5 flex items-center gap-2.5">
          <CalendarIcon className="mb-0.5 size-5 stroke-[1.5]" />
          <p className="text-base font-medium leading-none text-foreground">
            Published on {format(diaryEntry.createdAt, "PPP")}
          </p>
        </div>

        <StatusBadge
          label={diaryEntry.status}
          className={cn({
            "border-tertiary-2/10 bg-tertiary-2/10 text-tertiary-2 hover:bg-tertiary-2/10":
              diaryEntry.status === "approved",
            "border-yellow-500/10 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
              diaryEntry.status === "pending",
            "border-secondary/10 bg-secondary/10 text-secondary hover:bg-secondary/10":
              diaryEntry.status === "rejected",
          })}
        />

        <StatusBadge
          label={isAnonymousLabel}
          className={cn({
            "border-tertiary/10 bg-tertiary/10 text-tertiary hover:bg-tertiary/10":
              !diaryEntry.isAnonymous,
            "border-teal-500/10 bg-teal-500/10 text-teal-500 hover:bg-teal-500/10":
              diaryEntry.isAnonymous,
          })}
        />
      </div>
      <SubSectionHeading as="h3" className="mb-10">
        {diaryEntry.title}
      </SubSectionHeading>
      <div className="mt-auto flex items-center gap-2.5">
        <Button
          variant="link"
          className="p-0 text-muted-foreground hover:text-foreground"
          disabled={deleteDiaryEntry.isPending}
          onClick={() =>
            deleteDiaryEntry.mutate(diaryEntry.id, {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey,
                  exact: true,
                });
              },
            })
          }>
          <Trash2Icon />
          {deleteDiaryEntry.isPending ? "Deleting..." : "Delete"}
        </Button>
        <Button
          variant="link"
          className="p-0 text-muted-foreground hover:text-foreground"
          asChild>
          <Link href={`/admin/collections/diary-entries/${diaryEntry.id}`}>
            <ArrowUpRightIcon />
            Manage in dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export const ActivityDiaryEntries = function ActivityDiaryEntries() {
  const { isLoading: isLoadingUser, data: user } = useUser();

  const { isLoading: isLoadingStats, data: stats } = useQuery({
    queryKey: ["user-activity-diary-entries-stats", user?.id],
    queryFn: async () => {
      const response = await getUserActivityDiaryEntriesStats();
      return response;
    },
    enabled: Boolean(user?.id),
    refetchOnWindowFocus: false,
  });

  const queryKey = useMemo(
    () => ["user-activity-diary-entries", user?.id],
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
        collection: "diary-entries",
        req: { user: { collection: "users", ...user } },
        user,
        filters: {
          page: pageParam,
          limit: 4,
          fields: { author: { equals: user.id } },
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
    refetchOnWindowFocus: false,
  });

  const { diaryEntries } = useMemo(() => {
    if (!data) return { diaryEntries: [] };

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));
    return { diaryEntries: pages };
  }, [data]);

  return (
    <SafeHydrate
      isLoading={isLoadingUser || isLoadingStats || isLoading}
      isLoadingComponent={LoadingActivity}>
      {(() => {
        if (
          !user ||
          !stats ||
          !stats.data ||
          stats.error ||
          !data ||
          diaryEntries.length === 0
        )
          return null;

        return (
          <div className="space-y-10">
            <div className="space-y-0.5">
              <SubSectionHeading
                as="h2"
                className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
                <PencilLineIcon className="size-6 stroke-[1.5]" />
                Diary Entries Activity
              </SubSectionHeading>
              <Paragraph className="text-base lg:text-base">
                Your stories and their status across our platform
              </Paragraph>
            </div>

            <div className="!mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                color="blue"
                label="Total"
                value={stats.data.total}
                icon={FileTextIcon}
              />

              <StatCard
                color="green"
                label="Approved"
                value={stats.data.approved}
                icon={FilePlusIcon}
              />

              <StatCard
                color="yellow"
                label="Pending"
                value={stats.data.pending}
                icon={FileClockIcon}
              />

              <StatCard
                color="red"
                label="Rejected"
                value={stats.data.rejected}
                icon={FileX2Icon}
              />
            </div>

            <section
              className={cn("grid grid-cols-1 gap-5 lg:grid-cols-2", {
                "pointer-events-none opacity-50": isFetching,
              })}>
              {diaryEntries.map((diaryEntry) => (
                <DiaryEntryItem
                  key={diaryEntry.id}
                  queryKey={queryKey}
                  diaryEntry={diaryEntry}
                />
              ))}
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
      })()}
    </SafeHydrate>
  );
};
