"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";

export const getRoomsNames = async function getRoomsNames() {
  const response = await actionSafeExecute(
    payload.find({
      collection: "rooms",
      page: 1,
      limit: 5,
      depth: 0,
      select: { id: true, name: true, slug: true },
    }),
    messages.actions.room.serverError,
  );

  return response;
};
