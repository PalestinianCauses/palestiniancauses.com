"use server";

// REVIEWED - 11

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { PaginatedDocs } from "payload";

import { messages } from "@/lib/messages";
import { actionSafeExecute, httpSafeExecute } from "@/lib/network";
import { getCookie, setCookie } from "@/lib/network/cookies";
import { payload } from "@/lib/payload";
import { createUser, signInUser, verifyUser } from "@/lib/payload/users";
import { SignInSchema, SignUpSchema } from "@/lib/schemas/auth";
import {
  ErrorPayload,
  ErrorPlusDataPayload,
  ResponseDataAuthenticationRefreshedTokenPayload,
  ResponseDataAuthenticationTokenPayload,
  ResponseSafeExecute,
} from "@/lib/types";
import {
  isResponseDataAuthenticationHasRefreshedToken,
  isResponseError,
  isResponseErrorHasDataPlusErrors,
} from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";
import { User } from "@/payload-types";

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
): Promise<ResponseSafeExecute<ResponseDataAuthenticationTokenPayload>> {
  const responsePayload = await actionSafeExecute<PaginatedDocs<User>, string>(
    verifyUser({ email: signInData.email }),
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
    ResponseDataAuthenticationTokenPayload,
    ErrorPayload
  >(
    signInUser({
      email: signInData.email,
      password: signInData.password,
    }),
    messages.actions.auth.signIn.serverError,
    isResponseError,
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

  await setCookie("payload-token", responseUserPayload.data.token);
  return responseUserPayload;
};

export const signUp = async function signUp(
  signUpData: SignUpSchema,
): Promise<ResponseSafeExecute<ResponseDataAuthenticationTokenPayload>> {
  if (!isResilientPassword(signUpData.password))
    return { data: null, error: messages.actions.auth.signUp.validation };

  const responsePayload = await actionSafeExecute<User, ErrorPlusDataPayload>(
    createUser({ ...signUpData, role: "website-user" }),
    messages.actions.auth.signUp.serverError,
    isResponseErrorHasDataPlusErrors,
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
    signInUser({
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

  await setCookie("payload-token", responseUserPayload.data.token);

  return responseUserPayload;
};

export const signOut = async function signOut() {
  (await cookies()).delete("payload-token");
};

export const refreshToken = async function refreshToken(): Promise<
  ResponseSafeExecute<ResponseDataAuthenticationRefreshedTokenPayload>
> {
  const token = await getCookie("payload-token");

  if (!token || !token.value) {
    return {
      data: null,
      error: messages.actions.auth.refreshToken.notFound,
    };
  }

  const response = await httpSafeExecute(
    fetch("/api/users/refresh-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }),
    messages.actions.auth.refreshToken.serverError,
    isResponseDataAuthenticationHasRefreshedToken,
  );

  if (!response.data || response.error)
    return { data: null, error: response.error };

  if (!response.data.user || !response.data.refreshedToken)
    return {
      data: null,
      error: messages.actions.auth.refreshToken.serverError,
    };

  await setCookie("payload-token", response.data.refreshedToken);
  return response;
};
