"server-only";

// REVIEWED - 03

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { ActionSafeExecute, actionSafeExecute } from "@/lib/utils";

const deleteUserPayload = async function deleteUserPayload(email: string) {
  const response = await payload.delete({
    collection: "users",
    where: { email: { equals: email } },
  });

  return response;
};

export const deleteUser = async function deleteUser(
  email: string,
): Promise<ActionSafeExecute<string, string>> {
  const responsePayload = await actionSafeExecute(
    deleteUserPayload(email),
    messages.actions.user.delete.serverError,
  );

  if (
    !responsePayload.data ||
    responsePayload.data.errors.length > 0 ||
    responsePayload.error
  )
    return { data: null, error: messages.actions.user.delete.serverError };

  return { data: messages.actions.user.delete.success, error: null };
};
