// REVIEWED

import { CollectionConfig } from "payload";

import { isAdmin, isAdminOrSystemUserOrSelf } from "@/access/global";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: isAdmin,
    read: isAdminOrSystemUserOrSelf,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: { useAsTitle: "id", defaultColumns: ["id", "user", "product"] },
  labels: { singular: "Order", plural: "Orders" },
  fields: [
    {
      admin: { readOnly: true },
      name: "user",
      label: "User",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      admin: { readOnly: true },
      name: "product",
      label: "Product",
      type: "relationship",
      relationTo: "products",
      hasMany: false,
      required: true,
    },
    {
      admin: { readOnly: true },
      name: "orderedAt",
      label: "Ordered At",
      type: "date",
      defaultValue: new Date(),
      required: true,
    },
  ],
};
