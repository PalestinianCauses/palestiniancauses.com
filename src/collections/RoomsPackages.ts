// REVIEWED - 01

import { CollectionConfig } from "payload";

import { isAdminOrSelf } from "@/access/global";
import { hasRole } from "@/lib/permissions";
import { isObject, isString } from "@/lib/types/guards";

export const RoomsPackages: CollectionConfig = {
  slug: "rooms-packages",
  access: {
    create: async ({ req }) => {
      const { user } = req;
      if (!user) return false;

      if (hasRole(user, "admin-user")) return true;

      if (hasRole(user, "system-user")) {
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
    group: "Rooms Content",
    defaultColumns: ["id", "name", "status", "type", "price", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      admin: {
        description: "A compelling name for this service package.",
      },
      label: "Package Name",
      name: "name",
      type: "text",
      maxLength: 100,
      required: true,
    },
    {
      admin: {
        description: "A brief description of what this package includes.",
      },
      label: "Package Description",
      name: "description",
      type: "textarea",
      maxLength: 500,
      required: true,
    },
    {
      admin: {
        description: "The services included in this package.",
      },
      label: "Included Services",
      name: "services",
      type: "relationship",
      relationTo: "rooms-services",
      hasMany: true,
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description: "Whether this package is currently available.",
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
        description: "Package pricing type.",
      },
      label: "Pricing Type",
      name: "pricingType",
      type: "select",
      options: [
        { label: "Fixed Price", value: "fixed" },
        { label: "Hourly Rate", value: "hourly" },
        { label: "Daily Rate", value: "daily" },
        { label: "Project-Based", value: "project" },
        { label: "Custom Quote", value: "custom" },
      ],
      required: true,
    },
    {
      admin: {
        condition: (data) => data.pricingType !== "custom",
        position: "sidebar",
        description: "Package price (use 0 for custom quotes).",
      },
      label: "Price",
      name: "price",
      type: "number",
      min: 0,
      defaultValue: 0,
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description: "Currency for the price (ISO 4217 code).",
      },
      label: "Currency",
      name: "currency",
      type: "select",
      options: [
        { label: "US Dollar (USD)", value: "USD" },
        { label: "Euro (EUR)", value: "EUR" },
        { label: "Israeli Shekel (ILS)", value: "ILS" },
      ],
      defaultValue: "USD",
      required: true,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "Estimated duration for this package (e.g., '2-4 weeks', '1 month').",
      },
      label: "Duration",
      name: "duration",
      type: "text",
      maxLength: 56,
      required: false,
    },
    {
      admin: {
        description: "What makes this package special or different.",
      },
      label: "Package Features",
      name: "features",
      type: "array",
      fields: [
        {
          label: "Feature",
          name: "feature",
          type: "text",
          maxLength: 100,
          required: true,
        },
      ],
    },
    {
      admin: {
        position: "sidebar",
        description: "Visual representation of this package (optional).",
      },
      label: "Package Image",
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      admin: {
        position: "sidebar",
        description: "Whether this package is featured (appears prominently).",
      },
      label: "Featured Package",
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      admin: {
        position: "sidebar",
        description:
          "Display order for this package (lower numbers appear first).",
      },
      label: "Display Order",
      name: "order",
      type: "number",
      defaultValue: 0,
      required: true,
    },
  ],
};
