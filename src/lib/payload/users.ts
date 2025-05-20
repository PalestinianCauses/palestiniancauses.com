// REVIEWED - 01

import { User } from "@/payload-types";

import { SignInSchema } from "../schemas/auth";

import { payload } from ".";

export const createUser = async function createUser(
  userData: Omit<User, "id" | "createdAt" | "updatedAt" | "sizes">,
) {
  const user = await payload.create({ collection: "users", data: userData });

  return user;
};

export const verifyUser = async function verifyUser({
  email,
}: {
  email: string;
}) {
  const user = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
  });

  return user;
};

export const signInUser = async function signInUser(signInData: SignInSchema) {
  const response = await payload.login({
    collection: "users",
    data: signInData,
  });

  return { user: response.user || null, token: response.token || null };
};
