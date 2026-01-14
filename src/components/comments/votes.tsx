"use client";

// REVIEWED - 04
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { HTMLAttributes, useMemo } from "react";

import { useComment } from "@/hooks/use-comment";
import { cn } from "@/lib/utils/styles";
import { Comment, User } from "@/payload-types";

import { Button } from "../ui/button";

export const CommentVotes = function CommentVotes({
  user,
  comment,
  className,
}: {
  user: User | null | undefined;
  comment: Comment;
} & HTMLAttributes<HTMLDivElement>) {
  const { voteOnComment } = useComment(user);

  const userVote: false | "up" | "down" = useMemo(() => {
    if (!user || !comment.votes) return false;
    const vote = comment.votes.find(
      (voteElement) =>
        (typeof voteElement.user === "object"
          ? voteElement.user.id
          : voteElement.user) === user.id,
    );

    if (vote) return vote.vote;
    return false;
  }, [user, comment.votes]);

  const handleVote = (vote: "up" | "down") => {
    voteOnComment.mutate({ id: comment.id, vote });
  };

  return (
    <div
      className={cn(
        "col-start-1 row-start-4 row-end-4 flex h-full flex-row items-center justify-start gap-3 md:col-start-1 md:row-start-2 md:flex-col",
        className,
      )}>
      <Button
        variant="ghost"
        className={cn("p-1", { "ring-1 ring-input": userVote === "up" })}
        disabled={!user || voteOnComment.isPending}
        {...(user ? { onClick: () => handleVote("up") } : {})}>
        <ChevronUpIcon className="text-muted-foreground" />
      </Button>
      <span className="font-mono text-sm leading-none">
        {comment.votesScore || 0}
      </span>
      <Button
        variant="ghost"
        className={cn("p-1", { "ring-1 ring-input": userVote === "down" })}
        disabled={!user || voteOnComment.isPending}
        {...(user ? { onClick: () => handleVote("down") } : {})}>
        <ChevronDownIcon className="text-muted-foreground" />
      </Button>
    </div>
  );
};
