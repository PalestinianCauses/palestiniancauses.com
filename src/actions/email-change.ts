"use server";

// REVIEWED

import crypto from "crypto";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { createVerificationChangeEmail } from "@/lib/utils/email-templates-auth";

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

  // Check if new email is in use
  const existingUser = await getUserByEmail(data.newEmail);

  if (!existingUser.data || existingUser.error)
    return {
      data: null,
      error: messages.actions.auth.changeEmail.serverError,
    };

  if (existingUser.data.docs.length === 0)
    return {
      data: null,
      error: messages.actions.auth.changeEmail.inUseEmail,
    };

  // Generate verification token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // Token expires in 24 hours

  // Create verification token record
  const tokenResponse = await actionSafeExecute(
    payload.create({
      collection: "verification-tokens-email",
      data: {
        user: auth.id,
        token,
        newEmail: data.newEmail,
        used: false,
        expiresAt: expiresAt.toISOString(),
      },
    }),
    messages.actions.auth.changeEmail.serverError,
  );

  if (!tokenResponse.data || tokenResponse.error)
    return {
      data: null,
      error: messages.actions.auth.changeEmail.serverError,
    };

  // Update user with pending email
  await payload.update({
    collection: "users",
    id: auth.id,
    data: { pendingEmail: data.newEmail },
  });

  // Send email with verification link
  const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://palestiniancauses.com"}/verify-email/${token}`;
  const templateEmail = createVerificationChangeEmail(
    data.newEmail,
    verificationLink,
  );

  const response = await actionSafeExecute(
    payload.sendEmail({
      to: data.newEmail,
      subject: "Verify Your New Email at PalestinianCauses",
      html: templateEmail,
    }),
    messages.actions.auth.changeEmail.serverError,
  );

  if (response.error) {
    console.error(
      "Failed to send email change verification email:",
      response.error,
    );

    return {
      data: null,
      error: messages.actions.auth.changeEmail.serverError,
    };
  }

  return {
    data: messages.actions.auth.changeEmail.success,
    error: null,
  };
};
