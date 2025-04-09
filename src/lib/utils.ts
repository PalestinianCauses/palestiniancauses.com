// REVIEWED - 04
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { httpStatusesMessages, messages } from "./errors";

export const toHEX = function toHEX(color: string) {
  const rgb = color.split(" ").map(Number);
  const hex = rgb.map((value) => value.toString(16).padStart(2, "0")).join("");

  return ["#", hex].join("");
};

export const cn = function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};

export const ensureStartsWith = function ensureStartsWith(
  stringToCheck: string,
  startsWith: string,
) {
  return stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : [startsWith, stringToCheck].join("");
};

export type ActionTryCatchReturn<D, E> = {
  data: D | null;
  error: E | null | unknown;
};

export const actionTryCatch = async function actionTryCatch<D, E>(
  action: Promise<D>,
): Promise<ActionTryCatchReturn<D, E>> {
  const result: ActionTryCatchReturn<D, E> = {
    data: null,
    error: null,
  };

  try {
    const data = await action;
    result.data = data;
  } catch (error) {
    result.error = error;
  }

  return result;
};

export const httpTryCatch = async function httpTryCatch<D, E>(
  http: Promise<Response>,
): Promise<ActionTryCatchReturn<D, E>> {
  const result: ActionTryCatchReturn<D, E> = {
    data: null,
    error: null,
  };

  const response = await actionTryCatch(http);

  if (response.error) {
    result.error = messages.http.serverError;
    return result;
  }

  if (response.data) {
    if (!response.data.ok) {
      if (
        response.data.status === 401 ||
        response.data.status === 403 ||
        response.data.status === 404
      )
        result.error = httpStatusesMessages[response.data.status].http;
      else result.error = messages.http.serverError;

      return result;
    }

    const data = (await response.data.json()) as D;
    result.data = data;
  }

  return result;
};
