"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isResponseError } from "@/lib/types/guards";

export const verifyEmail = async function verifyEmail(
  token: string,
): Promise<ResponseSafeExecute<string, string>> {
  // Use PayLoad CMS's built-in `verifyEmail` API
  // This handles both initial email verification and email change verification
  const response = await actionSafeExecute(
    payload.verifyEmail({
      collection: "users",
      token,
    }),
    messages.actions.auth.verificationEmail.serverError,
    isResponseError,
  );

  if (!response.data || response.error) {
    if (isResponseError(response.error))
      return {
        data: null,
        error: response.error.message,
      };

    return {
      data: null,
      error:
        response.error || messages.actions.auth.verificationEmail.serverError,
    };
  }

  return {
    data: messages.actions.auth.verificationEmail.success,
    error: null,
  };
};
