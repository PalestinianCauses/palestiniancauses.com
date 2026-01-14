"use server";

// REVIEWED - 15

import { revalidatePath } from "next/cache";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getAuthentication } from "@/lib/server/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { Comment } from "@/payload-types";

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
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "comments",
      data,
      overrideAccess: false,
    }),
    messages.actions.comment.serverErrorCreate,
  );

  if (!response.data || response.error) return response;

  revalidatePath("/profile");

  return { data: messages.actions.comment.successCreate, error: null };
};

export const deleteComment = async function deleteComment(
  id: number,
): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.comment.deleteUnAuthenticated,
    };

  const comment = await actionSafeExecute(
    payload.findByID({
      collection: "comments",
      id,
      depth: 1,
    }),
    messages.actions.comment.serverErrorGet,
  );

  if (!comment.data || comment.error || comment.data.status !== "approved")
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
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "comments",
      id,
      overrideAccess: false,
    }),
    messages.actions.comment.serverErrorDelete,
  );

  if (!response.data || response.error) return response;

  // Replies are automatically deleted via collection `beforeDelete` hook

  // Revalidate profile page for activity comments
  revalidatePath("/profile");

  // Revalidate public profile pages where this comment might appear
  // Get comment's user to revalidate their profile page
  const userCommentId =
    typeof comment.data.user === "object"
      ? comment.data.user.id
      : comment.data.user;

  if (userCommentId) revalidatePath(`/user/${userCommentId}`);

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

  const comment = await actionSafeExecute(
    payload.findByID({
      collection: "comments",
      id,
      depth: 1,
    }),
    messages.actions.comment.serverErrorGet,
  );

  if (!comment.data || comment.error || comment.data.status !== "approved")
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
