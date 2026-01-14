// REVIEWED - 01

import { Where } from "payload";

import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { generateToken } from "@/lib/utils/tokens";
import { User } from "@/payload-types";

import { messages } from "../messages";

interface CreateVerificationTokenOptions {
  user: User;
  newEmail?: string | null;
  expiresInHours?: number;
}

interface SendingVerificationEmailO {
  email: string;
  subject: string;
  html: string;
}

export const createVerificationToken = async function createVerificationToken({
  user,
  newEmail = null,
  expiresInHours = 24,
}: CreateVerificationTokenOptions): Promise<
  ResponseSafeExecute<{ id: number; token: string }, string>
> {
  // Delete old un-used tokens for this user and email (if provided)
  const whereClause: Where = {
    and: [{ user: { equals: user.id } }, { used: { equals: false } }],
  };

  if (newEmail) whereClause.and?.push({ newEmail: { equals: newEmail } });
  // For initial verification, find tokens where `newEmail` is null or not set
  else
    whereClause.and?.push({
      or: [{ newEmail: { equals: null } }, { newEmail: { exists: false } }],
    });

  const previousTokenResponse = await actionSafeExecute(
    payload.find({
      req: { user: { ...user, collection: "users" } },
      user,
      collection: "verification-tokens-email",
      where: whereClause,
      limit: 100,
      overrideAccess: false,
    }),
    messages.actions.auth.verificationEmail.serverErrorPreviousTokenFind,
  );

  if (
    previousTokenResponse.data &&
    previousTokenResponse.data.docs.length !== 0
  ) {
    const deletePreviousTokenResponses = await Promise.all(
      previousTokenResponse.data.docs.map((previousToken) =>
        actionSafeExecute(
          payload.delete({
            req: { user: { ...user, collection: "users" } },
            user,
            collection: "verification-tokens-email",
            id: previousToken.id,
            overrideAccess: false,
          }),
          messages.actions.auth.verificationEmail
            .serverErrorPreviousTokenDelete,
        ),
      ),
    );

    // Log errors but continue
    deletePreviousTokenResponses.forEach((response) => {
      if (response.error) console.error(response.error);
    });
  }

  // Generate new token
  const token = generateToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);

  // Create verification token
  const tokenResponse = await actionSafeExecute(
    payload.create({
      req: { user: { ...user, collection: "users" } },
      user,
      collection: "verification-tokens-email",
      data: {
        user,
        token,
        newEmail: newEmail || undefined,
        used: false,
        expiresAt: expiresAt.toISOString(),
      },
      overrideAccess: false,
    }),
    messages.actions.auth.verificationEmail.serverErrorCreate,
  );

  if (!tokenResponse.data || tokenResponse.error)
    return { data: null, error: tokenResponse.error };

  return {
    data: { id: tokenResponse.data.id, token },
    error: null,
  };
};

export const sendingVerificationEmail =
  async function sendingVerificationEmail({
    email,
    subject,
    html,
  }: SendingVerificationEmailO): Promise<ResponseSafeExecute<boolean, string>> {
    const response = await actionSafeExecute(
      payload.sendEmail({
        to: email,
        subject,
        html,
      }),
      messages.actions.auth.verificationEmail.serverErrorSend,
    );

    if (!response.data || response.error)
      return {
        data: null,
        error:
          response.error ||
          messages.actions.auth.verificationEmail.serverErrorSend,
      };

    return { data: true, error: null };
  };

export const deleteVerificationToken = async function deleteVerificationToken(
  user: User,
  tokenId: number,
): Promise<ResponseSafeExecute<boolean, string>> {
  const response = await actionSafeExecute(
    payload.delete({
      req: { user: { ...user, collection: "users" } },
      user,
      collection: "verification-tokens-email",
      id: tokenId,
      overrideAccess: false,
    }),
    messages.actions.auth.verificationEmail.serverErrorDelete,
  );

  if (!response.data || response.error)
    return { data: null, error: response.error };

  return { data: true, error: null };
};
