"use server";

// REVIEWED - 02

import { revalidatePath } from "next/cache";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { getAuthentication } from "@/lib/server/auth";
import { ResponseSafeExecute } from "@/lib/types";

export const cancelingPendingEmail =
  async function cancelingPendingEmail(): Promise<
    ResponseSafeExecute<string, string>
  > {
    const auth = await getAuthentication();

    if (!auth)
      return {
        data: null,
        error: messages.actions.user.unAuthenticated,
      };

    if (!auth.pendingEmail)
      return {
        data: null,
        error: messages.actions.auth.changeEmail.noPendingEmail,
      };

    // Clear pending email from this user
    const response = await actionSafeExecute(
      payload.update({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "users",
        where: { id: { equals: auth.id } },
        data: { pendingEmail: null },
        overrideAccess: false,
      }),
      messages.actions.auth.changeEmail.serverErrorCancelingPendingEmail,
    );

    if (!response.data || response.error)
      return { data: null, error: response.error };

    // Delete un-used verification tokens for this user with this pending email
    const tokensResponse = await actionSafeExecute(
      payload.find({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "verification-tokens-email",
        where: {
          and: [
            { user: { equals: auth.id } },
            { newEmail: { equals: auth.pendingEmail } },
            { used: { equals: false } },
          ],
        },
        limit: 100,
        overrideAccess: false,
      }),
      messages.actions.auth.changeEmail.serverErrorCancelingPendingEmail,
    );

    if (!tokensResponse.data || tokensResponse.error)
      return { data: null, error: tokensResponse.error };

    if (tokensResponse.data.docs.length !== 0) {
      const deleteTokensResponse = await Promise.all(
        tokensResponse.data.docs.map((token) =>
          actionSafeExecute(
            payload.delete({
              req: { user: { ...auth, collection: "users" } },
              user: auth,
              collection: "verification-tokens-email",
              where: { id: { equals: token.id } },
              overrideAccess: false,
            }),
            messages.actions.auth.changeEmail.serverErrorCancelingPendingEmail,
          ),
        ),
      );

      deleteTokensResponse.forEach((r) => {
        if (r.error) console.error(r.error);
      });
    }

    revalidatePath("/profile");

    return {
      data: messages.actions.auth.changeEmail.successCancelingPendingEmail,
      error: null,
    };
  };
