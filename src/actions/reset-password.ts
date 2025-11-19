"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isObject } from "@/lib/types/guards";
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

  // Find reset token
  const tokenResponse = await actionSafeExecute(
    payload.find({
      collection: "reset-tokens-password",
      where: { token: { equals: data.token }, used: { equals: false } },
      depth: 1,
    }),
    messages.actions.auth.resetPassword.serverError,
  );

  if (
    !tokenResponse.data ||
    tokenResponse.error ||
    tokenResponse.data.docs.length === 0
  )
    return {
      data: null,
      error: messages.actions.auth.resetPassword.tokenNotFound,
    };

  const resetToken = tokenResponse.data.docs[0];

  // Check if token is expired
  if (new Date(resetToken.expiresAt) < new Date())
    return {
      data: null,
      error: messages.actions.auth.resetPassword.tokenExpired,
    };

  // Update user password
  const user = isObject(resetToken.user) ? resetToken.user : null;
  if (!user)
    return {
      data: null,
      error: messages.actions.auth.resetPassword.serverError,
    };

  const updateResponse = await actionSafeExecute(
    payload.update({
      collection: "users",
      id: user.id,
      data: { password: data.password },
    }),
    messages.actions.auth.resetPassword.serverError,
  );

  if (!updateResponse.data || updateResponse.error)
    return {
      data: null,
      error: messages.actions.auth.resetPassword.serverError,
    };

  // Mark token as used
  await actionSafeExecute(
    payload.update({
      collection: "reset-tokens-password",
      id: resetToken.id,
      data: { used: true },
    }),
    messages.actions.auth.resetPassword.serverError,
  );

  return {
    data: messages.actions.auth.resetPassword.success,
    error: null,
  };
};
