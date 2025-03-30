// REVIEWED - 03

import { FrappeApp } from "frappe-js-sdk";

const frappe = new FrappeApp(process.env.NEXT_PUBLIC_FRAPPE_URL!, {
  useToken: true,
  token: () =>
    [
      process.env.NEXT_PUBLIC_FRAPPE_API_KEY!,
      process.env.NEXT_PUBLIC_FRAPPE_API_SECRET!,
    ].join(":"),
  type: "token",
});

export const frappeClient = new FrappeApp(process.env.NEXT_PUBLIC_FRAPPE_URL!);

export const frappeDB = frappe.db();
export const frappeCall = frappe.call();
export const frappeAxios = frappe.axios;

export const frappeAuthentication = frappe.auth();

export type UserFrappe = {
  user_type: string;
  username: string;
  name: string;
  email: string;
  new_password: string;
  send_welcome_email: number;
};

export type ErrorFrappe = {
  httpStatus: number;
  exc: string;
  message: string;
};

export const isErrorFrappe = function isErrorFrappe(
  error: unknown,
): error is ErrorFrappe {
  return (
    error !== null &&
    typeof error === "object" &&
    "httpStatus" in error &&
    "exc_type" in error &&
    "message" in error
  );
};
