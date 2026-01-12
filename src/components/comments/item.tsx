"use client";

// REVIEWED - 19

import {
  QueryKey,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

import { useComment, useCommentRepliesCount } from "@/hooks/use-comment";
import { useUser } from "@/hooks/use-user";
import { getPublicCollection } from "@/lib/api/public";
import { hasAnyRole } from "@/lib/permissions";
import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { Comment } from "@/payload-types";

import { UserAvatar } from "../globals/user-avatar";
import { Button } from "../ui/button";

import { ReplyCommentForm } from "./forms/reply";
import { CommentVotes } from "./votes";

export type CommentItemProps = {
  page?: "private-profile" | "public-profile" | "comment" | "none";
  queryKey?: QueryKey;
  depth: number;
  comment: Comment;
  elementId?: MutableRefObject<string | null>;
  // eslint-disable-next-line no-unused-vars
  jumpToPlusHighlight?: (id: string) => void;
};

TimeAgo.addLocale(en);

export const CommentItem = function CommentItem({
  page = "none",
  queryKey,
  depth,
  comment,
  elementId,
  jumpToPlusHighlight,
}: CommentItemProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Real database IDs are typically much smaller numbers
  const isOptimisticComment = comment.id > 1_000_000_000_000_000;

  const { isLoading: isLoadingUser, data: user } = useUser();
  const { deleteComment } = useComment(user);

  const { isLoading: isLoadingRepliesCount, data: repliesCount } =
    useCommentRepliesCount(comment.id);

  const [isReplyFormOpen, setIsReplyFormOpen] = useState(
    repliesCount === 0 && page === "comment",
  );

  const [isRepliesOpen, setIsRepliesOpen] = useState(
    repliesCount !== 0 && page === "comment",
  );

  const isMaximumDepth = depth >= 3;

  const {
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
  } = useInfiniteQuery({
    queryKey: ["comment-replies", comment.id],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPublicCollection<"comments">({
        collection: "comments",
        page: pageParam,
        limit: 5,
        sort: "createdAt",
        where: {
          on: {
            equals: {
              relationTo: comment.on.relationTo,
              value:
                typeof comment.on.value === "object"
                  ? comment.on.value.id
                  : comment.on.value,
            },
          },
          parent: { equals: comment.id },
        },
        depth: 2,
      });

      if (!response.data || response.error || response.data.docs.length === 0)
        return null;

      return response.data;
    },
    // Disable for optimistic comments (they have no replies yet)
    enabled: !isOptimisticComment && isRepliesOpen,
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

    const pages = data.pages.flatMap((pageElement) =>
      pageElement ? pageElement.docs : [],
    );

    return pages;
  }, [data]);

  const doDelete = () => {
    let parentId: number | undefined;
    if (comment.parent)
      parentId =
        typeof comment.parent === "object" ? comment.parent.id : comment.parent;

    deleteComment.mutate(
      { id: comment.id, parentId },
      {
        onSuccess: () => {
          if (parentId) {
            queryClient.invalidateQueries({
              queryKey: ["comment-replies", parentId],
              exact: true,
            });

            queryClient.invalidateQueries({
              queryKey: ["comment-replies-count", parentId],
              exact: true,
            });
          } else if (queryKey)
            queryClient.invalidateQueries({ queryKey, exact: true });
          else queryClient.invalidateQueries({ queryKey: ["comments"] });

          if (page === "comment") {
            const resourceSlug =
              comment.on.relationTo === "diary-entries"
                ? "humans-but-from-gaza"
                : "blog";

            const resourceId =
              typeof comment.on.value === "object"
                ? comment.on.value.id
                : comment.on.value;

            router.push(`/${resourceSlug}/${resourceId}`);
          }
        },
      },
    );
  };

  if (!isObject(comment.user)) return null;

  return (
    <article
      aria-labelledby={`comment-${comment.id}-author`}
      className={cn("relative flex flex-col items-start justify-start gap-10")}>
      <div
        id={`comment-${comment.id}`}
        style={{ scrollMarginTop: `${5}rem` }}
        className={cn(
          "relative grid w-full grid-cols-[2rem_1fr] grid-rows-[repeat(4,auto)] flex-col content-center items-start justify-start gap-x-2.5 gap-y-5 before:absolute before:-inset-2.5 before:-z-10 before:bg-transparent md:grid-cols-[2.25rem_1fr_auto] md:grid-rows-[2.25rem_1fr_auto]",
          {
            highlight:
              elementId && elementId.current === `comment-${comment.id}`,
          },
        )}>
        <Link
          href={`/user/${comment.user.id}`}
          className="relative col-start-1 row-start-1 h-full w-full">
          {depth > 0 ? (
            <div className="absolute -left-4 top-1/2 h-px w-4 -translate-y-1/2 bg-input md:-left-12 md:w-12" />
          ) : null}
          <UserAvatar user={comment.user} size="user-avatar" />
        </Link>

        <div className="col-start-2 row-start-1 flex h-full w-full items-center justify-start">
          <Link
            id={`comment-${comment.id}-author`}
            href={`/user/${comment.user.id}`}
            className="flex items-center justify-start gap-1.5 text-base font-medium leading-none">
            {author}
            {typeof comment.user === "object" &&
            hasAnyRole(comment.user, [
              "admin-user",
              "system-user",
              "author-user",
            ]) ? (
              <span>
                <VerifiedIcon className="h-4 w-4" />
              </span>
            ) : null}
          </Link>
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
              className={cn("p-0 text-muted-foreground hover:bg-transparent", {
                "pointer-events-none opacity-50": isLoadingUser,
              })}
              asChild>
              <Link href="/signin">
                <CornerDownRightIcon className="stroke-[1.5]" />
                {isLoadingUser
                  ? "Retrieving user details, please wait..."
                  : "Join this conversation — sign in to reply!"}
              </Link>
            </Button>
          ) : (
            <Button
              variant="ghost"
              disabled={isOptimisticComment}
              data-testid="comment-reply-button"
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
                  {isOptimisticComment ? "Syncing..." : "Reply"}
                </Fragment>
              )}
            </Button>
          )}

          {/* eslint-disable-next-line no-nested-ternary */}
          {!isLoadingRepliesCount && repliesCount && repliesCount !== 0 ? (
            isMaximumDepth ? (
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
                data-testid="comment-show-replies-button"
                className="p-0 text-muted-foreground hover:bg-transparent"
                disabled={isFetching}
                aria-expanded={isRepliesOpen}
                aria-controls={`comment-${comment.id}-replies`}
                onClick={() => setIsRepliesOpen((previous) => !previous)}>
                <MessageSquareTextIcon className="stroke-[1.5]" />
                {(isLoading && "Loading replies...") ||
                  (isRepliesOpen && "Hide replies") ||
                  "Show replies"}
                <span className="mt-0.5 font-mono">({repliesCount})</span>
              </Button>
            )
          ) : null}

          {page !== "public-profile" &&
          user &&
          user.id ===
            (typeof comment.user === "object"
              ? comment.user.id
              : comment.user) ? (
            <Button
              variant="ghost"
              disabled={deleteComment.isPending || isOptimisticComment}
              data-testid="comment-delete-button"
              className="p-0 text-muted-foreground hover:bg-transparent"
              onClick={doDelete}>
              <Trash2Icon className="stroke-[1.5]" />
              {deleteComment.isPending && "Deleting..."}
              {!deleteComment.isPending && isOptimisticComment && "Syncing..."}
              {!deleteComment.isPending && !isOptimisticComment && "Delete"}
            </Button>
          ) : null}

          {page !== "comment" &&
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
                      if (
                        page === "private-profile" ||
                        page === "public-profile"
                      )
                        router.push(
                          `/comment/${isObject(comment.parent) ? comment.parent.id : comment.parent}`,
                        );
                      else {
                        const commentId = `comment-${typeof comment.parent === "object" ? comment.parent.id : comment.parent}`;
                        if (jumpToPlusHighlight) jumpToPlusHighlight(commentId);
                      }
                    }
                  }}>
                  {comment.parent.user.firstName}
                </Button>
              </p>
            </Fragment>
          ) : null}
        </div>
      </div>

      {user && isReplyFormOpen && !isOptimisticComment && (
        <ReplyCommentForm
          user={user}
          on={comment.on}
          parent={comment.id}
          setIsRepliesOpen={setIsRepliesOpen}
          onSuccess={() => {
            if (isMaximumDepth) router.push(`/comment/${comment.id}`);
            else {
              setIsReplyFormOpen(false);
              setIsRepliesOpen(true);
            }
          }}
        />
      )}

      {!isMaximumDepth && isRepliesOpen && replies.length !== 0 ? (
        <section
          id={`comment-${comment.id}-replies`}
          className={cn(
            "relative flex w-full flex-col gap-5 pl-4 md:gap-10 md:pl-12",
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

          {hasNextPage ? (
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
