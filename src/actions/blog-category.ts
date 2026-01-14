"use server";

// REVIEWED - 01

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { BlogsCategory } from "@/payload-types";

export const getBlogCategory = async function getBlogCategory(
  slug: string,
): Promise<ResponseSafeExecute<BlogsCategory>> {
  const response = await actionSafeExecute(
    payload.find({
      collection: "blogs-categories",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    }),
    messages.actions.blogCategory.serverErrorGet,
  );

  if (!response.data || response.error || response.data.docs.length === 0)
    return {
      data: null,
      error: messages.actions.blogCategory.notFound,
    };

  return {
    data: response.data.docs[0],
    error: null,
  };
};

export const getBlogCategoryById = async function getBlogCategoryById(
  id: number,
): Promise<ResponseSafeExecute<BlogsCategory>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "blogs-categories",
      id,
      depth: 1,
    }),
    messages.actions.blogCategory.serverErrorGet,
  );

  if (!response.data || response.error)
    return {
      data: null,
      error: messages.actions.blogCategory.notFound,
    };

  return {
    data: response.data,
    error: null,
  };
};
