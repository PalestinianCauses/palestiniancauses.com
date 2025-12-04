"use server";

// REVIEWED - 02

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { createVerificationChangeEmail } from "@/lib/utils/email-templates-auth";
import {
  createVerificationToken,
  deleteVerificationToken,
  sendingVerificationEmail,
} from "@/lib/utils/email-verification";

import { getAuthentication } from "./auth";
// eslint-disable-next-line import/no-cycle
import { getUserByEmail } from "./user";

export const requestChangeEmail = async function requestChangeEmail(data?: {
  newEmail?: string;
}): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.user.unAuthenticated,
    };

  // Determine target email: use provided `newEmail` or existing pendingEmail
  let targetEmail: string;
  let isResend = false;

  if (data?.newEmail) {
    // New email change request
    targetEmail = data.newEmail;

    // if there's already a pending email that matches, just re-send
    if (auth.pendingEmail === data.newEmail) isResend = true;
  } else if (auth.pendingEmail) {
    // Re-send for existing pending email
    targetEmail = auth.pendingEmail;
    isResend = true;
  }

  // No new email provided and no pending email
  else
    return {
      data: null,
      error: messages.actions.auth.changeEmail.noPendingEmail,
    };

  // if this is a new email change (not a re-send), validate and store it
  if (!isResend) {
    // Check if new email is already in use
    const existingUser = await getUserByEmail(targetEmail);

    if (!existingUser.data || existingUser.error)
      return {
        data: null,
        error: existingUser.error,
      };

    if (existingUser.data.docs.length !== 0)
      return {
        data: null,
        error: messages.actions.auth.changeEmail.inUseEmail,
      };

    // Store pending email on user record
    const updateUserResponse = await actionSafeExecute(
      payload.update({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "users",
        where: { id: { equals: auth.id } },
        data: { pendingEmail: targetEmail },
        overrideAccess: false,
      }),
      messages.actions.auth.changeEmail.serverError,
    );

    if (!updateUserResponse.data || updateUserResponse.error)
      return { data: null, error: updateUserResponse.error };
  }

  // Create verification token
  const tokenResult = await createVerificationToken({
    user: auth,
    newEmail: targetEmail,
    expiresInHours: 24,
  });

  if (!tokenResult.data || tokenResult.error) {
    // if token creation fails and this was a new request, clear pending email
    if (!isResend) {
      const updateUserResponse = await actionSafeExecute(
        payload.update({
          req: { user: { ...auth, collection: "users" } },
          user: auth,
          collection: "users",
          where: { id: { equals: auth.id } },
          data: { pendingEmail: null },
          overrideAccess: false,
        }),
        messages.actions.auth.changeEmail.serverError,
      );

      if (!updateUserResponse.data || updateUserResponse.error)
        return { data: null, error: updateUserResponse.error };
    }

    return { data: null, error: tokenResult.error };
  }

  // Send verification email
  const verificationURL = `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/verify-email/${tokenResult.data.token}`;
  const templateEmail = createVerificationChangeEmail(
    targetEmail,
    verificationURL,
  );

  const responseEmail = await sendingVerificationEmail({
    email: targetEmail,
    subject: "Verify Your New Email Address at PalestinianCauses",
    html: templateEmail,
  });

  if (!responseEmail.data || responseEmail.error) {
    // if email sending fails, delete token
    await deleteVerificationToken(auth, tokenResult.data.id);

    // if this was a new request (not a re-send), clear pending email
    if (!isResend) {
      const updateUserResponse = await actionSafeExecute(
        payload.update({
          req: { user: { ...auth, collection: "users" } },
          user: auth,
          collection: "users",
          where: { id: { equals: auth.id } },
          data: { pendingEmail: null },
          overrideAccess: false,
        }),
        messages.actions.auth.changeEmail.serverError,
      );

      if (!updateUserResponse.data || updateUserResponse.error)
        return { data: null, error: updateUserResponse.error };
    }

    return {
      data: null,
      error:
        responseEmail.error || messages.actions.auth.changeEmail.serverError,
    };
  }

  return {
    data: messages.actions.auth.changeEmail.success,
    error: null,
  };
};
