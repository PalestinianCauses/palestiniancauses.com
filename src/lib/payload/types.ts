// REVIEWED - 03

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

export type ErrorPayload = {
  status: number;
  name: string;
  message: string;
};

export type ErrorPlusDataPayload = ErrorPayload & {
  data: { errors: { message: string; path: string }[] };
};

export type AuthenticationResponseData = {
  user: User;
  token: string | null;
};

export type AuthenticationResponse =
  | { data: AuthenticationResponseData; error: null }
  | { data: null; error: string };
