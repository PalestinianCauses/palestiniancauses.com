// REVIEWED - 10
import type { CollectionConfig } from "payload";

import { isAdmin, isAdminField, isAdminOrSelf } from "@/access/global";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: ({ req }) => {
      if (!req.user) return true;
      return isAdmin({ req });
    },
    read: ({ req }) => {
      if (
        !req.user &&
        req.query.email &&
        typeof req.query.email === "object" &&
        "equals" in req.query.email &&
        typeof req.query.email.equals === "string"
      )
        return true;
      return isAdminOrSelf({ req });
    },
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "email", "firstName", "role", "createdAt"],
    useAsTitle: "email",
    hidden: ({ user }) => user.role !== "admin",
  },
  labels: { singular: "User", plural: "Users" },
  auth: {
    tokenExpiration: 24 * 60 * 60,
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
