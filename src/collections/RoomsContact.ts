// REVIEWED

import { CollectionConfig } from "payload";

import { isAdminOrSelf } from "@/access/global";
import { isObject, isString } from "@/lib/types/guards";

export const RoomsContact: CollectionConfig = {
  slug: "rooms-contact",
  access: {
    create: async ({ req }) => {
      const { user } = req;
      if (!user) return false;

      if (user.role === "admin") return true;

      if (user.role === "system-user") {
        const room = await req.payload.find({
          collection: "rooms",
          where: { user: { equals: user.id } },
        });

        if (room.docs.length === 0) return false;

        return true;
      }

      return false;
    },
    read: async ({ req }) => {
      if (
        isObject(req.query) &&
        "equals" in req.query &&
        isString(req.query.equals) &&
        req.query.equals === "website"
      )
        return true;

      return isAdminOrSelf({ req });
    },
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Rooms Content",
    defaultColumns: ["id", "type", "value", "status", "createdAt"],
    useAsTitle: "value",
  },
  fields: [
    {
      admin: {
        description: "Type of contact method.",
      },
      label: "Contact Type",
      name: "type",
      type: "select",
      options: [
        { label: "E-mail", value: "email" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Telegram", value: "telegram" },
        { label: "Twitter/X", value: "twitter" },
        { label: "Linked-In", value: "linkedin" },
        { label: "GitHub", value: "github" },
        { label: "Other", value: "other" },
      ],
      defaultValue: "email",
      required: true,
    },
    {
      admin: {
        description: "Display label for this contact method (optional).",
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
        description: "Additional notes about this contact method (optional).",
      },
      label: "Notes",
      name: "notes",
      type: "textarea",
      maxLength: 500,
      required: false,
    },
  ],
};
