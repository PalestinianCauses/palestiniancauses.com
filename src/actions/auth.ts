"use server";

// REVIEWED - 08

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import { AuthenticationResponse } from "@/lib/payload/types";
import { isError, isErrorHasDataPlusErrors } from "@/lib/payload/utils";
import { SignInSchema, SignUpSchema } from "@/lib/schemas/auth";
import { actionTryCatch, isResilientPassword } from "@/lib/utils";
import { User } from "@/payload-types";

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

export const getUserCookies = async function getUserCookies(name: string) {
  return (await cookies()).get(name);
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
    path: "/",
  });
};

export const getAuth = async function getAuth() {
  const response = await actionTryCatch(
    payload.auth({ headers: await headers() }),
  );

  if (response.error) return null;

  return response.data;
};

export const signIn = async function signIn(
  signInData: SignInSchema,
): Promise<AuthenticationResponse> {
  const response: AuthenticationResponse = {
    data: null,
    error: messages.actions.auth.signIn.serverError,
  };

  const { data: dataPayload, error: errorPayload } = await actionTryCatch(
    verifyUserPayload({ email: signInData.email }),
  );

  if (errorPayload || !dataPayload) return response;

  if (dataPayload.docs.length === 0) {
    response.error = messages.actions.auth.signIn.notFound(signInData.email);
    return response;
  }

  const { data: userDataPayload, error: userErrorPayload } =
    await actionTryCatch(
      signInUserPayload({
        email: signInData.email,
        password: signInData.password,
      }),
    );

  if (userErrorPayload) {
    if (isError(userErrorPayload))
      if (userErrorPayload.name === "AuthenticationError")
        response.error = messages.actions.auth.signIn.unAuthenticated(
          signInData.email,
        );

    return response;
  }

  if (!userDataPayload || !userDataPayload.user || !userDataPayload.token)
    return response;

  await setUserCookies("payload-token", userDataPayload.token);
  response.data = userDataPayload;
  response.error = null;

  return response;
};

export const signUp = async function signUp(
  signUpData: SignUpSchema,
): Promise<AuthenticationResponse> {
  const response: AuthenticationResponse = {
    data: null,
    error: messages.actions.auth.signUp.serverError,
  };

  if (!isResilientPassword(signUpData.password)) {
    response.error = messages.actions.auth.signUp.validation;
    return response;
  }

  const { error: errorPayload } = await actionTryCatch(
    createUserPayload({ ...signUpData, role: "website-user" }),
  );

  if (errorPayload) {
    if (isErrorHasDataPlusErrors(errorPayload))
      if (
        errorPayload.name === "ValidationError" &&
        errorPayload.data.errors[0].path === "email"
      )
        response.error = messages.actions.auth.signUp.duplication(
          signUpData.email,
        );

    return response;
  }

  const { data: userDataPayload, error: userErrorPayload } =
    await actionTryCatch(
      signInUserPayload({
        email: signUpData.email,
        password: signUpData.password,
      }),
    );

  if (
    userErrorPayload ||
    !userDataPayload ||
    !userDataPayload.user ||
    !userDataPayload.token
  )
    redirect("/signin");

  await setUserCookies("payload-token", userDataPayload.token);
  response.data = userDataPayload;
  response.error = null;

  return response;
};

export const signOut = async function signOut() {
  (await cookies()).delete("payload-token");
};
