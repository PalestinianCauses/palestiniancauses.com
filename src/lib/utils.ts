// REVIEWED - 01
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
