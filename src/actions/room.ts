"use server";

// REVIEWED - 01

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
    }),
    messages.actions.room.serverError,
  );

  return response;
};

export const getRoomLinks = async function getRoomLinks(
  id: number,
): Promise<ResponseSafeExecute<{ label: keyof Room; href: string }[], string>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "rooms",
      id,
      depth: 1,
    }),
    messages.actions.room.serverError,
  );

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
