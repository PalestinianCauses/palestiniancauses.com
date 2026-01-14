"use server";

// REVIEWED - 03

import { revalidatePath } from "next/cache";

import { messages } from "@/lib/messages";
import { getAuthentication } from "@/lib/server/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { createVerificationEmail } from "@/lib/utils/email-templates-auth";
import {
  createVerificationToken,
  deleteVerificationToken,
  sendingVerificationEmail,
} from "@/lib/utils/email-verification";

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

    // Create verification token (no newEmail for initial verification)
    const tokenResponse = await createVerificationToken({
      user: auth,
      newEmail: null,
      expiresInHours: 24,
    });

    if (!tokenResponse.data || tokenResponse.error)
      return { data: null, error: tokenResponse.error };

    // Send verification email
    const verificationURL = `${process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com"}/verify-email/${tokenResponse.data.token}`;
    const templateEmail = createVerificationEmail(verificationURL);

    const responseEmail = await sendingVerificationEmail({
      email: auth.email,
      subject: "Verify Your Email Address at PalestinianCauses",
      html: templateEmail,
    });

    if (!responseEmail.data || responseEmail.error) {
      // if email sending fails, delete token
      await deleteVerificationToken(auth, tokenResponse.data.id);
      return {
        data: null,
        error:
          responseEmail.error ||
          messages.actions.auth.verificationEmail.serverError,
      };
    }

    revalidatePath("/profile");

    return {
      data: messages.actions.auth.verificationEmail.successSent,
      error: null,
    };
  };
