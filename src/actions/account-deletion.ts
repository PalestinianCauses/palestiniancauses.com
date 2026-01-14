"use server";

// REVIEWED - 06

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getAuthentication } from "@/lib/server/auth";
import { ResponseSafeExecute } from "@/lib/types";

export const deleteUserAccount = async function deleteUserAccount(): Promise<
  ResponseSafeExecute<string, string>
> {
  const auth = await getAuthentication();

  if (!auth)
    return { data: null, error: messages.actions.user.unAuthenticated };

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
