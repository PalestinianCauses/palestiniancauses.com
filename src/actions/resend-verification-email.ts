"use server";

// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { createVerificationEmail } from "@/lib/utils/email-templates-auth";
import { generateToken } from "@/lib/utils/tokens";

import { getAuthentication } from "./auth";

export const resendingVerificationEmail =
  async function resendingVerificationEmail(): Promise<
    ResponseSafeExecute<string, string>
  > {
    const auth = await getAuthentication();

    if (!auth)
      return {
        data: null,
        error: messages.actions.user.unAuthenticated,
      };

    // Check if already verified
    if (auth.accountVerified)
      return {
        data: null,
        error: messages.actions.auth.verificationEmail.accountVerified,
      };

    // Generate verification token
    const token = generateToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Token expires in 24 hours

    // Create verification token in VerificationTokensEmail collection
    const tokenResponse = await actionSafeExecute(
      payload.create({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "verification-tokens-email",
        data: {
          user: auth.id,
          token,
          used: false,
          expiresAt: expiresAt.toISOString(),
        },
        overrideAccess: false,
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    if (!tokenResponse.data || tokenResponse.error)
      return { data: null, error: tokenResponse.error };

    // Send verification email
    const verificationURL = `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/verify-email/${token}`;
    const templateEmail = createVerificationEmail(verificationURL);

    const responseEmail = await actionSafeExecute(
      payload.sendEmail({
        to: auth.email,
        subject: "Verify Your Email Address at PalestinianCauses",
        html: templateEmail,
      }),
      messages.actions.auth.verificationEmail.serverError,
    );

    // if email sending fails, delete token
    if (!responseEmail.data || responseEmail.error) {
      await payload.delete({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "verification-tokens-email",
        where: { id: { equals: tokenResponse.data.id } },
        overrideAccess: false,
      });

      return {
        data: null,
        error:
          responseEmail.error ||
          messages.actions.auth.verificationEmail.serverError,
      };
    }

    return {
      data: messages.actions.auth.verificationEmail.successSent,
      error: null,
    };
  };
