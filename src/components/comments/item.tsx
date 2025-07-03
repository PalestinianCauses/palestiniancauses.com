"use client";

// REVIEWED - 03

import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {
  ArrowDownIcon,
  CornerDownRightIcon,
  DotIcon,
  MessageSquareTextIcon,
  Trash2Icon,
  VerifiedIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, MutableRefObject, useMemo, useState } from "react";

import { getCollection } from "@/actions/collection";
import { useComment } from "@/hooks/use-comment";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils/styles";
import { Comment } from "@/payload-types";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

import { ReplyCommentForm } from "./forms/reply";
import { CommentVotes } from "./votes";

export type CommentItemProps = {
  isPageComment?: boolean;
  depth: number;
  comment: Comment;
  elementId: MutableRefObject<string | null>;
  // eslint-disable-next-line no-unused-vars
  jumpToPlusHighlight: (id: string) => void;
};

export const CommentItem = function CommentItem({
  isPageComment = false,
  depth,
  comment,
  elementId,
  jumpToPlusHighlight,
}: CommentItemProps) {
  TimeAgo.addLocale(en);

  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: user } = useUser();
  const { deleteComment } = useComment();

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(
    Number(comment.repliesCount) === 0 && isPageComment,
  );

  const [isRepliesOpen, setIsRepliesOpen] = useState(
    Boolean(comment.repliesCount && isPageComment),
  );

  const [repliesCount, setRepliesCount] = useState(comment.repliesCount);

  const isMaxDepth = depth >= 3;

  const {
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["comment-replies", comment.id],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCollection({
        collection: "comments",
        filters: {
          page: pageParam,
          limit: 5,
          sort: "createdAt",
          fields: {
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
        },
        fieldsSearch: ["user", "content", "createdAt"],
        depth: 2,
      });

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
    enabled: isRepliesOpen,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage && lastPage.hasNextPage ? lastPage.nextPage : undefined,
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

  const replies = useMemo(() => {
    if (!data) return [];

    const pages = data.pages.flatMap((page) => (page ? page.docs : []));

    setRepliesCount(pages.length);

    return pages;
  }, [data]);

  return (
    <article
      className={cn("relative flex flex-col items-start justify-start gap-10")}>
      <div
        id={`comment-${comment.id}`}
        style={{ scrollMarginTop: `${5}rem` }}
        className={cn(
          "relative grid w-full grid-cols-[2rem_1fr] flex-col content-center items-start justify-start gap-x-2.5 gap-y-5 before:absolute before:-inset-2.5 before:-z-10 before:bg-transparent md:grid-cols-[2.25rem_1fr_auto] md:grid-rows-[2.25rem_1fr_auto]",
          { highlight: elementId.current === `comment-${comment.id}` },
          (user && "grid-rows-[repeat(4,auto)]") ||
            "grid-rows-[repeat(3,auto)]",
        )}>
        <div className="relative col-start-1 row-start-1 h-full w-full">
          {depth > 0 ? (
            <div className="absolute -left-4 top-1/2 h-px w-4 -translate-y-1/2 bg-input md:-left-12 md:w-12" />
          ) : null}

          <Avatar className="aspect-square h-auto w-full ring-1 ring-input">
            <AvatarFallback className="bg-muted/50">
              {author.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="col-start-2 row-start-1 flex h-full w-full items-center justify-start">
          <h3 className="flex items-center justify-start gap-1.5 text-base font-medium leading-none">
            {author}
            {typeof comment.user === "object" &&
            (comment.user.role === "admin" ||
              comment.user.role === "system-user") ? (
              <span>
                <VerifiedIcon className="h-4 w-4" />
              </span>
            ) : null}
          </h3>
          <DotIcon className="h-5 w-5 text-input" />
          <Button
            variant="ghost"
            className="p-0 text-muted-foreground hover:bg-transparent"
            asChild>
            <Link href={`/comment/${comment.id}`}>
              <time dateTime={comment.createdAt}>
                {new TimeAgo("en-US").format(new Date(comment.createdAt))}
              </time>
            </Link>
          </Button>
        </div>

        <CommentVotes user={user} comment={comment} />

        <div className="col-start-1 col-end-3 row-start-2 h-full w-full md:col-start-2">
          <p className="text-base font-normal leading-relaxed text-foreground md:text-lg">
            {comment.content}
          </p>
        </div>

        <div className="col-start-1 col-end-3 row-start-3 flex w-full flex-col items-start justify-start gap-2.5 md:col-start-2 md:flex-row md:items-center md:gap-5">
          {!user ? (
            <Button
              variant="ghost"
              className="p-0 text-muted-foreground hover:bg-transparent"
              asChild>
              <Link href="/signin">
                <CornerDownRightIcon className="stroke-[1.5]" />
                Join this conversation — sign in to reply!
              </Link>
            </Button>
          ) : null}

          {user ? (
            <Button
              variant="ghost"
              className="p-0 text-muted-foreground hover:bg-transparent"
              onClick={() => setIsReplyFormOpen((previous) => !previous)}>
              {isReplyFormOpen ? (
                <Fragment>
                  <XIcon className="stroke-[1.5]" />
                  Cancel reply
                </Fragment>
              ) : (
                <Fragment>
                  <CornerDownRightIcon className="stroke-[1.5]" />
                  Reply
                </Fragment>
              )}
            </Button>
          ) : null}

          {/* eslint-disable-next-line no-nested-ternary */}
          {repliesCount !== 0 ? (
            isMaxDepth ? (
              <Button
                variant="ghost"
                className="p-0 text-muted-foreground hover:bg-transparent"
                asChild>
                <Link href={`/comment/${comment.id}`}>
                  <MessageSquareTextIcon className="stroke-[1.5]" />
                  Continue this thread
                  <span className="mt-0.5 font-mono">({repliesCount})</span>
                </Link>
              </Button>
            ) : (
              <Button
                variant="ghost"
                className="p-0 text-muted-foreground hover:bg-transparent"
                disabled={isFetching}
                onClick={() => setIsRepliesOpen((previous) => !previous)}>
                <MessageSquareTextIcon className="stroke-[1.5]" />
                {(isFetching && "Loading replies...") ||
                  (isRepliesOpen && "Hide replies") ||
                  "Show replies"}
                <span className="mt-0.5 font-mono">({repliesCount})</span>
              </Button>
            )
          ) : null}

          {user &&
          user.id ===
            (typeof comment.user === "object"
              ? comment.user.id
              : comment.user) ? (
            <Button
              variant="ghost"
              className="p-0 text-muted-foreground hover:bg-transparent"
              disabled={deleteComment.isPending}
              onClick={() =>
                deleteComment.mutate(comment.id, {
                  onSuccess: () => {
                    if (comment.parent)
                      queryClient.invalidateQueries({
                        queryKey: [
                          "comment-replies",
                          typeof comment.parent === "object"
                            ? comment.parent.id
                            : comment.parent,
                        ],
                      });
                    else
                      queryClient.invalidateQueries({
                        queryKey: [
                          `comments-${comment.on.relationTo}-${typeof comment.on.value === "object" ? comment.on.value.id : comment.on.value}`,
                        ],
                      });

                    if (isPageComment)
                      router.push(
                        `/${comment.on.relationTo === "diary-entries" ? "humans-but-from-gaza" : "blog"}/${typeof comment.on.value === "object" ? comment.on.value.id : comment.on.value}`,
                      );
                  },
                })
              }>
              <Trash2Icon className="stroke-[1.5]" />
              {deleteComment.isPending ? "Deleting..." : "Delete"}
            </Button>
          ) : null}

          {!isPageComment &&
          comment.parent &&
          typeof comment.parent === "object" &&
          typeof comment.parent.user === "object" ? (
            <Fragment>
              <DotIcon className="-mx-4 hidden h-5 w-5 text-muted-foreground/50 md:block" />
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

      {isReplyFormOpen && (
        <ReplyCommentForm
          on={comment.on}
          parent={comment.id}
          onSuccess={() => {
            if (isMaxDepth) {
              queryClient.invalidateQueries({
                queryKey: ["comment-replies", comment.id],
              });

              router.push(`/comment/${comment.id}`);
            } else {
              refetch();
              setIsReplyFormOpen(false);
              setIsRepliesOpen(true);
            }
          }}
        />
      )}

      {isRepliesOpen ? (
        <section
          className={cn(
            "relative flex w-full flex-col gap-5 pl-4 md:gap-10 md:pl-12",
            {
              "opacity-50": isPending || isFetching,
            },
          )}>
          <div className="absolute left-0 top-0 h-full w-px -translate-x-1/2 bg-input" />

          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              depth={depth + 1}
              comment={reply}
              elementId={elementId}
              jumpToPlusHighlight={jumpToPlusHighlight}
            />
          ))}

          {!isPending && hasNextPage ? (
            <div className="mt-6 flex w-full items-center justify-center lg:mt-12 xl:mt-16">
              <Button
                variant="link"
                disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}>
                {isFetchingNextPage
                  ? "Loading more replies..."
                  : "Read more replies"}
                <ArrowDownIcon />
              </Button>
            </div>
          ) : null}
        </section>
      ) : null}
    </article>
  );
};
