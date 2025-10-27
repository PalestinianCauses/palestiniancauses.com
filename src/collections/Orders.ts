// REVIEWED - 06

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: hasPermissionAccess({ resource: "orders", action: "create" }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "orders", action: "read" })({ req }) ||
      isSelf("user")({ req }),
    update: hasPermissionAccess({ resource: "orders", action: "update" }),
    delete: hasPermissionAccess({ resource: "orders", action: "delete" }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "orders.admin",
        action: "read",
      }),
    group: "Database",
    defaultColumns: ["id", "user", "type", "total", "status", "createdAt"],
    useAsTitle: "id",
  },
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
      admin: { readOnly: true, position: "sidebar" },
      name: "type",
      label: "Type",
      type: "select",
      options: [
        { label: "Free", value: "free" },
        { label: "Paid", value: "paid" },
      ],
      defaultValue: "free",
      required: true,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      name: "total",
      label: "Total",
      type: "number",
      min: 0,
      defaultValue: 0,
      required: true,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.type !== "free",
        position: "sidebar",
      },
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Failed", value: "failed" },
        { label: "Refunded", value: "refunded" },
        { label: "N/A", value: "not-applicable" },
      ],
      defaultValue: "pending",
    },
    {
      admin: { readOnly: true },
      name: "items",
      label: "Items",
      type: "array",
      required: true,
      fields: [
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
          name: "quantity",
          label: "Quantity",
          type: "number",
          min: 1,
          defaultValue: 1,
        },
        {
          admin: { readOnly: true },
          name: "price",
          label: "Price",
          type: "number",
          min: 0,
          required: true,
        },
      ],
    },
  ],
};
