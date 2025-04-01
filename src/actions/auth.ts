"use server";

// REVIEWED - 04

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PaginatedDocs } from "payload";

import { httpStatusesMessages } from "@/lib/errors";
import {
  frappeClient,
  frappeDB,
  isErrorFrappe,
  UserFrappe,
} from "@/lib/frappe";
import { AuthResponsePayload, payload } from "@/lib/payload";
import { SignInSchema, SignUpSchema } from "@/lib/schemas/auth";
import { actionTryCatch } from "@/lib/utils";
import { User } from "@/payload-types";

const verifyUserFrappe = async function verifyUserFrappe({
  email,
}: SignInSchema) {
  const user = await frappeDB.getDoc("User", email);

  return user;
};

const createUserFrappe = async function createUserFrappe(
  signUpData: SignUpSchema,
) {
  const user = await frappeDB.createDoc("User", {
    user_type: "Website User",
    username: [signUpData.firstName.trim(), signUpData.lastName.trim()]
      .join("")
      .toLowerCase(),
    first_name: signUpData.firstName,
    last_name: signUpData.lastName,
    email: signUpData.email,
    new_password: signUpData.password,
    send_welcome_email: 0,
  });

  return user;
};

const signInUserFrappe = async function signInUserFrappe(
  signInData: SignInSchema,
) {
  const user = await frappeClient.auth().loginWithUsernamePassword({
    username: signInData.email,
    password: signInData.password,
  });

  return user;
};

const verifyUserPayload = async function verifyUserPayload({
  email,
}: {
  email: string;
}) {
  const user = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
  });

  return user;
};

const createUserPayload = async function createUserPayload(
  userData: Omit<User, "id" | "createdAt" | "updatedAt" | "sizes">,
) {
  const user = await payload.create({ collection: "users", data: userData });

  return user;
};

const signInUserPayload = async function signInUserPayload(
  signInData: SignInSchema,
) {
  const response = await payload.login({
    collection: "users",
    data: signInData,
  });

  return { token: response.token || null, user: response.user || null };
};

const setUserCookies = async function setUserCookies(
  name: string,
  value: string,
) {
  (await cookies()).set({
    name,
    value,
    secure: true,
    httpOnly: true,
  });
};

export type AuthResponse = {
  data: AuthResponsePayload | null;
  error: string | null;
};

export const signIn = async function signIn(
  signInData: SignInSchema,
): Promise<AuthResponse> {
  const response = {
    data: null as AuthResponsePayload | null,
    error: null as string | null,
  };

  const { data: dataFrappe, error: errorFrappe } = await actionTryCatch<
    UserFrappe,
    unknown
  >(verifyUserFrappe(signInData));

  if (errorFrappe) {
    if (isErrorFrappe(errorFrappe) && errorFrappe.httpStatus === 404)
      response.error = httpStatusesMessages[404].signIn(signInData.email);
    else response.error = httpStatusesMessages[500].signIn;

    return response;
  }

  if (dataFrappe) {
    const { data: userDataFrappe, error: userErrorFrappe } =
      await actionTryCatch(signInUserFrappe(signInData));

    if (userErrorFrappe) {
      if (isErrorFrappe(userErrorFrappe) && userErrorFrappe.httpStatus === 401)
        response.error = httpStatusesMessages[401].signIn(signInData.email);
      else response.error = httpStatusesMessages[500].signIn;

      return response;
    }

    if (userDataFrappe) {
      const { data: dataPayload, error: errorPayload } = await actionTryCatch<
        PaginatedDocs<User>,
        unknown
      >(verifyUserPayload({ email: signInData.email }));

      if (errorPayload) {
        response.error = httpStatusesMessages[500].signIn;
        return response;
      }

      if (dataPayload) {
        if (dataPayload.docs.length === 0) {
          const { error: userErrorPayload } = await actionTryCatch<
            User,
            unknown
          >(
            createUserPayload({
              email: signInData.email,
              password: signInData.password,
              role: dataFrappe.user_type.toLowerCase().split(" ").join("-") as
                | "admin"
                | "system-user"
                | "website-user",
              frappeUserId: dataFrappe.name,
              frappeUserRole: dataFrappe.user_type,
              isSyncedWithFrappe: true,
            }),
          );

          if (userErrorPayload) {
            response.error = httpStatusesMessages[500].signIn;
            return response;
          }
        }

        const { data: userDataPayload, error: userErrorPayload } =
          await actionTryCatch<AuthResponsePayload, unknown>(
            signInUserPayload({
              email: signInData.email,
              password: signInData.password,
            }),
          );

        if (userErrorPayload) {
          response.error = httpStatusesMessages[500].signIn;
          return response;
        }

        if (userDataPayload && userDataPayload.token) {
          await setUserCookies("payload-token", userDataPayload.token);
          response.data = userDataPayload;
          return response;
        }
      }
    }
  }

  if (
    (!response.data && !response.error) ||
    (response.data && response.error)
  ) {
    response.data = null;
    response.error = httpStatusesMessages[500].signIn;
  }

  return response;
};

export const signUp = async function signUp(
  signUpData: SignUpSchema,
): Promise<AuthResponse> {
  const response = {
    data: null as AuthResponsePayload | null,
    error: null as string | null,
  };

  const { data: dataFrappe, error: errorFrappe } = await actionTryCatch<
    UserFrappe,
    unknown
  >(createUserFrappe(signUpData));

  if (errorFrappe) {
    if (isErrorFrappe(errorFrappe)) {
      if (errorFrappe.httpStatus === 409)
        response.error = httpStatusesMessages[409].signUp(signUpData.email);
      else if (errorFrappe.httpStatus === 417)
        response.error = httpStatusesMessages[417].signUp;
    } else response.error = httpStatusesMessages[500].signUp;

    return response;
  }

  if (dataFrappe) {
    const { data: dataPayload, error: errorPayload } = await actionTryCatch<
      User,
      unknown
    >(
      createUserPayload({
        ...signUpData,
        role: dataFrappe.user_type.toLowerCase().split(" ").join("-") as
          | "admin"
          | "system-user"
          | "website-user",
        frappeUserId: dataFrappe.name,
        frappeUserRole: dataFrappe.user_type,
        isSyncedWithFrappe: true,
      }),
    );

    if (errorPayload) {
      response.error = httpStatusesMessages[500].signUp;
      return response;
    }

    if (dataPayload) {
      const { data: userDataPayload, error: userErrorPayload } =
        await actionTryCatch(
          signInUserPayload({
            email: signUpData.email,
            password: signUpData.password,
          }),
        );

      if (userErrorPayload) redirect("/signin");

      if (userDataPayload && userDataPayload.token) {
        await setUserCookies("payload-token", userDataPayload.token);
        response.data = userDataPayload;
        return response;
      }
    }
  }

  if (
    (!response.data && !response.error) ||
    (response.data && response.error)
  ) {
    response.data = null;
    response.error = httpStatusesMessages[500].signUp;
  }

  return response;
};

export const signOut = async function signOut() {
  (await cookies()).delete("payload-token");
};
