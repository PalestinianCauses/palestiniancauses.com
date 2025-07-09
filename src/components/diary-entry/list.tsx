// REVIEWED - 11

import Link from "next/link";
import { GeneratedTypes } from "payload";
import { cache, Suspense } from "react";
import linesSplit from "split-lines";

import { getCollection } from "@/actions/collection";
import { getDiaryEntryAuthor as getDiaryEntryAuthorAction } from "@/actions/diary-entry";
import { FiltersOptions } from "@/lib/types";
import { DiaryEntry, User } from "@/payload-types";

import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

import {
  DiaryEntryBadges,
  DiaryEntryBadgesLoading,
} from "./diary-entry-badges";

const DiaryEntryBadgesListItemLoading = (
  <div className="mb-4">
    <DiaryEntryBadgesLoading />
  </div>
);

const getDiaryEntries = cache(getCollection<"diary-entries">);
const getDiaryEntryAuthor = cache(getDiaryEntryAuthorAction);

export const DiaryEntryListItemBadges =
  async function DiaryEntryListItemBadges({
    diaryEntry,
  }: {
    diaryEntry: DiaryEntry;
  }) {
    let author: Partial<User> | null = null;

    if (!diaryEntry.isAnonymous) {
      const response = await getDiaryEntryAuthor(
        typeof diaryEntry.author === "object"
          ? diaryEntry.author.id
          : diaryEntry.author,
      );

      if (response.data) author = response.data;
    }

    return (
      <DiaryEntryBadges
        className="mb-4"
        isAnonymous={diaryEntry.isAnonymous}
        author={author}
        date={new Date(diaryEntry.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      />
    );
  };

export const DiaryEntryListItem = async function DiaryEntryListItem({
  diaryEntry,
}: {
  diaryEntry: DiaryEntry;
}) {
  return (
    <div className="relative border-l border-input pl-5 ring-0">
      <Suspense fallback={DiaryEntryBadgesListItemLoading}>
        <DiaryEntryListItemBadges diaryEntry={diaryEntry} />
      </Suspense>
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

export const DiaryEntryList = async function DiaryEntryList({
  filters,
  fieldsSearch,
}: {
  filters: FiltersOptions;
  fieldsSearch: (keyof GeneratedTypes["collections"]["diary-entries"])[];
}) {
  const diaryEntries = await getDiaryEntries({
    collection: "diary-entries",
    filters,
    fieldsSearch,
    depth: 0,
  });

  if (!diaryEntries.data || diaryEntries.error) return null;

  return diaryEntries.data.docs.map((diaryEntry) => (
    <DiaryEntryListItem key={diaryEntry.id} diaryEntry={diaryEntry} />
  ));
};
