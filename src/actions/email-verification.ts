"use server";

// REVIEWED - 04

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getUser } from "@/lib/server/user";
import { ResponseSafeExecute } from "@/lib/types";
import { isObject } from "@/lib/types/guards";

export const verifyEmail = async function verifyEmail(
  token: string,
): Promise<ResponseSafeExecute<string, string>> {
  // Find verification token
  const tokenResponse = await actionSafeExecute(
    payload.find({
      collection: "verification-tokens-email",
      where: { token: { equals: token } },
      limit: 1,
    }),
    messages.actions.auth.verificationEmail.serverError,
  );

  if (
    !tokenResponse.data ||
    tokenResponse.error ||
    tokenResponse.data.docs.length === 0
  )
    return {
      data: null,
      error: messages.actions.auth.verificationEmail.tokenNotFound,
    };

  const verificationToken = tokenResponse.data.docs[0];

  // Check if token is already used
  if (verificationToken.used)
    return {
      data: null,
      error: messages.actions.auth.verificationEmail.tokenUsed,
    };

  // Check if token is expired
  const expiresAt = new Date(verificationToken.expiresAt);
  if (expiresAt < new Date())
    return {
      data: null,
      error: messages.actions.auth.verificationEmail.tokenExpired,
    };

  const userId = isObject(verificationToken.user)
    ? verificationToken.user.id
    : verificationToken.user;

  // Get user
  const userResponse = await getUser(userId);

  if (!userResponse.data || userResponse.error)
    return { data: null, error: userResponse.error };

  // if `newEmail` is provided, this is an email change verification
  if (verificationToken.newEmail) {
    // Update user email and clear pending email
    const updateResponse = await actionSafeExecute(
      payload.update({
        req: { user: { ...userResponse.data, collection: "users" } },
        user: userResponse.data,
        collection: "users",
        where: { id: { equals: userId } },
        data: {
          email: verificationToken.newEmail,
          accountVerified: true,
          pendingEmail: null,
        },
        overrideAccess: false,
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    if (!updateResponse.data || updateResponse.error)
      return { data: null, error: updateResponse.error };
  } else {
    // This is initial email verification - mark user as verified
    const updateResponse = await actionSafeExecute(
      payload.update({
        req: { user: { ...userResponse.data, collection: "users" } },
        user: userResponse.data,
        collection: "users",
        where: { id: { equals: userId } },
        data: { accountVerified: true },
        overrideAccess: false,
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    if (!updateResponse.data || updateResponse.error)
      return { data: null, error: updateResponse.error };
  }

  // Mark token as used
  const updateTokenResponse = await actionSafeExecute(
    payload.update({
      req: { user: { ...userResponse.data, collection: "users" } },
      user: userResponse.data,
      collection: "verification-tokens-email",
      where: { id: { equals: verificationToken.id } },
      data: { used: true },
      overrideAccess: false,
    }),
    messages.actions.auth.verificationEmail.serverError,
  );

  if (!updateTokenResponse.data || updateTokenResponse.error)
    return { data: null, error: updateTokenResponse.error };

  return {
    data: messages.actions.auth.verificationEmail.success,
    error: null,
  };
};
