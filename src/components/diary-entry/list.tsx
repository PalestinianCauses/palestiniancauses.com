"use client";

// REVIEWED - 02

import { useQuery } from "@tanstack/react-query";
import { FileDiffIcon } from "lucide-react";
import Link from "next/link";
import { GeneratedTypes } from "payload";

import { getCollection } from "@/actions/collection";
import { getDiaryEntryAuthor } from "@/actions/diary-entry";
import { motions } from "@/lib/motion";
import { SelectOptions } from "@/lib/payload/types";
import { cn, splitByFlexibleNewLines } from "@/lib/utils";
import { DiaryEntry } from "@/payload-types";

import { Container } from "../globals/container";
import { MotionDiv } from "../globals/motion";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

import { DiaryEntryBadges } from "./diary-entry-badges";

export const DiaryEntryListItem = function DiaryEntryListItem({
  diaryEntry: { id, title, date, content, author, isAnonymous },
}: {
  diaryEntry: DiaryEntry;
}) {
  const { data: authorData, isLoading } = useQuery({
    queryKey: ["author", typeof author === "number" ? author : author.id],
    queryFn: async () => {
      const response = await getDiaryEntryAuthor(
        typeof author === "number" ? author : author.id,
      );

      if (!response.data || response.error) return null;

      return response.data;
    },
    enabled: !isAnonymous,
  });

  return (
    <MotionDiv
      viewport={{ once: true }}
      initial={motions.fadeIn.initial}
      whileInView={motions.fadeIn.whileInView}
      transition={motions.transition({})}
      className="relative border-l border-input pl-5 ring-0">
      {isLoading ? (
        <div className={cn("flex items-center gap-2.5 md:gap-5")}>
          <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
          <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
        </div>
      ) : (
        <DiaryEntryBadges
          isAnonymous={isAnonymous}
          date={date}
          author={authorData}
          className="mb-4"
        />
      )}
      <SubSectionHeading as="h3" className="mb-4">
        {title}
      </SubSectionHeading>
      <Paragraph small className="mb-8 line-clamp-[8] sm:line-clamp-4">
        {splitByFlexibleNewLines(content).slice(0, 2).join(" ")}
      </Paragraph>
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        whileInView={motions.fadeIn.whileInView}
        transition={motions.transition({})}>
        <Button variant="default" asChild>
          <Link
            href={[
              `/humans-but-from-gaza/${id}`,
              "?",
              "author",
              "=",
              typeof author === "number" ? author : author.id,
            ].join("")}>
            Read more
          </Link>
        </Button>
      </MotionDiv>
    </MotionDiv>
  );
};

export const DiaryEntryList = function DiaryEntryList({
  selects,
  fields,
}: {
  selects: SelectOptions;
  fields: (keyof GeneratedTypes["collections"]["diary-entries"])[];
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["diary-entry", selects, fields],
    queryFn: async () => {
      const response = await getCollection<"diary-entries">({
        collection: "diary-entries",
        selects,
        fields,
      });

      if (!response.data || response.error) return null;

      return response.data;
    },
  });

  if (isLoading)
    return [1, 2, 3].map((id) => (
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        whileInView={motions.fadeIn.whileInView}
        transition={motions.transition({})}
        key={id}
        className="flex flex-col">
        <div className="mb-4 flex items-center gap-2.5 md:gap-5">
          <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
          <Skeleton className="h-5 w-full max-w-24 md:max-w-32 xl:max-w-40" />
        </div>
        <Skeleton className="mb-6 h-8 w-full max-w-sm md:max-w-md xl:max-w-lg" />
        <div className="mb-8 flex flex-col items-start gap-3">
          <Skeleton className="h-3 w-full max-w-2xl md:max-w-3xl xl:max-w-4xl" />
          <Skeleton className="h-3 w-full max-w-xl md:max-w-2xl xl:max-w-3xl" />
          <Skeleton className="h-3 w-full max-w-3xl md:max-w-4xl xl:max-w-5xl" />
          <Skeleton className="h-3 w-full max-w-lg md:max-w-xl xl:max-w-2xl" />
        </div>
        <Skeleton className="h-8 w-28" />
      </MotionDiv>
    ));

  if (!data || !data.docs.length)
    return (
      <Container className="flex max-w-4xl flex-col px-0 py-12 lg:items-center lg:py-24 lg:text-center xl:py-32">
        <MotionDiv
          viewport={{ once: true }}
          initial={motions.fadeIn.initial}
          whileInView={motions.fadeIn.whileInView}
          transition={motions.transition({})}
          className="relative mb-6 flex w-max items-end lg:mb-8">
          <FileDiffIcon className="relative h-20 w-20 stroke-[1] lg:h-28 lg:w-28" />
        </MotionDiv>
        <SubSectionHeading className="mb-4 lg:mb-6">
          Diary entries are being reviewed...
        </SubSectionHeading>
        <Paragraph small>
          We are currently reviewing submissions and have not approved any diary
          entries just yet. Please check back soon to read the first-hand
          accounts from individuals in Gaza. We appreciate your patience and
          interest in learning more about their experiences. If you would like
          to contribute, you can share your own diary entry.
        </Paragraph>
      </Container>
    );

  return data.docs.map((diaryEntry) => (
    <DiaryEntryListItem key={diaryEntry.id} diaryEntry={diaryEntry} />
  ));
};
