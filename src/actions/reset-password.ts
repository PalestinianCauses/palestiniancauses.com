"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isResponseError } from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";

export const resetPassword = async function resetPassword(data: {
  token: string;
  password: string;
}): Promise<ResponseSafeExecute<string, string>> {
  if (!isResilientPassword(data.password, 8)) {
    return {
      data: null,
      error: messages.actions.auth.signUp.password,
    };
  }

  const response = await actionSafeExecute(
    payload.resetPassword({
      collection: "users",
      data: { token: data.token, password: data.password },
      overrideAccess: true,
    }),
    messages.actions.auth.resetPassword.serverError,
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
      error: response.error,
    };
  }

  return {
    data: messages.actions.auth.resetPassword.success,
    error: null,
  };
};
