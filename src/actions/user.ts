"use server";

// REVIEWED - 06

import { messages } from "@/lib/messages";
import { payload } from "@/lib/payload";
import { SignUpSchema } from "@/lib/schemas/auth";
import { SafeExecuteError } from "@/lib/types/guards";
import { isResilientPassword } from "@/lib/utils/passwords";

export const getUserByEmail = async function getUserByEmail(email: string) {
  const query = { email: { equals: email } };
  const response = await payload.find({
    collection: "users",
    where: query,
    overrideAccess: false,
    req: { query },
  });

  return response;
};

export const createUser = async function createUser(data: SignUpSchema) {
  if (
    !isResilientPassword(data.password, 8) ||
    !data.firstName ||
    !data.lastName
  )
    throw new SafeExecuteError(messages.actions.auth.signUp.validation);

  const response = await payload.create({
    collection: "users",
    data: { ...data, role: "website-user" },
  });

  return response;
};
