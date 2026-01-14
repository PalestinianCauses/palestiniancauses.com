"use server";

// REVIEWED - 16

import { revalidatePath } from "next/cache";

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { SignUpSchema } from "@/lib/schemas/auth";
import { getAuthentication } from "@/lib/server/auth";
import { ResponseSafeExecute } from "@/lib/types";
import { isResponseErrorHasDataPlusErrors } from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";
import { User } from "@/payload-types";

// eslint-disable-next-line import/no-cycle
import { requestChangeEmail } from "./email-change";

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
  const isEmailChange = data.email && data.email !== auth.email;

  if (isEmailChange) {
    const responseChangeEmail = await requestChangeEmail({
      newEmail: data.email,
    });

    if (responseChangeEmail.error) return responseChangeEmail;
  }

  // Remove email from data - it should only be updated after verification
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const { email: _, ...dataWithoutEmail } = data;

  const response = await actionSafeExecute(
    payload.update({
      req: { user: { ...auth, collection: "users" } },
      user: auth,
      collection: "users",
      id: auth.id,
      data: dataWithoutEmail,
      overrideAccess: false,
    }),
    messages.actions.user.serverErrorUpdate,
  );

  revalidatePath("/profile");

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

  // revalidatePath("/profile");

  return {
    data: messages.actions.user.update.successPassword,
    error: null,
  };
};
