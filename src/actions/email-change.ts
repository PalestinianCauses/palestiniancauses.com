"use server";

// REVIEWED - 01

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";
// eslint-disable-next-line import/no-cycle
import { getUserByEmail } from "./user";

export const requestChangeEmail = async function requestChangeEmail(data: {
  newEmail: string;
}): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.user.unAuthenticated,
    };

  // Check if new email is already in use
  const existingUser = await getUserByEmail(data.newEmail);

  if (!existingUser.data || existingUser.error)
    return {
      data: null,
      error: messages.actions.auth.changeEmail.serverError,
    };

  if (existingUser.data.docs.length !== 0)
    return {
      data: null,
      error: messages.actions.auth.changeEmail.inUseEmail,
    };

  // Update email directly - PayLoad CMS will automatically:
  // 1. Set _verified to false (hidden field)
  // 2. Send verification email to new email address
  // 3. Handle verification token internally
  const response = await actionSafeExecute(
    payload.update({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "users",
      id: auth.id,
      data: { email: data.newEmail },
      overrideAccess: false,
    }),
    messages.actions.auth.changeEmail.serverError,
  );

  if (!response.data || response.error)
    return { data: null, error: response.error };

  return {
    data: messages.actions.auth.changeEmail.success,
    error: null,
  };
};
