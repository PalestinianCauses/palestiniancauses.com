// REVIEWED - 12

"use client";

import { useQuery } from "@tanstack/react-query";
import { PenToolIcon } from "lucide-react";
import Link from "next/link";
import { GeneratedTypes } from "payload";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import linesSplit from "split-lines";

import { getCollection } from "@/actions/collection";
import { getDiaryEntryAuthor } from "@/actions/diary-entry";
import { FiltersOptions } from "@/lib/types";
import { cn } from "@/lib/utils/styles";
import { DiaryEntry } from "@/payload-types";

import { Container } from "../globals/container";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

import {
  DiaryEntryBadges,
  DiaryEntryBadgesLoading,
} from "./diary-entry-badges";
import { DiaryEntryListLoading } from "./loading";

const DiaryEntryBadgesListItemLoading = (
  <div className="mb-4">
    <DiaryEntryBadgesLoading />
  </div>
);

const formatDate = (string: string) => {
  const date = new Date(string);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const SafeHydration = function SafeHydration({
  isLoadingComponent,
  children,
}: {
  isLoadingComponent: ReactNode;
  children: ReactNode;
}) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return isLoadingComponent;

  return children;
};

export const DiaryEntryListItemBadges = function DiaryEntryListItemBadges({
  diaryEntry,
}: {
  diaryEntry: DiaryEntry;
}) {
  const { isFetching, data: author } = useQuery({
    queryKey: ["diary-entry-author", diaryEntry.id],
    queryFn: async () => {
      const response = await getDiaryEntryAuthor(
        typeof diaryEntry.author === "object"
          ? diaryEntry.author.id
          : diaryEntry.author,
      );

      if (!response.data || response.error) return null;

      return response.data;
    },
    enabled: !diaryEntry.isAnonymous,
  });

  return (
    <SafeHydration isLoadingComponent={DiaryEntryBadgesListItemLoading}>
      {isFetching ? (
        DiaryEntryBadgesListItemLoading
      ) : (
        <DiaryEntryBadges
          className="mb-4"
          isAnonymous={diaryEntry.isAnonymous}
          author={author}
          date={formatDate(diaryEntry.date)}
        />
      )}
    </SafeHydration>
  );
};

export const DiaryEntryListItem = function DiaryEntryListItem({
  diaryEntry,
}: {
  diaryEntry: DiaryEntry;
}) {
  return (
    <div className="relative border-l border-input pl-5 ring-0">
      <DiaryEntryListItemBadges diaryEntry={diaryEntry} />
      <SubSectionHeading as="h3" className="mb-4">
        {diaryEntry.title}
      </SubSectionHeading>
      <Paragraph small className="mb-8 line-clamp-[8] sm:line-clamp-4">
        {linesSplit(diaryEntry.content).filter(Boolean).slice(0, 3).join(" ")}
      </Paragraph>
      <div>
        <Button variant="default" asChild>
          <Link href={`/humans-but-from-gaza/${diaryEntry.id}`}>Read more</Link>
        </Button>
      </div>
    </div>
  );
};

export const DiaryEntryList = function DiaryEntryList({
  filters,
  fieldsSearch,
}: {
  filters: FiltersOptions;
  fieldsSearch: (keyof GeneratedTypes["collections"]["diary-entries"])[];
}) {
  const queryKey = useMemo(
    () =>
      [
        "diary-entries",
        filters.page,
        filters.limit,
        (filters.sort &&
          (typeof filters.sort === "string"
            ? filters.sort
            : filters.sort.join(","))) ||
          undefined,
        filters.search,
        fieldsSearch.join(","),
      ].filter(Boolean),
    [filters, fieldsSearch],
  );

  const { isPending, isFetching, data } = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getCollection({
        collection: "diary-entries",
        filters,
        fieldsSearch,
        depth: 0,
      });

      if (!response.data || response.error) return null;

      return response.data;
    },
  });

  return (
    <SafeHydration isLoadingComponent={<DiaryEntryListLoading />}>
      {(() => {
        if (isPending || isFetching) return <DiaryEntryListLoading />;

        if (!data || data.docs.length === 0)
          return (
            <Container
              as="section"
              className={cn(
                "flex flex-col px-0 lg:max-w-4xl lg:items-center lg:px-0 lg:text-center",
              )}>
              <div className="relative mb-6 flex w-max items-end lg:mb-8">
                <PenToolIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
              </div>
              <SubSectionHeading small className="mb-4 lg:mb-6">
                No diary entries{" "}
                {filters.search ? `for "${filters.search}"` : "yet"}
              </SubSectionHeading>
              <Paragraph small>
                Be the first to share a diary entry and let your voice be heard.
                By sharing your story, you can inspire empathy, foster
                solidarity, and bring hope to others in our community. Your
                words matter—help us build a space where every experience is
                valued and every voice is heard.
              </Paragraph>
            </Container>
          );

        return data.docs.map((diaryEntry) => (
          <DiaryEntryListItem key={diaryEntry.id} diaryEntry={diaryEntry} />
        ));
      })()}
    </SafeHydration>
  );
};
