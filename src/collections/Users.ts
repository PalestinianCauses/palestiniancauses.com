// REVIEWED - 09
import type { CollectionConfig } from "payload";

import { isAdmin, isAdminField } from "@/access/global";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "email", "firstName", "role", "createdAt"],
    useAsTitle: "email",
  },
  labels: { singular: "User", plural: "Users" },
  auth: {
    tokenExpiration: 60,
    cookies: {
      sameSite: "Strict",
      domain: "palestiniancauses.com",
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
      access: { update: isAdminField },
      label: "Role",
      name: "role",
      type: "select",
      options: ["admin", "system-user", "website-user"],
      defaultValue: "website-user",
      required: true,
    },
  ],
};
