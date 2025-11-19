"use server";

// REVIEWED

import crypto from "crypto";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { createResetPassEmail } from "@/lib/utils/email-templates-auth";

import { getUserByEmail } from "./user";

export const forgotPassword = async function forgotPassword(data: {
  email: string;
}): Promise<ResponseSafeExecute<string, string>> {
  const userResponse = await getUserByEmail(data.email);

  if (
    !userResponse.data ||
    userResponse.error ||
    userResponse.data.docs.length === 0
  )
    // Don't reveal if email exists for security
    return {
      data: messages.actions.auth.forgotPassword.success,
      error: null,
    };

  const user = userResponse.data.docs[0];

  // Generate reset token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

  // Create reset token record
  const tokenResponse = await actionSafeExecute(
    payload.create({
      collection: "reset-tokens-password",
      data: {
        user: user.id,
        token,
        used: false,
        expiresAt: expiresAt.toISOString(),
      },
    }),
    messages.actions.auth.forgotPassword.serverError,
  );

  if (!tokenResponse.data || tokenResponse.error)
    return {
      data: null,
      error: messages.actions.auth.forgotPassword.serverError,
    };

  // Send email with reset link
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "https://palestiniancauses.com"}/reset-password/${token}`;
  const templateEmail = createResetPassEmail(resetLink);

  const response = await actionSafeExecute(
    payload.sendEmail({
      to: user.email,
      subject: "Reset Your Password at PalestinianCauses",
      html: templateEmail,
    }),
    messages.actions.auth.forgotPassword.serverError,
  );

  if (response.error) {
    console.error("Failed to send password reset email:", response.error);

    return {
      data: null,
      error: messages.actions.auth.forgotPassword.serverError,
    };
  }

  return {
    data: messages.actions.auth.forgotPassword.success,
    error: null,
  };
};
