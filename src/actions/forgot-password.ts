"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

export const forgotPassword = async function forgotPassword(data: {
  email: string;
}): Promise<ResponseSafeExecute<string, string>> {
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
