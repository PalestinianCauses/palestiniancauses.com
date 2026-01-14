// REVIEWED

import { randomBytes } from "crypto";

export const generateToken = function generateToken(): string {
  return randomBytes(32).toString("hex");
};
