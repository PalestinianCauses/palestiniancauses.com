"use server";

// REVIEWED - 14

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

  // Get user with populated roles and permissions
  const userResponse = await actionSafeExecute(
    payload.findByID({
      collection: "users",
      id: response.data.user.id,
      depth: 2, // Populate roles and their permissions
    }),
    messages.actions.user.serverError,
  );

  if (!userResponse.data || userResponse.error) return null;

  return userResponse.data;
};
