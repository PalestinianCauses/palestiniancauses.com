"use client";

// REVIEWED - 01

import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { HTMLAttributes, useMemo, useState } from "react";

import { useComment } from "@/hooks/use-comment";
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
  const { voteOnComment } = useComment();

  const [votesScore, setVotesScore] = useState(comment.votesScore || 0);

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
    voteOnComment.mutate(
      { id: comment.id, vote },
      {
        onSuccess: (response) => {
          if (!response.data || response.error) {
            setVotesScore(comment.votesScore || 0);
            return;
          }

          setVotesScore(response.data.votesScore || 0);
        },
      },
    );
  };

  return (
    <div
      className={cn(
        "col-start-1 row-start-4 row-end-4 flex h-full flex-row items-center justify-start gap-3 md:col-start-1 md:row-start-2 md:flex-col",
        { "pointer-events-none opacity-50": voteOnComment.isPending },
        className,
      )}>
      <Button
        variant="ghost"
        className={cn("p-1", { "ring-1 ring-input": userVote === "up" })}
        disabled={!user || voteOnComment.isPending}
        {...(user ? { onClick: () => handleVote("up") } : {})}>
        <ChevronUpIcon className="text-muted-foreground" />
      </Button>
      <span className="font-mono text-sm leading-none">{votesScore}</span>
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
