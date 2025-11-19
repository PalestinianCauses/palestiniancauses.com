"use server";

// REVIEWED - 01

import crypto from "crypto";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { isObject } from "@/lib/types/guards";
import { createVerificationEmail } from "@/lib/utils/email-templates-auth";

import { getAuthentication } from "./auth";

export const doNotifyVerificationEmail =
  async function doNotifyVerificationEmail(
    userId: number,
    email: string,
  ): Promise<ResponseSafeExecute<string, string>> {
    // Generate verification token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token expires in 24 hours

    // Create verification token record
    const tokenResponse = await actionSafeExecute(
      payload.create({
        collection: "verification-tokens-email",
        data: {
          user: userId,
          token,
          used: false,
          expiresAt: expiresAt.toISOString(),
        },
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    if (!tokenResponse.data || tokenResponse.error)
      return {
        data: null,
        error: messages.actions.auth.verificationEmail.serverError,
      };

    // Send email with verification link
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://palestiniancauses.com"}/verify-email/${token}`;
    const templateEmail = createVerificationEmail(verificationLink);

    const response = await actionSafeExecute(
      payload.sendEmail({
        to: email,
        subject: "Verify Your Email at PalestinianCauses",
        html: templateEmail,
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    if (response.error) {
      console.error("Failed to send verification email:", response.error);

      return {
        data: null,
        error: messages.actions.auth.verificationEmail.serverError,
      };
    }

    return {
      data: messages.actions.auth.verificationEmail.successSent,
      error: null,
    };
  };

export const redoNotifyVerificationEmail =
  async function redoNotifyVerificationEmail(): Promise<
    ResponseSafeExecute<string, string>
  > {
    const auth = await getAuthentication();

    if (!auth)
      return {
        data: null,
        error: messages.actions.user.unAuthenticated,
      };

    if (auth.accountVerified)
      return {
        data: null,
        error: messages.actions.auth.verificationEmail.accountVerified,
      };

    return doNotifyVerificationEmail(auth.id, auth.email);
  };

export const verifyEmail = async function verifyEmail(
  token: string,
): Promise<ResponseSafeExecute<string, string>> {
  // Find verification token
  const tokenResponse = await actionSafeExecute(
    payload.find({
      collection: "verification-tokens-email",
      where: { token: { equals: token }, used: { equals: false } },
      limit: 1,
      depth: 1,
    }),
    messages.actions.auth.verificationEmail.serverError,
  );

  if (
    !tokenResponse.data ||
    tokenResponse.error ||
    tokenResponse.data.docs.length === 0
  ) {
    return {
      data: null,
      error: messages.actions.auth.verificationEmail.tokenNotFound,
    };
  }

  const verificationToken = tokenResponse.data.docs[0];

  // Check if token is expired
  if (new Date(verificationToken.expiresAt) < new Date()) {
    return {
      data: null,
      error: messages.actions.auth.verificationEmail.tokenExpired,
    };
  }

  const user = isObject(verificationToken.user) ? verificationToken.user : null;

  if (!user)
    return {
      data: null,
      error: messages.actions.auth.verificationEmail.serverError,
    };

  // In case this is an email change verification
  if (verificationToken.newEmail) {
    const updateResponse = await actionSafeExecute(
      payload.update({
        collection: "users",
        id: user.id,
        data: {
          email: verificationToken.newEmail,
          accountVerified: true,
          pendingEmail: null,
        },
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    if (!updateResponse.data || updateResponse.error)
      return {
        data: null,
        error: messages.actions.auth.verificationEmail.serverError,
      };
  } else {
    // Regular email verification
    const updateResponse = await actionSafeExecute(
      payload.update({
        collection: "users",
        id: user.id,
        data: { accountVerified: true },
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    if (!updateResponse.data || updateResponse.error)
      return {
        data: null,
        error: messages.actions.auth.verificationEmail.serverError,
      };
  }

  // Mark token as used
  await payload.update({
    collection: "verification-tokens-email",
    id: verificationToken.id,
    data: { used: true },
  });

  return {
    data: messages.actions.auth.verificationEmail.success,
    error: null,
  };
};
