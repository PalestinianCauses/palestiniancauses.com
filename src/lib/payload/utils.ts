// REVIEWED

import { Error, ErrorPlusData } from "./types";

export const isError = function isError(error: unknown): error is Error {
  return (
    error !== null &&
    typeof error === "object" &&
    "status" in error &&
    "name" in error &&
    "message" in error
  );
};

export const isErrorHasDataPlusErrors = function isErrorHasDataPlusErrors(
  error: unknown,
): error is ErrorPlusData {
  return (
    isError(error) &&
    "data" in error &&
    error.data !== null &&
    typeof error.data === "object" &&
    "errors" in error.data &&
    Array.isArray(error.data.errors)
  );
};
