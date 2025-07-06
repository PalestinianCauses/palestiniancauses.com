"use server";

// REVIEWED - 06

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

  if (!auth || !auth.user)
    return {
      data: null,
      error: messages.actions.comment.createUnAuthenticated,
    };

  const response = await actionSafeExecute(
    payload.create({
      req: { user: auth.user },
      user: auth.user,
      collection: "comments",
      data,
      overrideAccess: false,
    }),
    messages.actions.comment.serverErrorCreate,
  );

  if (!response.data || response.error) return response;

  return { data: messages.actions.comment.successCreate, error: null };
};

export const getComment = async function getComment(id: number) {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "comments",
      id,
      depth: 2,
    }),
    messages.actions.comment.serverErrorGet,
  );

  return response;
};

export const deleteComment = async function deleteComment(
  id: number,
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth || !auth.user)
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
      : comment.data.user) !== auth.user.id
  )
    return {
      data: null,
      error: messages.actions.comment.deleteUnAuthorized,
    };

  const response = await actionSafeExecute(
    payload.delete({ collection: "comments", id }),
    messages.actions.comment.serverErrorDelete,
  );

  if (!response.data || response.error) return response;

  return { data: messages.actions.comment.successDelete, error: null };
};

// There is security issues here, but it is not a big deal for now
export const deleteCommentReplies = async function deleteCommentReplies(
  id: number,
) {
  const response = await actionSafeExecute(
    payload.delete({
      collection: "comments",
      where: { parent: { equals: id } },
    }),
    messages.actions.comment.serverErrorDelete,
  );

  if (!response.data || response.error) {
    console.error("Error deleting comment replies", id, response);
    return response;
  }

  return { data: messages.actions.comment.replies.successDelete, error: null };
};

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

  if (!auth || !auth.user)
    return {
      data: null,
      error: messages.actions.comment.votes.unAuthenticated,
    };

  const { user } = auth;

  const comment = await getComment(id);

  if (!comment.data || comment.error)
    return { data: null, error: messages.actions.comment.notFound };

  const votes = comment.data.votes || [];
  let votesUpdated = [];

  const voteExisting = votes.find(
    (voteElement) =>
      (typeof voteElement.user === "object"
        ? voteElement.user.id
        : voteElement.user) === user.id,
  );

  if (voteExisting) {
    votesUpdated = votes.filter(
      (voteElement) => voteElement.id !== voteExisting.id,
    );

    if (voteExisting.vote !== vote)
      votesUpdated.push({
        user,
        vote,
      });
  } else {
    votesUpdated = [...votes, { user, vote }];
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
        upVotesCount: upVotes,
        downVotesCount: downVotes,
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
