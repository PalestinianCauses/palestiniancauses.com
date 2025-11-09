"use server";

// REVIEWED - 09

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { SignUpSchema } from "@/lib/schemas/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { isResponseErrorHasDataPlusErrors } from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";
import { User } from "@/payload-types";

import { getAuthentication } from "./auth";

export const getUserByEmail = async function getUserByEmail(email: string) {
  const authentication = await getAuthentication();
  const response = await payload.find({
    ...(authentication
      ? {
          req: { user: { ...authentication, collection: "users" } },
          user: authentication,
          overrideAccess: false,
        }
      : {}),
    collection: "users",
    where: { email: { equals: email } },
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

  const authentication = await getAuthentication();

  const rolesDefault = await payload.find({
    ...(authentication
      ? {
          req: { user: { ...authentication, collection: "users" } },
          user: authentication,
          overrideAccess: false,
        }
      : {}),
    collection: "roles",
    where: { isDefault: { equals: true } },
    limit: 1,
  });

  const response = await actionSafeExecute(
    payload.create({
      ...(authentication
        ? {
            req: { user: { ...authentication, collection: "users" } },
            user: authentication,
            overrideAccess: false,
          }
        : {}),
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
