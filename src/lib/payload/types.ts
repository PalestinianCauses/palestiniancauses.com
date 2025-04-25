// REVIEWED - 02

import { GeneratedTypes } from "payload";

import { User } from "@/payload-types";

export type CollectionTypes = keyof GeneratedTypes["collections"];

export type SelectOptions = {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  [key: string]: string | number | undefined;
};

export type Error = {
  status: number;
  name: string;
  message: string;
};

export type ErrorPlusData = Error & {
  data: { errors: { message: string; path: string }[] };
};

export type AuthenticationResponseData = {
  user: User;
  token: string | null;
};

export type AuthenticationResponse = {
  data: AuthenticationResponseData | null;
  error: string | null;
};
