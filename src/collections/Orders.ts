// REVIEWED - 04

import { CollectionConfig } from "payload";

import { isAdmin, isAuthenticated } from "@/access/global";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: isAuthenticated,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    group: "Database",
    defaultColumns: ["id", "user", "type", "total", "status", "createdAt"],
    useAsTitle: "id",
  },
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
