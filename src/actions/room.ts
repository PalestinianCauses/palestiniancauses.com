"use server";

// REVIEWED - 05

import { PaginatedDocs } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Room } from "@/payload-types";

import { getAuthentication } from "./auth";

export const getRoomList = async function getRoomList(): Promise<
  ResponseSafeExecute<PaginatedDocs<Room>, string>
> {
  const authentication = await getAuthentication();

  const response = await actionSafeExecute(
    payload.find({
      ...(authentication ? { user: authentication } : {}),
      req: {
        ...(authentication
          ? { user: { ...authentication, collection: "users" } }
          : {}),
        query: { origin: { equals: "website" } },
      },

      collection: "rooms",
      page: 1,
      limit: 5,
      depth: 1,
      select: {
        id: true,
        name: true,
        slug: true,
        information: { photograph: true },
        links: true,
      },

      where: {
        status: {
          equals: "published",
        },
      },

      ...(authentication ? { overrideAccess: false } : {}),
    }),
    messages.actions.room.serverError,
  );

  return response;
};

export const getRoom = async function getRoom(
  slug: string,
): Promise<ResponseSafeExecute<Room, string>> {
  const authentication = await getAuthentication();

  const response = await actionSafeExecute(
    payload.find({
      ...(authentication ? { user: authentication } : {}),
      req: {
        ...(authentication
          ? { user: { ...authentication, collection: "users" } }
          : {}),
        query: { origin: { equals: "website" } },
      },

      collection: "rooms",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      depth: 5,

      ...(authentication ? { overrideAccess: false } : {}),
    }),

    messages.actions.room.serverError,
  );

  if (!response.data || response.data.docs.length !== 1 || response.error)
    if (response.error) return { data: null, error: response.error };
    else return { data: null, error: messages.actions.room.serverError };

  return { data: response.data.docs[0], error: null };
};
