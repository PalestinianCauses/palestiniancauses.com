"use server";

// REVIEWED - 02

import { PaginatedDocs } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { Room } from "@/payload-types";

export const getRoomList = async function getRoomList(): Promise<
  ResponseSafeExecute<PaginatedDocs<Room>, string>
> {
  const response = await actionSafeExecute(
    payload.find({
      req: { query: { origin: { equals: "website" } } },
      collection: "rooms",
      page: 1,
      limit: 5,
      depth: 1,
      select: {
        id: true,
        name: true,
        slug: true,
        information: { photograph: true },
      },
      where: {
        status: {
          equals: "published",
        },
      },
    }),
    messages.actions.room.serverError,
  );

  return response;
};

export const getRoom = async function getRoom(
  slug: string,
): Promise<ResponseSafeExecute<Room, string>> {
  const response = await actionSafeExecute(
    payload.find({
      collection: "rooms",
      where: { slug: { equals: slug }, status: { equals: "published" } },
      depth: 1,
    }),

    messages.actions.room.serverError,
  );

  if (!response.data || response.data.docs.length !== 1 || response.error)
    if (response.error) return { data: null, error: response.error };
    else return { data: null, error: messages.actions.room.serverError };

  return { data: response.data.docs[0], error: null };
};

export const getRoomLinks = async function getRoomLinks(
  slug: string,
): Promise<ResponseSafeExecute<{ label: keyof Room; href: string }[], string>> {
  const response = await getRoom(slug);

  if (!response.data || response.error)
    return { data: null, error: response.error };

  const links: { label: keyof Room; href: string }[] = [];

  for (let i = 0; i < Object.keys(response.data).length; i += 1) {
    const key = Object.keys(response.data)[i];
    let value = null;

    if (
      key === "about" ||
      key === "education" ||
      key === "experience" ||
      key === "qualification" ||
      key === "skills"
    ) {
      value = response.data[key];

      if (value) links.push({ label: key, href: `#${key}` });
    }
  }

  return { data: links, error: null };
};
