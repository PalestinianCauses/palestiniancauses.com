"use server";

// REVIEWED - 04

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
    return { data: null, error: messages.actions.comment.unAuthenticated };

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
