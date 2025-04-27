// REVIEWED - 02

import { ErrorPayload, ErrorPlusDataPayload, SelectOptions } from "./types";

export const selectDefaults: SelectOptions = {
  page: 1,
  limit: 50,
  sort: ["-", "created", "At"].join(""),
  search: "",
};

export const isError = function isError(error: unknown): error is ErrorPayload {
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
): error is ErrorPlusDataPayload {
  return (
    isError(error) &&
    "data" in error &&
    error.data !== null &&
    typeof error.data === "object" &&
    "errors" in error.data &&
    Array.isArray(error.data.errors) &&
    error.data.errors.every(
      (errorObject) =>
        typeof errorObject === "object" &&
        "message" in errorObject &&
        "path" in errorObject,
    )
  );
};
