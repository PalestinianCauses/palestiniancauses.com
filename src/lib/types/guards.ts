// REVIEWED

import {
  ErrorPayload,
  ErrorPlusDataPayload,
  ResponseDataAuthenticationRefreshedTokenPayload,
} from ".";

// PayLoad CMS
export const isResponseDataAuthenticationHasRefreshedToken =
  function isResponseDataAuthenticationHasRefreshedToken(
    response: unknown,
  ): response is ResponseDataAuthenticationRefreshedTokenPayload {
    return (
      typeof response === "object" &&
      response !== null &&
      "user" in response &&
      "refreshedToken" in response
    );
  };

export const isResponseError = function isResponseError(
  error: unknown,
): error is ErrorPayload {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    "name" in error &&
    "message" in error
  );
};

export const isResponseErrorHasDataPlusErrors =
  function isResponseErrorHasDataPlusErrors(
    error: unknown,
  ): error is ErrorPlusDataPayload {
    return (
      isResponseError(error) &&
      "data" in error &&
      typeof error.data === "object" &&
      error.data !== null &&
      "errors" in error.data &&
      Array.isArray(error.data.errors) &&
      error.data.errors.every(
        (errorObject) =>
          typeof errorObject === "object" &&
          errorObject !== null &&
          "message" in errorObject &&
          "path" in errorObject,
      )
    );
  };
