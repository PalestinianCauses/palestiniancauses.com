"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  DotIcon,
  MessageSquareReply,
  MessageSquareText,
  MessageSquareX,
  VerifiedIcon,
} from "lucide-react";
import Link from "next/link";
import { GeneratedTypes } from "payload";
import { Fragment, useMemo, useState } from "react";

import { getCollection } from "@/actions/collection";
import { useHashScroll } from "@/hooks/use-hash-scroll";
import { useUser } from "@/hooks/use-user";
import { SelectOptions } from "@/lib/types";
import { cn } from "@/lib/utils/styles";
import { Comment } from "@/payload-types";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

const INDENT_SIZE = 3.25;

export const CommentItem = function CommentItem({
  comment,
  depth,
}: {
  comment: Comment;
  depth: number;
}) {
  TimeAgo.addLocale(en);

  const { data: user } = useUser();

  const { elementId, jumpToPlusHighlight } = useHashScroll();

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(false);
  const [isRepliesOpen, setIsRepliesOpen] = useState(false);

  const { isPending, data: replies } = useQuery({
    queryKey: ["comment", comment.id],
    queryFn: async () => {
      const response = await getCollection({
        collection: "comments",
        selects: {
          page: 1,
          limit: 10,
          sort: "createdAt",
          fields: [
            {
              on: {
                equals: {
                  relationTo: comment.on.relationTo,
                  value:
                    typeof comment.on.value === "object"
                      ? comment.on.value.id
                      : comment.on.value,
                },
              },
              parent: {
                equals: comment.id,
              },
            },
          ],
        },
        fields: ["user", "content", "createdAt"],
        depth: 2,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
  });

  const author = useMemo(() => {
    if (
      !comment.user ||
      typeof comment.user !== "object" ||
      !comment.user.firstName
    )
      return "Anonymous";

    return comment.user.firstName;
  }, [comment.user]);

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

  return (
    <article
      className={cn("relative flex flex-col items-start justify-start gap-5")}
      style={{
        margin: `${depth * 1.25}rem 0 ${depth * 1.25}rem ${depth * INDENT_SIZE}rem`,
      }}>
      <div
        id={`comment-${comment.id}`}
        className={cn(
          "grid w-full grid-cols-[2.5rem_1fr] grid-rows-[2.5rem_1fr_auto] flex-col content-center items-start justify-start gap-x-3 gap-y-5 p-2.5",
          { highlight: elementId.current === `comment-${comment.id}` },
        )}
        style={{ scrollMarginTop: `${5}rem` }}>
        <div className="col-start-1 row-start-1 h-full w-full">
          <Avatar className="ring-1 ring-primary/20">
            <AvatarFallback className="bg-muted/40">
              {author.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="col-start-2 row-start-1 flex h-full w-full items-center justify-start gap-1">
          <h3 className="flex items-center justify-start gap-1.5 text-base font-medium leading-none">
            {author}
            <span>
              {typeof comment.user === "object" &&
              (comment.user.role === "admin" ||
                comment.user.role === "system-user") ? (
                <VerifiedIcon className="h-5 w-5" />
              ) : null}
            </span>
          </h3>
          <DotIcon className="h-5 w-5 text-muted-foreground/50" />
          <time
            dateTime={comment.createdAt}
            className="text-sm font-normal leading-none text-muted-foreground">
            {new TimeAgo("en-US").format(new Date(comment.createdAt))}
          </time>
        </div>
        <div className="col-start-1 row-start-2 row-end-4 flex h-full flex-col items-center justify-start gap-2.5">
          {user ? (
            <Fragment>
              <Button variant="ghost" className="p-1">
                <ChevronUpIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
              <span className="font-mono text-sm leading-none">
                {votes.votesNumber}
              </span>
              <Button variant="ghost" className="p-1">
                <ChevronDownIcon className="h-5 w-5 text-muted-foreground" />
              </Button>
            </Fragment>
          ) : null}
        </div>
        <div className="span-start-2 col-start-2 h-full w-full">
          <p className="text-lg font-normal leading-relaxed text-foreground">
            {comment.content}
          </p>
        </div>
        <div className="col-start-2 row-start-3 flex w-full items-center justify-start gap-5">
          {!user ? (
            <Button
              variant="ghost"
              className="p-0 text-muted-foreground hover:bg-transparent"
              asChild>
              <Link href="/signin">
                <MessageSquareReply className="mt-0.5 !h-5 !w-5 stroke-[1.5]" />
                Join the conversation — sign in to reply!
              </Link>
            </Button>
          ) : null}
          {user ? (
            <Button
              variant="ghost"
              className="p-0 text-muted-foreground hover:bg-transparent"
              onClick={() => setIsReplyFormOpen((previous) => !previous)}>
              {isReplyFormOpen ? (
                <MessageSquareX className="mt-0.5 !h-5 !w-5 stroke-[1.5]" />
              ) : (
                <MessageSquareReply className="mt-0.5 !h-5 !w-5 stroke-[1.5]" />
              )}
              {isReplyFormOpen ? "Cancel reply" : "Reply"}
            </Button>
          ) : null}
          {!isPending && replies && replies.docs.length !== 0 ? (
            <Button
              variant="ghost"
              className="p-0 text-muted-foreground hover:bg-transparent"
              onClick={() => setIsRepliesOpen((previous) => !previous)}>
              <MessageSquareText className="mt-0.5 !h-5 !w-5 stroke-[1.5]" />
              {isRepliesOpen ? (
                <Fragment>
                  Hide replies{" "}
                  <span className="mt-0.5 font-mono">
                    ({replies.docs.length})
                  </span>
                </Fragment>
              ) : (
                <Fragment>
                  Show replies{" "}
                  <span className="mt-0.5 font-mono">
                    ({replies.docs.length})
                  </span>
                </Fragment>
              )}
            </Button>
          ) : null}
          {comment.parent &&
          typeof comment.parent === "object" &&
          typeof comment.parent.user === "object" ? (
            <Fragment>
              <DotIcon className="-mx-4 h-5 w-5 text-muted-foreground/50" />
              <p className="text-sm tracking-wide text-muted-foreground">
                Replying to{" "}
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => {
                    if (comment.parent) {
                      const commentId = `comment-${typeof comment.parent === "object" ? comment.parent.id : comment.parent}`;
                      jumpToPlusHighlight(commentId);
                    }
                  }}>
                  {comment.parent.user.firstName}
                </Button>
              </p>
            </Fragment>
          ) : null}
        </div>
      </div>
      {isRepliesOpen && !isPending && replies && replies.docs.length !== 0 ? (
        <section className="flex w-full flex-col gap-10">
          {replies.docs.map((reply) => (
            <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </section>
      ) : null}
    </article>
  );
};

export const CommentList = function CommentList({
  selects,
  fields,
}: {
  selects: SelectOptions;
  fields: (keyof GeneratedTypes["collections"]["comments"])[];
}) {
  const { isFetching, data: comments } = useQuery({
    queryKey: ["comments", selects, fields],
    queryFn: async () => {
      const response = await getCollection({
        collection: "comments",
        selects,
        fields,
        depth: 1,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    placeholderData: (previous) => previous,
    refetchOnWindowFocus: false,
  });

  if (!comments || comments.docs.length === 0) return null;

  return (
    <section
      className={cn("flex w-full flex-col gap-10", {
        "opacity-50": isFetching && comments.docs.length !== 0,
      })}>
      {comments.docs.map((comment) => (
        <CommentItem key={comment.id} comment={comment} depth={0} />
      ))}
    </section>
  );
};
