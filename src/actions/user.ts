"use server";

// REVIEWED - 05

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { SignUpSchema } from "@/lib/schemas/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { SafeExecuteError } from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";

export const getUserByEmail = async function getUserByEmail(email: string) {
  const response = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    overrideAccess: false,
    req: { query: { email: { equals: email } } },
  });

  return response;
};

export const createUser = async function createUser(data: SignUpSchema) {
  if (
    !isResilientPassword(data.password, 8) ||
    !data.firstName ||
    !data.lastName
  )
    throw new SafeExecuteError(messages.actions.auth.signUp.validation);

  const response = await payload.create({
    collection: "users",
    data: { ...data, role: "website-user" },
  });

  return response;
};

const deleteUserPayload = async function deleteUserPayload(email: string) {
  const response = await payload.delete({
    collection: "users",
    where: { email: { equals: email } },
  });

  return response;
};

export const deleteUser = async function deleteUser(
  email: string,
): Promise<ResponseSafeExecute<string>> {
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
