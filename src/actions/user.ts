"server-only";

// REVIEWED

import { messages } from "@/lib/errors";
import { frappeDB } from "@/lib/frappe";
import { payload } from "@/lib/payload";
import { actionTryCatch } from "@/lib/utils";

const deleteUserFrappe = async function deleteUserFrappe(email: string) {
  const response = await frappeDB.deleteDoc("User", email);
  return response;
};

const deleteUserPayload = async function deleteUserPayload(email: string) {
  const response = await payload.delete({
    collection: "users",
    where: { email: { equals: email } },
  });

  return response;
};

export const deleteUser = async function deleteUser(email: string) {
  const response = {
    data: null as string | null,
    error: null as string | null,
  };

  const responseFrappe = await actionTryCatch(deleteUserFrappe(email));

  if (responseFrappe.error) {
    response.error = messages.actions.user.delete.serverError;
    return response;
  }

  const responsePayload = await actionTryCatch(deleteUserPayload(email));

  if (
    responsePayload.error ||
    (responsePayload.data && responsePayload.data.errors.length > 0)
  ) {
    response.error = messages.actions.user.delete.serverError;
    return response;
  }

  response.data = messages.actions.user.delete.success;

  if (
    (response.data && response.error) ||
    (!response.data && !response.error)
  ) {
    response.data = null;
    response.error = messages.actions.user.delete.serverError;
    return response;
  }

  return response;
};
