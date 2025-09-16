// REVIEWED

import { CollectionConfig } from "payload";

import { isAdminOrSelf } from "@/access/global";
import { isObject, isString } from "@/lib/types/guards";

export const RoomsServices: CollectionConfig = {
  slug: "rooms-services",
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
        isObject(req.query.origin) &&
        "equals" in req.query.origin &&
        isString(req.query.origin.equals) &&
        req.query.origin.equals === "website"
      )
        return true;

      return isAdminOrSelf({ req });
    },
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Content",
    defaultColumns: ["id", "name", "status", "category", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        description: "A clear, descriptive name for this service.",
      },
      label: "Service Name",
      name: "name",
      type: "text",
      maxLength: 68,
      required: true,
    },
    {
      admin: {
        description: "A brief description of what this service entails.",
      },
      label: "Service Description",
      name: "description",
      type: "textarea",
      maxLength: 500,
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description: "Whether this service is currently available.",
      },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Available", value: "available" },
        { label: "Not Available", value: "unavailable" },
        { label: "Coming Soon", value: "coming-soon" },
      ],
      defaultValue: "available",
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description: "Categorize this service for better organization.",
      },
      label: "Service Category",
      name: "category",
      type: "relationship",
      relationTo: "service-categories",
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "Estimated duration for this service (e.g., '2-4 weeks', '1 day').",
      },
      label: "Duration",
      name: "duration",
      type: "text",
      maxLength: 56,
      required: false,
    },
    {
      admin: {
        description: "Key skills or technologies involved in this service.",
      },
      label: "Skills & Technologies",
      name: "skills",
      type: "array",
      fields: [
        {
          label: "Skill/Technology",
          name: "name",
          type: "text",
          maxLength: 48,
          required: true,
        },
      ],
    },
    {
      admin: {
        description: "Visual representation of this service (optional).",
      },
      label: "Service Image",
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "Display order for this service (lower numbers appear first).",
      },
      label: "Display Order",
      name: "order",
      type: "number",
      defaultValue: 0,
      required: true,
    },
  ],
};
