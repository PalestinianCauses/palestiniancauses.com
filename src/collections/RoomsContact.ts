// REVIEWED - 03

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const RoomsContact: CollectionConfig = {
  slug: "rooms-contact",
  access: {
    create: hasPermissionAccess({
      resource: "room-contact",
      action: "create",
    }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "room-contact", action: "read" })({
        req,
      }) || isSelf("user")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "room-contact", action: "update" })({
        req,
      }) || isSelf("user")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "room-contact", action: "delete" })({
        req,
      }) || isSelf("user")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "room-contact.admin",
        action: "read",
      }),
    group: "Rooms Content",
    defaultColumns: ["id", "type", "value", "status", "createdAt"],
    useAsTitle: "type",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Contact Information",
          fields: [
            {
              admin: {
                description:
                  "The individual or entity responsible for and associated with this contact.",
                position: "sidebar",
              },
              label: "Contact Owner",
              name: "user",
              type: "relationship",
              relationTo: "users",
              required: true,
              hasMany: false,
            },
            {
              admin: {
                description: "Type of contact method or communication channel.",
              },
              label: "Contact Type",
              name: "type",
              type: "select",
              options: [
                { label: "E-mail", value: "email" },
                { label: "WhatsApp", value: "whatsapp" },
                { label: "Telegram", value: "telegram" },
                { label: "Twitter/X", value: "twitter" },
                { label: "Instagram", value: "instagram" },
                { label: "Linked-In", value: "linkedin" },
                { label: "GitHub", value: "github" },
                { label: "Other", value: "other" },
              ],
              defaultValue: "email",
              required: true,
            },
            {
              admin: {
                description:
                  "Display label for this contact method (optional).",
              },
              label: "Display Label",
              name: "label",
              type: "text",
              maxLength: 100,
              required: false,
            },
            {
              admin: {
                description:
                  "The contact value (email address, phone number, URL, etc.).",
              },
              label: "Contact Value",
              name: "value",
              type: "text",
              maxLength: 100,
              required: true,
            },
          ],
        },
        {
          label: "Configuration & Display",
          fields: [
            {
              admin: {
                position: "sidebar",
                description: "Whether this contact method is currently active.",
              },
              label: "Status",
              name: "status",
              type: "select",
              options: [
                { label: "Active", value: "active" },
                { label: "Not Active", value: "inactive" },
              ],
              defaultValue: "active",
              required: true,
            },
            {
              admin: {
                position: "sidebar",
                description: "Whether this is the primary contact method.",
              },
              label: "Primary Contact",
              name: "primary",
              type: "checkbox",
              defaultValue: false,
            },
            {
              admin: {
                position: "sidebar",
                description:
                  "Display order for this contact method (lower numbers appear first).",
              },
              label: "Display Order",
              name: "order",
              type: "number",
              defaultValue: 0,
              required: true,
            },
            {
              admin: {
                description:
                  "Additional notes about this contact method (optional).",
              },
              label: "Notes",
              name: "notes",
              type: "textarea",
              maxLength: 500,
              required: false,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ operation, data, req }) => {
        if (operation === "create")
          if (!data.user)
            if (req.user)
              // eslint-disable-next-line no-param-reassign
              data.user = req.user?.id;

        return data;
      },
    ],
  },
};
