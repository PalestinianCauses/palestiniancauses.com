// REVIEWED

import { FrappeApp } from "frappe-js-sdk";

const frappe = new FrappeApp(process.env.NEXT_PUBLIC_FRAPPE_URL!);

export const frappeAuthentication = frappe.auth();
export const frappeDB = frappe.db();
