"use client";

// REVIEWED - 06

import { format } from "date-fns";
import {
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

import { useDiaryEntry } from "@/hooks/use-diary-entry";
import { cn } from "@/lib/utils/styles";
import { DiaryEntry } from "@/payload-types";

import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

import { StatCard, StatusBadge } from "./globals";

const DiaryEntryItem = function DiaryEntryItem({
  diaryEntry,
}: {
  diaryEntry: DiaryEntry;
}) {
  const { deleteDiaryEntry } = useDiaryEntry();

  const isAnonymousLabel = diaryEntry.isAnonymous
    ? "Shared Anonymously"
    : "Shared Publicly";

  return (
    <div className="relative flex flex-col items-start justify-start border border-input/50 p-5">
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
          onClick={() => deleteDiaryEntry.mutate(diaryEntry.id, {})}>
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

export const ActivityDiaryEntries = function ActivityDiaryEntries({
  diaryEntries,
}: {
  diaryEntries: DiaryEntry[];
}) {
  const total = diaryEntries.length;
  const approved = diaryEntries.filter(
    (diaryEntry) => diaryEntry.status === "approved",
  ).length;
  const pending = diaryEntries.filter(
    (diaryEntry) => diaryEntry.status === "pending",
  ).length;
  const rejected = diaryEntries.filter(
    (diaryEntry) => diaryEntry.status === "rejected",
  ).length;

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
          value={total}
          icon={FileTextIcon}
        />

        <StatCard
          color="green"
          label="Approved"
          value={approved}
          icon={FilePlusIcon}
        />

        <StatCard
          color="yellow"
          label="Pending"
          value={pending}
          icon={FileClockIcon}
        />

        <StatCard
          color="red"
          label="Rejected"
          value={rejected}
          icon={FileX2Icon}
        />
      </div>

      <section className={cn("grid grid-cols-1 gap-5 lg:grid-cols-2", {})}>
        {diaryEntries.map((diaryEntry) => (
          <DiaryEntryItem key={diaryEntry.id} diaryEntry={diaryEntry} />
        ))}
      </section>
    </div>
  );
};
