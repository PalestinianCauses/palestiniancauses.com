// REVIEWED - 07

import { Permission } from "@/payload-types";

import {
  ErrorPayload,
  ErrorPlusDataPayload,
  NotificationSubscriptionError,
  ResponseDataAuthenticationRefreshedTokenPayload,
  ResponseDataAuthenticationTokenPayload,
} from ".";

// PayLoad CMS
export const isResponseDataAuthentication =
  function isResponseDataAuthentication(
    response: unknown,
  ): response is ResponseDataAuthenticationTokenPayload {
    return (
      typeof response === "object" &&
      response !== null &&
      "user" in response &&
      typeof response.user === "object" &&
      response.user !== null &&
      "token" in response
    );
  };

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

// Notification Subscription
export const isNotificationSubscriptionError =
  function isNotificationSubscriptionError(
    error: unknown,
  ): error is NotificationSubscriptionError {
    return (
      typeof error === "object" &&
      error !== null &&
      "statusCode" in error &&
      typeof error.statusCode === "number" &&
      "body" in error &&
      typeof error.body === "string" &&
      "endpoint" in error &&
      typeof error.endpoint === "string"
    );
  };

// Actions/HTTPs
export class SafeExecuteError extends Error {
  name: string;

  constructor(message: string) {
    super(message);
    this.name = "SafeExecuteError";
  }
}

// Booleans
export const isDefined = function isDefined(
  value: unknown,
): value is Required<NonNullable<typeof value>> {
  return value !== null && value !== undefined;
};

// Strings
export const isString = function isString(value: unknown): value is string {
  return isDefined(value) && typeof value === "string";
};

// Numbers
export const isNumber = function isNumber(value: unknown): value is number {
  return isDefined(value) && typeof value === "number";
};

// Objects
export const isObject = function isObject(value: unknown): value is object {
  return isDefined(value) && typeof value === "object" && !Array.isArray(value);
};

// Permissions
export const isConditionsObject = function isConditionsObject(
  conditions: Permission["conditions"],
): conditions is Record<string, unknown> {
  return isObject(conditions) && !Array.isArray(conditions);
};
