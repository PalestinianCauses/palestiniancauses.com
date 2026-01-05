// REVIEWED - 16

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  ArrowUpRightIcon,
  Calendar1Icon,
  ExternalLinkIcon,
  PencilOffIcon,
  UserIcon,
  VerifiedIcon,
} from "lucide-react";
import Link from "next/link";
import { PaginatedDocs } from "payload";
import { Fragment } from "react";
import linesSplit from "split-lines";

import { getDiaryEntryAuthor } from "@/actions/diary-entry";
import { hasAnyRole } from "@/lib/permissions";
import { FiltersOptions } from "@/lib/types";
import { cn } from "@/lib/utils/styles";
import { DiaryEntry } from "@/payload-types";

import { Container } from "../globals/container";
import { SafeHydrate } from "../globals/safe-hydrate";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { StatusBadge } from "../profile/globals";
import { InformationBadges } from "../room/globals";
import { Button } from "../ui/button";

import { DiaryEntryBadgesLoading } from "./diary-entry-badges";

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

export const DiaryEntryListItemBadges = function DiaryEntryListItemBadges({
  diaryEntry,
}: {
  diaryEntry: DiaryEntry;
}) {
  const { isLoading, data: author } = useQuery({
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
    <SafeHydrate
      isLoading={isLoading}
      isLoadingComponent={DiaryEntryBadgesListItemLoading}>
      <div className="mb-5 flex flex-wrap items-center justify-start gap-x-2.5 gap-y-5">
        <InformationBadges
          className="mb-0 w-max"
          itemClassName="items-center grid-cols-[max-content,_auto]"
          badges={[
            { icon: Calendar1Icon, label: formatDate(diaryEntry.date) },
            {
              icon: UserIcon,
              label: (
                <Link
                  href={author ? `/user/${author.id}/diary-entries` : "#"}
                  className="flex items-center justify-start gap-2.5">
                  By{" "}
                  {diaryEntry.isAnonymous
                    ? "Anonymous"
                    : author?.firstName || "Anonymous"}
                  <ExternalLinkIcon className="size-4" />
                </Link>
              ),
            },
          ]}
        />

        {hasAnyRole(author || null, [
          "admin-user",
          "system-user",
          "author-user",
        ]) ? (
          <StatusBadge
            label={
              <Fragment>
                <VerifiedIcon className="size-5 stroke-[1.5]" />
                Author in PalestinianCauses
              </Fragment>
            }
            className="border-tertiary-2/10 bg-tertiary-2/10 py-1.5 text-tertiary-2 hover:bg-tertiary-2/10"
          />
        ) : null}
      </div>
    </SafeHydrate>
  );
};

export const DiaryEntryListItem = function DiaryEntryListItem({
  diaryEntry,
}: {
  diaryEntry: DiaryEntry;
}) {
  return (
    <div className="relative">
      <DiaryEntryListItemBadges diaryEntry={diaryEntry} />
      <SubSectionHeading as="h3" className="mb-3">
        {diaryEntry.title}
      </SubSectionHeading>
      <Paragraph small className="mb-6 line-clamp-[8] sm:line-clamp-4">
        {linesSplit(diaryEntry.content).filter(Boolean).join(" ")}
      </Paragraph>
      <Button variant="default" asChild>
        <Link href={`/humans-but-from-gaza/${diaryEntry.id}`}>
          <ArrowUpRightIcon />
          Read more
        </Link>
      </Button>
    </div>
  );
};

export const DiaryEntryList = function DiaryEntryList({
  diaryEntries,
  search,
}: {
  diaryEntries: PaginatedDocs<DiaryEntry> | null;
} & Pick<FiltersOptions, "search">) {
  if (!diaryEntries || diaryEntries.docs.length === 0)
    return (
      <Container
        as="section"
        className={cn(
          "flex flex-col px-0 lg:max-w-4xl lg:items-center lg:px-0 lg:text-center",
        )}>
        <div className="relative mb-5 flex w-max items-end lg:mb-10">
          <PencilOffIcon className="relative h-12 w-12 stroke-[1] lg:h-20 lg:w-20" />
        </div>
        <SubSectionHeading as="h3" small className="mb-2.5 lg:mb-5">
          No diary entries {search ? `for "${search}"` : "yet"}
        </SubSectionHeading>
        <Paragraph small>
          Be the first to share a diary entry{" "}
          {search ? `about "${search}"` : ""} and let your voice be heard. By
          sharing your story, you can inspire empathy, foster solidarity, and
          bring hope to others in our community. Your words matter—help us build
          a space where every experience is valued and every voice is heard.
        </Paragraph>
      </Container>
    );

  return diaryEntries.docs.map((diaryEntry) => (
    <DiaryEntryListItem key={diaryEntry.id} diaryEntry={diaryEntry} />
  ));
};
