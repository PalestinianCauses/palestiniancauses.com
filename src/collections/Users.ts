// REVIEWED - 11
import type { CollectionConfig } from "payload";

import { isAdmin, isAdminField, isAdminOrSelf } from "@/access/global";
import { isDefined, isObject, isString } from "@/lib/types/guards";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: ({ req }) => {
      if (!req.user) return true;
      return isAdmin({ req });
    },
    read: ({ req }) => {
      if (
        !isDefined(req.user) &&
        isObject(req.query.email) &&
        "equals" in req.query.email &&
        isString(req.query.email.equals)
      )
        return true;
      return isAdminOrSelf({ req });
    },
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "email", "firstName", "roles", "createdAt"],
    useAsTitle: "email",
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
      admin: { position: "sidebar" },
      label: "Previous Role",
      name: "previousRole",
      type: "select",
      options: ["admin", "system-user", "website-user"],
      defaultValue: "website-user",
      required: true,
    },
    {
      access: { update: isAdminField },
      admin: { position: "sidebar" },
      label: "Roles",
      name: "roles",
      type: "relationship",
      relationTo: "roles",
      hasMany: true,
      required: true,
    },
  ],
};
