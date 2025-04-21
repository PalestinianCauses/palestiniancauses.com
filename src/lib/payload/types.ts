// REVIEWED

import { User } from "payload";

export type SelectOptions = {
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
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
