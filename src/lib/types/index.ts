// REVIEWED - 02

import { GeneratedTypes } from "payload";

import { User } from "@/payload-types";

// PayLoad CMS
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
  data: {
    errors: {
      message: string;
      path: string;
    }[];
  };
};

export type ResponseDataAuthenticationTokenPayload = {
  user: User;
  token: string | null;
};

export type ResponseDataAuthenticationRefreshedTokenPayload = {
  user: User;
  refreshedToken: string | null;
};

// Notification Subscription
export type NotificationSubscriptionError = {
  statusCode: number;
  body: string;
  endpoint: string;
};

// Actions/HTTPs
export type ResponseSafeExecuteError<E = string> = { data: null; error: E };

export type ResponseSafeExecute<D, E = string> =
  | { data: D; error: null }
  | ResponseSafeExecuteError<E>;

export type SafeExecuteConfig = {
  skip?: {
    http?: boolean;
    errors?: number[];
  };
};
