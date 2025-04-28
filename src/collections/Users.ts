// REVIEWED - 0٦
import type { CollectionConfig } from "payload";

import { isAdminOrSystemUserOrSelf } from "@/access/diary-entry";
import { isAdmin, isAdminField } from "@/access/global";

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdminOrSystemUserOrSelf,
    delete: isAdmin,
  },
  admin: { useAsTitle: "email" },
  auth: {
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
