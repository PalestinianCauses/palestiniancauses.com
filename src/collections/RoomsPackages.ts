// REVIEWED - 04

import { CollectionConfig } from "payload";

import { isAdminOrSelf } from "@/access/global";
import { hasAnyRole } from "@/lib/permissions";
import { isObject, isString } from "@/lib/types/guards";

export const RoomsPackages: CollectionConfig = {
  slug: "rooms-packages",
  access: {
    create: async ({ req }) => {
      const { user } = req;
      if (!user) return false;

      if (hasAnyRole(user, ["admin-user", "system-user"])) return true;

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
    defaultColumns: [
      "id",
      "name",
      "status",
      "pricingType",
      "price",
      "createdAt",
    ],
    useAsTitle: "name",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Package Information",
          description: "Core package details and description",
          fields: [
            {
              admin: {
                hidden: true,
                position: "sidebar",
                description:
                  "The individual or entity responsible for abd associated with this package.",
              },
              label: "Package Owner",
              name: "user",
              type: "relationship",
              relationTo: "users",
              required: true,
            },
            {
              admin: {
                description:
                  "A compelling, memorable name that clearly identifies this service package and its value proposition.",
              },
              label: "Package Title",
              name: "name",
              type: "text",
              maxLength: 100,
              required: true,
            },
            {
              admin: {
                description:
                  "A comprehensive description that explains what this package includes, its benefits, and what clients can expect to receive.",
              },
              label: "Package Description",
              name: "description",
              type: "textarea",
              maxLength: 500,
              required: true,
            },
            {
              admin: {
                description:
                  "The primary client profile or audience for which this package is designed.",
              },
              label: "Intended Audience",
              name: "audienceIntended",
              type: "text",
              maxLength: 500,
              required: true,
            },
            {
              admin: {
                description:
                  "Select the individual services that are included in this comprehensive package offering.",
              },
              label: "Included Services",
              name: "services",
              type: "relationship",
              relationTo: "rooms-services",
              hasMany: true,
              required: true,
            },
          ],
        },
        {
          label: "Pricing & Duration",
          description: "Package pricing structure and timeline",
          fields: [
            {
              admin: {
                description:
                  "The pricing model for this package (fixed price, hourly, daily, project-based, or custom quote).",
              },
              label: "Pricing Model",
              name: "pricingType",
              type: "select",
              options: [
                {
                  label: "Fixed Price - One-time payment",
                  value: "fixed",
                },
                {
                  label: "Hourly Rate - Charged per hour",
                  value: "hourly",
                },
                {
                  label: "Daily Rate - Charged per day",
                  value: "daily",
                },
                {
                  label: "Project-Based - Custom project pricing",
                  value: "project",
                },
                {
                  label: "Custom Quote - Contact for pricing",
                  value: "custom",
                },
              ],
              required: true,
            },
            {
              admin: {
                condition: (data) => data.pricingType !== "custom",
                description:
                  "Package price in the selected currency (use 0 for custom quotes or hourly/daily rates).",
              },
              label: "Package Price",
              name: "price",
              type: "number",
              min: 0,
              defaultValue: 0,
              required: true,
            },
            {
              admin: {
                description:
                  "Currency for the package price (ISO 4217 standard currency codes).",
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
                description:
                  "Estimated time-frame for package delivery (e.g., '2-4 weeks', '1 month', 'On Going').",
              },
              label: "Package Duration",
              name: "duration",
              type: "text",
              maxLength: 56,
              required: false,
            },
          ],
        },
        {
          label: "Package Features",
          description: "Unique selling points and special features",
          fields: [
            {
              admin: {
                description:
                  "Key features, benefits, or unique selling points that make this package special and valuable to clients.",
              },
              label: "Package Features & Benefits",
              name: "features",
              type: "array",
              fields: [
                {
                  admin: {
                    description:
                      "A specific feature, benefit, or unique selling point of this package.",
                  },
                  label: "Feature or Benefit",
                  name: "feature",
                  type: "text",
                  maxLength: 100,
                  required: true,
                },
              ],
            },
            {
              admin: {
                description:
                  "Visual representation of this package (optional but recommended for better presentation).",
              },
              label: "Package Image",
              name: "image",
              type: "upload",
              relationTo: "media",
              required: false,
            },
          ],
        },
        {
          label: "Availability & Display",
          description: "Package status and presentation settings",
          fields: [
            {
              admin: {
                description:
                  "Current availability status of this package for client inquiries and bookings.",
              },
              label: "Package Status",
              name: "status",
              type: "select",
              options: [
                { label: "Available for New Clients", value: "available" },
                { label: "Currently Not Available", value: "unavailable" },
                {
                  label: "Coming Soon - Not Yet Available",
                  value: "coming-soon",
                },
              ],
              defaultValue: "available",
              required: true,
            },
            {
              admin: {
                description:
                  "Whether this package should be featured prominently in your offerings (appears first or highlighted).",
              },
              label: "Featured Package",
              name: "featured",
              type: "checkbox",
              defaultValue: false,
            },
            {
              admin: {
                description:
                  "Display order for this package in your packages list (lower numbers appear first).",
              },
              label: "Display Priority",
              name: "order",
              type: "number",
              defaultValue: 0,
              required: true,
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
          if (req.user)
            // eslint-disable-next-line no-param-reassign
            data.user = req.user.id;

        return data;
      },
    ],
  },
};
