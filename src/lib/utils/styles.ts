// REVIEWED

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const toHEX = function toHEX(color: string) {
  const rgb = color.split(" ").map(Number);
  const hex = rgb.map((value) => value.toString(16).padStart(2, "0")).join("");

  return ["#", hex].join("");
};

export const cn = function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
};
