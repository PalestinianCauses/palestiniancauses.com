"use server";

// REVIEWED

import { PaginatedDocs } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { BlogsRoom } from "@/payload-types";

export const getBlogRooms = async function getBlogRooms(): Promise<
  ResponseSafeExecute<PaginatedDocs<BlogsRoom>>
> {
  const response = await actionSafeExecute(
    payload.find({
      collection: "blogs-rooms",
      depth: 1,
    }),
    messages.actions.blogRoom.serverErrorGet,
  );

  if (!response.data || response.error)
    return {
      data: null,
      error: messages.actions.blogRoom.serverErrorGet,
    };

  return response;
};

export const getBlogRoom = async function getBlogRoom(
  slug: string,
): Promise<ResponseSafeExecute<BlogsRoom>> {
  const response = await actionSafeExecute(
    payload.find({
      collection: "blogs-rooms",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    }),
    messages.actions.blogRoom.serverErrorGet,
  );

  if (!response.data || response.data.docs.length === 0)
    return {
      data: null,
      error: messages.actions.blogRoom.notFound,
    };

  return {
    data: response.data.docs[0],
    error: null,
  };
};

export const getBlogRoomById = async function getBlogRoomById(
  id: number,
): Promise<ResponseSafeExecute<BlogsRoom>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "blogs-rooms",
      id,
      depth: 1,
    }),
    messages.actions.blogRoom.serverErrorGet,
  );

  if (!response.data || response.error)
    return {
      data: null,
      error: messages.actions.blogRoom.notFound,
    };

  return {
    data: response.data,
    error: null,
  };
};
