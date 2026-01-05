"use server";

// REVIEWED - 16

import { headers } from "next/headers";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { isDefined } from "@/lib/types/guards";

export const getAuthentication = async function getAuthentication() {
  const response = await actionSafeExecute(
    payload.auth({ headers: await headers() }),
    messages.actions.user.serverError,
  );

  if (
    !response.data ||
    response.error ||
    !isDefined(response.data.user) ||
    !isDefined(response.data.user.id)
  )
    return null;

  return response.data.user;
};
