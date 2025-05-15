// REVIEWED - 10
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { httpStatusesMessages, messages } from "./errors";

// PWA
export const base64ToUint8Array = function base64ToUint8Array(
  base64String: string,
) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const dataRow = window.atob(base64);
  const outputArray = new Uint8Array(dataRow.length);

  for (let index = 0; index < dataRow.length; index += 1) {
    outputArray[index] = dataRow.charCodeAt(index);
  }

  return outputArray;
};

// Styles
export const toHEX = function toHEX(color: string) {
  const rgb = color.split(" ").map(Number);
  const hex = rgb.map((value) => value.toString(16).padStart(2, "0")).join("");

  return ["#", hex].join("");
};

export const cn = function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

// Strings
export const isString = function isString(value: unknown): value is string {
  return typeof value === "string";
};

export const ensureStartsWith = function ensureStartsWith(
  stringToCheck: string,
  startsWith: string,
) {
  return stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : [startsWith, stringToCheck].join("");
};

export const splitByFlexibleNewLines = function splitByFlexibleNewLines(
  string: string,
) {
  if (!string.trim()) return [];

  const separateRegex = /\s*\n+\s*/;
  const stringFiltered = string.split(separateRegex).filter(Boolean);
  return stringFiltered;
};

// Numbers
export const isNumber = function isNumber(value: unknown): value is number {
  return typeof value === "number";
};

// Dates
export const validateDateInRange = function validateDateInRange(
  value: Date | null | undefined,
  start: Date,
  end: Date,
  errorRequired: string,
  errorValid: string,
  errorRange: string,
) {
  if (!value) return errorRequired;

  const date = new Date(value);
  date.setUTCHours(0, 0, 0, 0);

  if (!(date instanceof Date) || Number.isNaN(date.getTime()))
    return errorValid;

  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(0, 0, 0, 0);

  if (date.getTime() < start.getTime() || date.getTime() > end.getTime())
    return errorRange;

  return true;
};

// Actions
export type ActionSafeExecute<D, E> =
  | { data: D; error: null }
  | { data: null; error: string }
  | { data: null; error: E };

export const actionSafeExecute = async function actionSafeExecute<
  D,
  E = string,
>(
  action: Promise<D>,
  errorDefault: string,
  isErrorFromTypeE?: (error: unknown) => error is E,
): Promise<ActionSafeExecute<D, E>> {
  try {
    const data = await action;
    return { data, error: null };
  } catch (error) {
    if (isErrorFromTypeE && isErrorFromTypeE(error))
      return { data: null, error };

    // Add Sentry Log Here
    return { data: null, error: errorDefault };
  }
};

// HTTPs
export const httpSafeExecute = async function httpSafeExecute<D, E = string>(
  http: Promise<Response>,
  errorDefault: string,
  isDataFromTypeD?: (data: unknown) => data is D,
  isErrorFromTypeE?: (error: unknown) => error is E,
): Promise<ActionSafeExecute<D, E>> {
  try {
    const response = await http;

    if (!response.ok) {
      const result = { data: null, error: errorDefault };

      if (
        response.status === 401 ||
        response.status === 403 ||
        response.status === 404
      )
        result.error = httpStatusesMessages[response.status].http;

      return result;
    }

    const data = await response.json();

    if (!isDataFromTypeD || !isDataFromTypeD(data))
      return { data: null, error: messages.http.typeError };

    return { data, error: null };
  } catch (error) {
    if (isErrorFromTypeE && isErrorFromTypeE(error))
      return { data: null, error };
    return { data: null, error: errorDefault };
  }
};

export const isResilientPassword = function isResilientPassword(
  password: string,
  minimumLength = 8,
) {
  if (!password || typeof password !== "string") return false;

  if (password.length < minimumLength) return false;

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasCharacterSpecial = /[!@#$%^&*()_+\-=`]/.test(password);

  return hasLowerCase && hasUpperCase && hasDigit && hasCharacterSpecial;
};
