"use client";

// REVIEWED - 07

import {
  ArrowUpRightIcon,
  MessageSquareDotIcon,
  MessageSquareIcon,
  MessageSquareOffIcon,
  MessageSquarePlusIcon,
  MessagesSquareIcon,
} from "lucide-react";
import Link from "next/link";

import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { Comment } from "@/payload-types";

import { CommentItem } from "../comments/item";
import { Paragraph, SubSectionHeading } from "../globals/typography";
import { Button } from "../ui/button";

import { StatCard, StatusBadge } from "./globals";

export const ActivityComments = function ActivityComments({
  comments,
}: {
  comments: Comment[];
}) {
  const total = comments.length;
  const approved = comments.filter(
    (comment) => comment.status === "approved",
  ).length;
  const pending = comments.filter(
    (comment) => comment.status === "pending",
  ).length;
  const rejected = comments.filter(
    (comment) => comment.status === "rejected",
  ).length;
  return (
    <div className="space-y-10">
      <div className="space-y-0.5">
        <SubSectionHeading
          as="h2"
          className="flex items-center gap-2.5 text-xl !leading-none lg:text-xl lg:!leading-none xl:text-xl xl:!leading-none">
          <MessagesSquareIcon className="size-6 stroke-[1.5]" />
          Comments Activity
        </SubSectionHeading>
        <Paragraph className="text-base lg:text-base">
          Your comments and their status across our platform
        </Paragraph>
      </div>

      <div className="!mb-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          color="blue"
          label="Total"
          value={total}
          icon={MessageSquareIcon}
        />

        <StatCard
          color="green"
          label="Approved"
          value={approved}
          icon={MessageSquarePlusIcon}
        />

        <StatCard
          color="yellow"
          label="Pending"
          value={pending}
          icon={MessageSquareDotIcon}
        />

        <StatCard
          color="red"
          label="Rejected"
          value={rejected}
          icon={MessageSquareOffIcon}
        />
      </div>

      <section className={cn("flex w-full flex-col gap-5", {})}>
        {comments.map((comment) => (
          <div key={comment.id} className="border border-input/50 p-5">
            <div className="mb-5 flex flex-wrap items-center gap-x-2.5 gap-y-5">
              <StatusBadge
                label={comment.status}
                className={cn({
                  "border-tertiary-2/10 bg-tertiary-2/10 text-tertiary-2 hover:bg-tertiary-2/10":
                    comment.status === "approved",
                  "border-yellow-500/10 bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/10":
                    comment.status === "pending",
                  "border-secondary/10 bg-secondary/10 text-secondary hover:bg-secondary/10":
                    comment.status === "rejected",
                })}
              />

              {comment.parent ? (
                <StatusBadge
                  label="A reply to a comment"
                  className="border-tertiary/10 bg-tertiary/10 text-tertiary hover:bg-tertiary/10"
                />
              ) : null}

              {isObject(comment.on.value) ? (
                <Button
                  variant="link"
                  className="p-0 text-muted-foreground hover:text-foreground"
                  asChild>
                  <Link
                    href={`/${comment.on.relationTo === "diary-entries" ? "humans-but-from-gaza" : "blog"}/${comment.on.value.id}`}>
                    <ArrowUpRightIcon />
                    Commented on{" "}
                    <span className="text-foreground">
                      {comment.on.value.title.slice(0, 24)}
                      {comment.on.value.title.length > 24 ? "..." : ""}
                    </span>
                  </Link>
                </Button>
              ) : null}
            </div>
            <CommentItem page="private-profile" comment={comment} depth={0} />
          </div>
        ))}
      </section>
    </div>
  );
};
