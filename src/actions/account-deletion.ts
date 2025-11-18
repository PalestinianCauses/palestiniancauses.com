"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";

export const deleteUserAccount = async function deleteUserAccount(): Promise<
  ResponseSafeExecute<string, string>
> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

  const promises = [
    actionSafeExecute(
      payload.delete({
        collection: "blogs",
        where: { author: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "comments",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "diary-entries",
        where: { author: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "media",
        where: { author: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "orders",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "reset-tokens-password",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "rooms",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "rooms-contact",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "rooms-packages",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "rooms-services",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        collection: "verification-tokens-email",
        where: { user: { equals: auth.id } },
      }),
      messages.actions.user.delete.serverError,
    ),
  ];

  const promisesResponse = await Promise.all(promises);

  if (promisesResponse.some((promise) => !promise.data || promise.error))
    return {
      data: null,
      error: messages.actions.user.delete.serverError,
    };

  const userResponse = await actionSafeExecute(
    payload.delete({
      collection: "users",
      id: auth.id,
    }),
    messages.actions.user.delete.serverError,
  );

  if (!userResponse.data || userResponse.error)
    return {
      data: null,
      error: messages.actions.user.delete.serverError,
    };

  return {
    data: messages.actions.user.delete.success,
    error: null,
  };
};
