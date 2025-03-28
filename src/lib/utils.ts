// REVIEWED - 02
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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

type ActionTryCatchReturn<D, E> = { data: D | null; error: E | null | unknown };

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
