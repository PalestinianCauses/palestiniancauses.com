// REVIEWED - 01

import { FrappeApp } from "frappe-js-sdk";

const frappe = new FrappeApp(process.env.NEXT_PUBLIC_FRAPPE_URL!, {
  useToken: true,
  token: () =>
    [process.env.FRAPPE_API_KEY!, process.env.FRAPPE_PUBLIC_API_SECRET!].join(
      ":",
    ),
  type: "token",
});

export const frappeDB = frappe.db();
export const frappeCall = frappe.call();
export const frappeAxios = frappe.axios({});

export const frappeAuthentication = frappe.auth();
