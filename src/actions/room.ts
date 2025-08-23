"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";

export const getRoomsList = async function getRoomsList() {
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
