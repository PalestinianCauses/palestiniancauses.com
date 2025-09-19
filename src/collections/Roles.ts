// REVIEWED

import type { CollectionConfig } from "payload";

// eslint-disable-next-line import/no-cycle
import { isAdmin } from "@/access/global";

export const Roles: CollectionConfig = {
  slug: "roles",
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Authorization",
    defaultColumns: ["name", "permissions", "priority", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        description:
          "Unique name for the role (e.g., 'admin', 'website-author', 'website-user')",
      },
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      admin: {
        description: "Description of what this role can do",
      },
      label: "Description",
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      admin: {
        description: "Select the permissions this role should have",
      },
      label: "Permissions",
      name: "permissions",
      type: "relationship",
      relationTo: "permissions",
      hasMany: true,
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "Whether this role should be assigned to new users by default",
      },
      label: "Is Default Role",
      name: "isDefault",
      type: "checkbox",
      defaultValue: false,
      required: false,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "Higher priority roles override lower priority ones (0 = lowest)",
      },
      label: "Priority",
      name: "priority",
      type: "number",
      defaultValue: 0,
      required: false,
    },
  ],
};
