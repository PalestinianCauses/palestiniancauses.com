"use client";

// REVIEWED

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { HTMLAttributes, useMemo } from "react";

import { cn } from "@/lib/utils/styles";
import { Comment, User } from "@/payload-types";

import { Button } from "../ui/button";

export const CommentVotes = function CommentVotes({
  user,
  comment,
  className,
}: {
  user: User | null;
  comment: Comment;
} & HTMLAttributes<HTMLDivElement>) {
  const votes = useMemo(() => {
    if (!comment.votes) return { upVotes: [], downVotes: [], votesNumber: 0 };
    const upVotes = comment.votes.filter((vote) => vote.vote === "up");
    const downVotes = comment.votes.filter((vote) => vote.vote === "down");
    return {
      upVotes,
      downVotes,
      votesNumber: upVotes.length - downVotes.length,
    };
  }, [comment.votes]);

  return user ? (
    <div
      className={cn(
        "col-start-1 row-start-4 row-end-4 flex h-full flex-row items-center justify-start gap-2.5 md:col-start-1 md:row-start-2 md:flex-col",
        className,
      )}>
      <Button variant="ghost" className="p-1">
        <ChevronUpIcon className="text-muted-foreground" />
      </Button>
      <span className="font-mono text-sm leading-none">
        {votes.votesNumber}
      </span>
      <Button variant="ghost" className="p-1">
        <ChevronDownIcon className="text-muted-foreground" />
      </Button>
    </div>
  ) : null;
};
