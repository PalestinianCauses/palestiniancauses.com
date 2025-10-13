"use server";

// REVIEWED - 08

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { SignUpSchema } from "@/lib/schemas/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { isResponseErrorHasDataPlusErrors } from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";
import { User } from "@/payload-types";

export const getUserByEmail = async function getUserByEmail(email: string) {
  const query = { email: { equals: email } };
  const response = await payload.find({
    collection: "users",
    where: query,
    overrideAccess: false,
    req: { query },
  });

  return response;
};

export const createUser = async function createUser(
  data: SignUpSchema,
): Promise<ResponseSafeExecute<User, string>> {
  if (
    !isResilientPassword(data.password, 8) ||
    !data.firstName ||
    !data.lastName
  )
    return {
      data: null,
      error: messages.actions.auth.signUp.validation,
    };

  const rolesDefault = await payload.find({
    collection: "roles",
    where: { isDefault: { equals: true } },
    limit: 1,
  });

  const response = await actionSafeExecute(
    payload.create({
      collection: "users",
      data: {
        ...data,
        previousRole: "website-user",
        roles: rolesDefault.docs.length > 0 ? [rolesDefault.docs[0].id] : [],
      },
    }),
    messages.actions.auth.signUp.serverError,
    isResponseErrorHasDataPlusErrors,
  );

  if (!response.data || response.error) {
    if (typeof response.error === "string")
      return { data: null, error: response.error };

    if (
      response.error.status === 400 &&
      response.error.data.errors[0].path === "email"
    )
      return {
        data: null,
        error: messages.actions.auth.signUp.duplication(data.email),
      };

    return {
      data: null,
      error: messages.actions.auth.signUp.serverError,
    };
  }

  return response;
};
