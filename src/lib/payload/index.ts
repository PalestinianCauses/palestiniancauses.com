// REVIEWED - 01

import { getPayload } from "payload";

import { User } from "@/payload-types";
import configPromise from "@payload-config";

export const payload = await getPayload({ config: configPromise });

export type ErrorPayload = {
  status: number;
  errors: Array<{ message: string }>;
};

export type AuthResponsePayload = {
  token: string | undefined;
  user: User | undefined;
};

export const isErrorPayload = function isErrorPayload(
  error: unknown,
): error is ErrorPayload {
  return (
    error !== null &&
    typeof error === "object" &&
    "status" in error &&
    "errors" in error &&
    Array.isArray((error as ErrorPayload).errors)
  );
};
