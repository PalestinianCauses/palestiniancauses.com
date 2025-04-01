// REVIEWED - 02

import { getPayload } from "payload";

import { User } from "@/payload-types";
import configPromise from "@payload-config";

export const payload = await getPayload({ config: configPromise });

export type ErrorsPayload = Array<{ message: string }>;

export type ErrorPayload = {
  status: number;
  message?: string;
  errors?: ErrorsPayload;
};

export type AuthResponsePayload = {
  token: string | null;
  user: User | null;
};

export const isErrorPayload = function isErrorPayload(
  error: unknown,
): error is ErrorPayload {
  return (
    error !== null &&
    typeof error === "object" &&
    "status" in error &&
    ("message" in error ||
      ("errors" in error && Array.isArray((error as ErrorPayload).errors)))
  );
};
