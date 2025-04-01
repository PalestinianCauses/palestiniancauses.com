// REVIEWED - 04
import type { CollectionConfig } from "payload";

import { isAdmin } from "./DiaryEntries";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: { hidden: true, useAsTitle: "email" },
  auth: {
    cookies: {
      sameSite: "Strict",
      domain: "localhost:3000",
      secure: true,
    },
  },
  fields: [
    {
      label: "Email",
      name: "email",
      type: "email",
      required: true,
      unique: true,
    },
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      defaultValue: "",
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      defaultValue: "",
    },
    {
      admin: { hidden: true },
      label: "Role",
      name: "role",
      type: "select",
      options: ["admin", "system-user", "website-user"],
      defaultValue: "website-user",
      required: true,
    },
    {
      admin: { hidden: true },
      label: "Frappe User ID",
      name: "frappeUserId",
      type: "text",
      required: true,
      unique: true,
    },
    {
      admin: { hidden: true },
      label: "Frappe User Role",
      name: "frappeUserRole",
      type: "text",
      required: true,
    },
    {
      admin: { hidden: true },
      label: "Is Synced With Frappe?",
      name: "isSyncedWithFrappe",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
