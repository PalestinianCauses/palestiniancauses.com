"use server";

// REVIEWED - 14

import { PaginatedDocs } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { SignUpSchema } from "@/lib/schemas/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { isResponseErrorHasDataPlusErrors } from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";
import { User } from "@/payload-types";

import { getAuthentication } from "./auth";
// eslint-disable-next-line import/no-cycle
import { requestChangeEmail } from "./email-change";

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
): Promise<ResponseSafeExecute<PaginatedDocs<User>, string>> {
  const authentication = await getAuthentication();

  const response = await actionSafeExecute(
    payload.find({
      ...(authentication
        ? {
            req: { user: { ...authentication, collection: "users" } },
            user: authentication,
            overrideAccess: false,
          }
        : {}),
      collection: "users",
      where: { email: { equals: email } },
    }),
    messages.actions.user.serverError,
  );

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

  const rolesDefault = await actionSafeExecute(
    payload.find({
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
    }),
    messages.actions.role.serverError,
  );

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
        roles:
          rolesDefault.data && rolesDefault.data.docs.length !== 0
            ? [rolesDefault.data.docs[0].id]
            : [],
        accountVerified: false,
        privacySettings: {
          showEmail: false,
          showActivity: true,
          showAchievements: true,
          showOrders: false,
        },
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

  // PayLoad CMS automatically sends verification email on user creation
  // when verify: true is set in Users collection config
  return response;
};

export const updateUser = async function updateUser(
  data: Partial<User>,
): Promise<ResponseSafeExecute<User, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.user.unAuthenticated,
    };

  // Email change requires verification - handled separately
  if (data.email && data.email !== auth.email) {
    const responseChangeEmail = await requestChangeEmail({
      newEmail: data.email,
    });

    if (responseChangeEmail.error) return responseChangeEmail;

    // Don't update email directly - it will be updated after verification
    // pendingEmail is already stored by requestChangeEmail
  }

  const response = await actionSafeExecute(
    payload.update({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "users",
      id: auth.id,
      data,
      overrideAccess: false,
    }),
    messages.actions.user.serverErrorUpdate,
  );

  return response;
};

export const updatePassword = async function updatePassword(data: {
  currentPassword: string;
  newPassword: string;
}): Promise<ResponseSafeExecute<string, string>> {
  const auth = await getAuthentication();

  if (!auth)
    return {
      data: null,
      error: messages.actions.user.unAuthenticated,
    };

  if (!isResilientPassword(data.newPassword, 8)) {
    return {
      data: null,
      error: messages.actions.auth.signUp.password,
    };
  }

  // Verify current password by attempting to sign in
  const responseSignIn = await actionSafeExecute(
    payload.login({
      collection: "users",
      data: { email: auth.email, password: data.currentPassword },
    }),
    messages.actions.user.update.inCorrectCurrentPassword,
  );

  if (
    !responseSignIn.data ||
    responseSignIn.error ||
    responseSignIn.data.user.id !== auth.id
  ) {
    return {
      data: null,
      error:
        responseSignIn.error ||
        messages.actions.user.update.inCorrectCurrentPassword,
    };
  }

  // Update password
  const response = await actionSafeExecute(
    payload.update({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "users",
      where: { id: { equals: auth.id } },
      data: { password: data.newPassword },
      overrideAccess: false,
    }),
    messages.actions.auth.resetPassword.serverError,
  );

  if (!response.data || response.error)
    return { data: null, error: response.error };

  return {
    data: messages.actions.user.update.successPassword,
    error: null,
  };
};
