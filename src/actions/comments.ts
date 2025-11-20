"use server";

// REVIEWED - 11

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Comment } from "@/payload-types";

import { getAuthentication } from "./auth";

export const createComment = async function createComment(
  data: Omit<Comment, "id" | "createdAt" | "updatedAt">,
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.comment.createUnAuthenticated,
    };

  const response = await actionSafeExecute(
    payload.create({
      req: { user: { collection: "users", ...auth } },
      user: auth,
      collection: "comments",
      data,
      overrideAccess: false,
    }),
    messages.actions.comment.serverErrorCreate,
  );

  if (!response.data || response.error) return response;

  return { data: messages.actions.comment.successCreate, error: null };
};

// public information no need to override access
export const getCommentRepliesCount = async function getCommentRepliesCount(
  id: number,
): Promise<number> {
  const response = await actionSafeExecute(
    payload.count({
      collection: "comments",
      where: { parent: { equals: id } },
    }),
    messages.actions.comment.replies.serverErrorCount,
  );

  if (!response.data || response.error) return 0;

  return response.data.totalDocs || 0;
};

// public information no need to override access
export const getComment = async function getComment(
  id: number,
): Promise<ResponseSafeExecute<Comment & { repliesCount: number }>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "comments",
      id,
      depth: 2,
    }),
    messages.actions.comment.serverErrorGet,
  );

  if (!response.data || response.error) return response;

  if (response.data.status !== "approved")
    return {
      data: null,
      error: messages.actions.comment.notFound,
    };

  const repliesCount = await getCommentRepliesCount(id);
  return { data: { ...response.data, repliesCount }, error: null };
};

export const deleteComment = async function deleteComment(
  id: number,
  repliesIds?: number[],
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.comment.deleteUnAuthenticated,
    };

  const comment = await getComment(id);

  if (!comment.data || comment.error)
    return {
      data: null,
      error: messages.actions.comment.notFound,
    };

  if (
    (typeof comment.data.user === "object"
      ? comment.data.user.id
      : comment.data.user) !== auth.id
  )
    return {
      data: null,
      error: messages.actions.comment.deleteUnAuthorized,
    };

  const response = await actionSafeExecute(
    payload.delete({
      req: { user: { collection: "users", ...auth } },
      user: auth,
      collection: "comments",
      id,
      overrideAccess: false,
    }),
    messages.actions.comment.serverErrorDelete,
  );

  if (!response.data || response.error) return response;

  if (repliesIds) {
    const deletePromises = repliesIds.map(async (replyId) => {
      const repliesResponse = await actionSafeExecute(
        payload.delete({
          collection: "comments",
          id: replyId,
        }),
        messages.actions.comment.serverErrorDelete,
      );

      if (!repliesResponse.data || repliesResponse.error)
        console.error(
          "Error in `deleteCommentReplies` in `comments.ts` while trying to delete comment replies",
          id,
          response,
        );
    });

    await Promise.all(deletePromises);
  }

  return { data: messages.actions.comment.successDelete, error: null };
};

// limited document update no need to override access
export const voteOnComment = async function voteOnComment({
  id,
  vote,
}: {
  id: number;
  vote: "up" | "down";
}): Promise<
  ResponseSafeExecute<Pick<Comment, "votes" | "votesScore">, string>
> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.comment.votes.unAuthenticated,
    };

  const comment = await getComment(id);

  if (!comment.data || comment.error)
    return { data: null, error: messages.actions.comment.notFound };

  const votes = comment.data.votes || [];
  let votesUpdated = [];

  const voteExisting = votes.find(
    (voteElement) =>
      (typeof voteElement.user === "object"
        ? voteElement.user.id
        : voteElement.user) === auth.id,
  );

  if (voteExisting) {
    votesUpdated = votes.filter(
      (voteElement) => voteElement.id !== voteExisting.id,
    );

    if (voteExisting.vote !== vote)
      votesUpdated.push({
        user: auth,
        vote,
      });
  } else {
    votesUpdated = [...votes, { user: auth, vote }];
  }

  const upVotes = votesUpdated.filter((v) => v.vote === "up").length;
  const downVotes = votesUpdated.filter((v) => v.vote === "down").length;
  const votesScore = upVotes - downVotes;

  const response = await actionSafeExecute(
    payload.update({
      collection: "comments",
      id,
      data: {
        votes: votesUpdated,
        votesScore,
      },
    }),
    messages.actions.comment.votes.serverError,
  );

  if (!response.data || response.error) return response;

  return {
    data: { votes: votesUpdated, votesScore },
    error: null,
  };
};
