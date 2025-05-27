"use server";

// REVIEWED - 13

import { headers } from "next/headers";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";

export const getAuthentication = async function getAuthentication() {
  const response = await actionSafeExecute(
    payload.auth({ headers: await headers() }),
    messages.actions.user.serverError,
  );

  if (!response.data || response.error) return null;

  return response.data;
};
