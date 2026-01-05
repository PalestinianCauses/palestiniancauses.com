"use server";

// REVIEWED - 05

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
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "achievement-notifications",
        where: { user: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "comments",
        where: { user: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "diary-entries",
        where: { author: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "media",
        where: { author: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "orders",
        where: { user: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "rooms",
        where: { user: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "rooms-contact",
        where: { user: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "rooms-packages",
        where: { user: { equals: auth.id } },
        overrideAccess: false,
      }),
      messages.actions.user.delete.serverError,
    ),
    actionSafeExecute(
      payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "rooms-services",
        where: { user: { equals: auth.id } },
        overrideAccess: false,
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
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "users",
      id: auth.id,
      overrideAccess: false,
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
