"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { BlogsPost } from "@/payload-types";

export const getBlogPost = async function getBlogPost(
  slug: string,
): Promise<ResponseSafeExecute<BlogsPost>> {
  const response = await actionSafeExecute(
    payload.find({
      collection: "blogs-posts",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      limit: 1,
      depth: 1,
    }),
    messages.actions.blogPost.serverErrorGet,
  );

  if (!response.data || response.error || response.data.docs.length === 0)
    return {
      data: null,
      error: messages.actions.blogPost.notFound,
    };

  return {
    data: response.data.docs[0],
    error: null,
  };
};

export const getBlogPostById = async function getBlogPostById(
  id: number,
): Promise<ResponseSafeExecute<BlogsPost>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "blogs-posts",
      id,
      depth: 1,
    }),
    messages.actions.blogPost.serverErrorGet,
  );

  if (!response.data || response.error)
    return {
      data: null,
      error: messages.actions.blogPost.notFound,
    };

  if (response.data.status !== "published")
    return {
      data: null,
      error: messages.actions.blogPost.notFound,
    };

  return {
    data: response.data,
    error: null,
  };
};
