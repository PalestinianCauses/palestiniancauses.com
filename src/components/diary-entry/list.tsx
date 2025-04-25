"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";
import { CalendarFoldIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GeneratedTypes } from "payload";
import { toast } from "sonner";

import { getCollection } from "@/actions/collection";
import { getAuthor } from "@/actions/diary-entry";
import { messages } from "@/lib/errors";
import { motions } from "@/lib/motion";
import { SelectOptions } from "@/lib/payload/types";
import { DiaryEntry } from "@/payload-types";

import { Loading } from "../globals/loading";
import { MotionDiv } from "../globals/motion";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

export const DiaryEntryListItem = function DiaryEntryListItem({
  diaryEntry: { id, title, date, content, author, isAnonymous },
}: {
  diaryEntry: DiaryEntry;
}) {
  const { data: authorData, isLoading } = useQuery({
    queryKey: ["author", author],
    queryFn: async () => {
      const authorResponse = await getAuthor(
        typeof author === "number" ? author : author.id,
      );

      if (!authorResponse) return null;

      return authorResponse;
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
      <div className="absolute -left-px top-0 h-6 w-px bg-foreground" />
      <div className="mb-4 flex flex-wrap items-center gap-5">
        <Paragraph className="flex items-center gap-2.5 text-sm font-medium leading-none text-foreground xl:text-base">
          <CalendarFoldIcon className="stroke-1.5 mb-0.5 h-5 w-5 shrink-0" />
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Paragraph>
        <Paragraph
          small
          className="flex items-center gap-2.5 text-sm font-medium leading-none text-foreground xl:text-base">
          <UserIcon className="stroke-1.5 mb-0.5 h-5 w-5 shrink-0" />
          {isLoading
            ? "Loading author..."
            : (isAnonymous && "By Anonymous") ||
              (authorData &&
                authorData.firstName &&
                ["By", authorData.firstName].join(" ")) ||
              "By Anonymous"}
        </Paragraph>
      </div>
      <SubSectionHeading as="h3" className="mb-6">
        {title}
      </SubSectionHeading>
      <Paragraph small className="mb-8 line-clamp-[8] sm:line-clamp-4">
        {content.slice(0, 550)}
      </Paragraph>
      <MotionDiv
        viewport={{ once: true }}
        initial={motions.fadeIn.initial}
        whileInView={motions.fadeIn.whileInView}
        transition={motions.transition({})}>
        <Button variant="default" asChild>
          <Link href={`/humans-but-from-gaza/${id}`}>Read more</Link>
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
  const router = useRouter();
  const { data: response, isLoading } = useQuery({
    queryKey: ["diary-entry", selects, fields],
    queryFn: async () => {
      const collectionResponse = await getCollection<"diary-entries">({
        collection: "diary-entries",
        selects,
        fields,
      });

      return collectionResponse;
    },
  });

  if (isLoading) return <Loading className="min-h-[20rem]" />;

  if (!response || !response.data || response.error) {
    toast.error(response?.error || messages.actions.collection.serverError);
    router.push("/");
    return null;
  }

  return response.data.docs.map((diaryEntry) => (
    <DiaryEntryListItem key={diaryEntry.id} diaryEntry={diaryEntry} />
  ));
};
