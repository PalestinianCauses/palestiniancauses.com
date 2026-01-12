// REVIEWED

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";
import { User } from "@/payload-types";

export const getUser = async function getUser(
  userId: number,
): Promise<ResponseSafeExecute<User, string>> {
  const response = await actionSafeExecute(
    payload.findByID({
      collection: "users",
      id: userId,
      depth: 1,
    }),
    messages.actions.user.serverError,
  );

  return response;
};

export const getUserByEmail = async function getUserByEmail(
  email: string,
): Promise<ResponseSafeExecute<User, string>> {
  const response = await actionSafeExecute(
    payload.find({
      collection: "users",
      where: { email: { equals: email } },
    }),
    messages.actions.user.serverError,
  );

  if (!response.data || response.error || response.data.docs.length !== 1)
    return {
      data: null,
      error: messages.actions.user.notFound,
    };

  return { data: response.data.docs[0], error: null };
};
