"use server";

// REVIEWED - 10

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { PaginatedDocs } from "payload";

import { messages } from "@/lib/errors";
import { payload } from "@/lib/payload";
import {
  AuthenticationResponse,
  AuthenticationResponseData,
  ErrorPayload,
  ErrorPlusDataPayload,
} from "@/lib/payload/types";
import { isError, isErrorHasDataPlusErrors } from "@/lib/payload/utils";
import { SignInSchema, SignUpSchema } from "@/lib/schemas/auth";
import { actionSafeExecute, isResilientPassword } from "@/lib/utils";
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
  const responseAuth = await actionSafeExecute(
    payload.auth({ headers: await headers() }),
    messages.actions.user.serverError,
  );

  if (!responseAuth.data || responseAuth.error) return null;

  return responseAuth.data;
};

export const signIn = async function signIn(
  signInData: SignInSchema,
): Promise<AuthenticationResponse> {
  const responsePayload = await actionSafeExecute<PaginatedDocs<User>, string>(
    verifyUserPayload({ email: signInData.email }),
    messages.actions.auth.signIn.serverError,
  );

  if (!responsePayload.data || responsePayload.error)
    return { data: responsePayload.data, error: responsePayload.error };

  if (responsePayload.data.docs.length === 0)
    return {
      data: null,
      error: messages.actions.auth.signIn.notFound(signInData.email),
    };

  const responseUserPayload = await actionSafeExecute<
    AuthenticationResponseData,
    ErrorPayload
  >(
    signInUserPayload({
      email: signInData.email,
      password: signInData.password,
    }),
    messages.actions.auth.signIn.serverError,
    isError,
  );

  if (!responseUserPayload.data || responseUserPayload.error) {
    const response = {
      data: null,
      error: messages.actions.auth.signIn.serverError,
    };

    if (typeof responseUserPayload.error !== "string")
      if (responseUserPayload.error.status === 401)
        response.error = messages.actions.auth.signIn.unAuthenticated(
          signInData.email,
        );

    return response;
  }

  if (!responseUserPayload.data.user || !responseUserPayload.data.token)
    return { data: null, error: messages.actions.auth.signIn.serverError };

  await setUserCookies("payload-token", responseUserPayload.data.token);
  return responseUserPayload;
};

export const signUp = async function signUp(
  signUpData: SignUpSchema,
): Promise<AuthenticationResponse> {
  if (!isResilientPassword(signUpData.password))
    return { data: null, error: messages.actions.auth.signUp.validation };

  const responsePayload = await actionSafeExecute<User, ErrorPlusDataPayload>(
    createUserPayload({ ...signUpData, role: "website-user" }),
    messages.actions.auth.signUp.serverError,
    isErrorHasDataPlusErrors,
  );

  if (!responsePayload.data || responsePayload.error) {
    const response = {
      data: null,
      error: messages.actions.auth.signUp.serverError,
    };

    if (typeof responsePayload.error !== "string")
      if (
        responsePayload.error.status === 400 &&
        responsePayload.error.data.errors[0].path === "email"
      )
        response.error = messages.actions.auth.signUp.duplication(
          signUpData.email,
        );

    return response;
  }

  const responseUserPayload = await actionSafeExecute(
    signInUserPayload({
      email: signUpData.email,
      password: signUpData.password,
    }),
    messages.actions.auth.signIn.serverError,
  );

  if (
    !responseUserPayload.data ||
    !responseUserPayload.data.user ||
    !responseUserPayload.data.token ||
    responseUserPayload.error
  )
    redirect("/signin");

  await setUserCookies("payload-token", responseUserPayload.data.token);

  return responseUserPayload;
};

export const signOut = async function signOut() {
  (await cookies()).delete("payload-token");
};
