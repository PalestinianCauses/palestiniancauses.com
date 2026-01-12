"use server";

// REVIEWED - 04

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getUserByEmail } from "@/lib/server/user";
import { ResponseSafeExecute } from "@/lib/types";

export const forgotPassword = async function forgotPassword(data: {
  email: string;
}): Promise<ResponseSafeExecute<string, string>> {
  // Check if user exists and is verified
  const userResponse = await getUserByEmail(data.email);

  if (!userResponse.data || userResponse.error)
    // Return success message even if user doesn't exist (security best practice)
    return {
      data: messages.actions.auth.forgotPassword.success,
      error: null,
    };

  const user = userResponse.data;

  // Check if account is verified
  if (!user.accountVerified)
    return {
      data: null,
      error: messages.actions.auth.forgotPassword.notVerified,
    };

  // Use PayLoad CMS's built-in forgotPassword local API
  const response = await actionSafeExecute(
    payload.forgotPassword({
      collection: "users",
      data: { email: data.email },
    }),
    messages.actions.auth.forgotPassword.serverError,
  );

  // PayLoad returns success even if email doesn't exist (security best practice)
  // So we always return success message
  if (!response.data || response.error)
    return {
      data: null,
      error: response.error || messages.actions.auth.forgotPassword.serverError,
    };

  return {
    data: messages.actions.auth.forgotPassword.success,
    error: null,
  };
};
