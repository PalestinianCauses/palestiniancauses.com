// REVIEWED - 29

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { Room, User } from "@/payload-types";

import { AboutField } from "./rooms/fields/about";
import { EducationField } from "./rooms/fields/education";
import { ExperienceField } from "./rooms/fields/experience";
import { InformationField } from "./rooms/fields/information";
import { QualificationField } from "./rooms/fields/qualification";
import { Skill } from "./rooms/fields/skill";

export const ServicesHeadline =
  "Crafting Solutions to Elevate Your Vision: My Core Offerings";
export const ServicesHeadlineSub = "A Menu of Professional Services";

export const PackagesHeadline =
  "Your Roadmap to Results: A Clear Path to Achieving Your Goals";
export const PackagesHeadlineSub = "Curated Packages for Common Needs";

export const Rooms: CollectionConfig = {
  slug: "rooms",
  access: {
    create: async ({ req }) => {
      if (
        hasPermissionAccess({ resource: "rooms", action: "create" })({ req })
      ) {
        const room = await req.payload.find({
          collection: "rooms",
          where: { user: { equals: req.user?.id } },
        });

        if (room.docs.length === 0) return true;

        return false;
      }

      return false;
    },
    read: ({ req }) =>
      hasPermissionAccess({ resource: "rooms", action: "read" })({ req }) ||
      isSelf("user")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "rooms", action: "update" })({ req }) ||
      isSelf("user")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "rooms", action: "delete" })({ req }) ||
      isSelf("user")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "rooms.admin",
        action: "read",
      }),
    group: "Rooms Content",
    defaultColumns: ["id", "name", "slug", "status", "createdAt"],
    useAsTitle: "name",
    preview: (doc) => {
      if (doc.slug)
        return [process.env.NEXT_PUBLIC_URL! + doc.slug].join("/rooms/");
      return null;
    },
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Basic Information",
          description:
            "Essential room configuration and identification details",
          fields: [
            {
              admin: { hidden: true },
              label: "Associated User Account",
              name: "user",
              type: "relationship",
              relationTo: "users",
              unique: true,
              required: true,
            },
            {
              admin: {
                description:
                  "A unique, memorable name for this professional room. This will be displayed prominently and used in the URL.",
                position: "sidebar",
              },
              label: "Room Name",
              name: "name",
              type: "text",
              maxLength: 16,
              unique: true,
              required: true,
            },
            {
              admin: {
                readOnly: true,
                components: {
                  Field: {
                    path: "../components/payload/fields/slug#default",
                    clientProps: {
                      description:
                        "A URL-friendly, unique identifier automatically generated from the room name.",
                      sourcePath: "name",
                      slugPath: "slug",
                      label: "URL Slug",
                      readOnly: true,
                      disabled: true,
                    },
                  },
                },
                position: "sidebar",
              },
              label: "URL Slug",
              name: "slug",
              type: "text",
              unique: true,
              required: true,
            },
            {
              admin: {
                description:
                  "Controls the visibility and accessibility of this room to public visitors.",
                position: "sidebar",
              },
              label: "Publication Status",
              name: "status",
              type: "select",
              options: [
                { label: "Draft - Not visible to public", value: "draft" },
                { label: "Published - Visible to public", value: "published" },
              ],
              defaultValue: "draft",
              required: true,
            },
          ],
        },
        {
          label: "Personal Profile",
          description: "Personal information and professional identity",
          fields: [InformationField, AboutField],
        },
        {
          label: "Professional Background",
          description:
            "Educational qualifications, work experience, and professional skills",
          fields: [EducationField, ExperienceField, QualificationField, Skill],
        },
        {
          label: "Business Services",
          description:
            "Professional services and service packages offered to clients",
          fields: [
            {
              type: "group",
              name: "services",
              label: "Professional Services",
              admin: {
                description:
                  "Configure your professional services offering, including section presentation and service assignments.",
                condition: (data) =>
                  data.status === "published" || data.information?.title,
              },
              fields: [
                {
                  admin: {
                    description:
                      "A compelling headline that introduces your services section to visitors.",
                    position: "sidebar",
                  },
                  label: "Services Section Headline",
                  name: "headline",
                  type: "text",
                  defaultValue: ServicesHeadline,
                  maxLength: 80,
                  required: true,
                },
                {
                  admin: {
                    description:
                      "A descriptive sub-headline that explains the value and purpose of your services.",
                    position: "sidebar",
                  },
                  label: "Services Section Sub-Headline",
                  name: "headline-sub",
                  type: "text",
                  defaultValue: ServicesHeadlineSub,
                  maxLength: 48,
                  required: true,
                },
                {
                  admin: {
                    description:
                      "Select and organize the professional services you offer to clients and collaborators.",
                  },
                  label: "Available Services",
                  name: "list",
                  type: "relationship",
                  relationTo: "rooms-services",
                  hasMany: true,
                  required: false,
                  // eslint-disable-next-line arrow-body-style
                  filterOptions: (siblingData) => {
                    return siblingData.user
                      ? {
                          user: {
                            equals: siblingData.user?.id,
                          },
                        }
                      : { user: {} };
                  },
                },
              ],
            },
            {
              type: "group",
              name: "packages",
              label: "Service Packages",
              admin: {
                description:
                  "Create bundled service offerings with pricing and comprehensive packages for clients.",
                condition: (data) =>
                  data.status === "published" ||
                  data.services?.list?.length !== 0,
              },
              fields: [
                {
                  admin: {
                    description:
                      "A compelling headline that introduces your service packages to potential clients.",
                    position: "sidebar",
                  },
                  label: "Packages Section Headline",
                  name: "headline",
                  type: "text",
                  defaultValue: PackagesHeadline,
                  maxLength: 80,
                  required: true,
                },
                {
                  admin: {
                    description:
                      "A descriptive sub-headline explaining your service packages, pricing approach, and value proposition.",
                    position: "sidebar",
                  },
                  label: "Packages Section Sub-Headline",
                  name: "headline-sub",
                  type: "text",
                  defaultValue: PackagesHeadlineSub,
                  maxLength: 48,
                  required: true,
                },
                {
                  admin: {
                    description:
                      "Configure service packages with bundled offerings, pricing, and comprehensive solutions.",
                  },
                  label: "Service Packages",
                  name: "list",
                  type: "relationship",
                  relationTo: "rooms-packages",
                  hasMany: true,
                  required: false,
                  // eslint-disable-next-line arrow-body-style
                  filterOptions: (siblingData) => {
                    return siblingData.user
                      ? {
                          user: {
                            equals: siblingData.user.id,
                          },
                        }
                      : { user: {} };
                  },
                },
              ],
            },
          ],
        },
        {
          label: "Contact Information",
          description:
            "Communication methods and contact details for client inquiries",
          fields: [
            {
              admin: {
                description:
                  "Configure multiple contact methods and communication channels for client inquiries and collaboration opportunities.",
                condition: (data) =>
                  data.status === "published" || data.information?.title,
              },
              label: "Contact Methods",
              name: "contact",
              type: "relationship",
              relationTo: "rooms-contact",
              hasMany: true,
              required: false,
              // eslint-disable-next-line arrow-body-style
              filterOptions: (siblingData) => {
                return {
                  user: {
                    equals: siblingData.user?.id,
                  },
                };
              },
            },
          ],
        },
        {
          label: "Navigation & SEO",
          description:
            "Auto-generated navigation and search engine optimization",
          fields: [
            {
              admin: {
                readOnly: true,
                description:
                  "Automatically generated navigation links for sections containing content. These links appear in the room's navigation menu.",
                position: "sidebar",
              },
              label: "Section Navigation Links",
              name: "links",
              type: "array",
              fields: [
                {
                  label: "Section Name",
                  name: "label",
                  type: "text",
                  required: true,
                },
                {
                  label: "Section Link",
                  name: "href",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ operation, req, data }) => {
        if (!req.user) return data;

        if (operation === "create")
          if (!data.user)
            // eslint-disable-next-line no-param-reassign
            data.user = req.user.id;

        return data;
      },
      ({ data }) => {
        const links: NonNullable<Room["links"]> = [];

        if (
          data.about &&
          data.about.paragraphs &&
          Array.isArray(data.about.paragraphs) &&
          data.about.paragraphs.length !== 0
        )
          links.push({ label: "about", href: "#about" });

        if (
          data.education &&
          data.education.list &&
          Array.isArray(data.education.list) &&
          data.education.list.length !== 0
        )
          links.push({ label: "education", href: "#education" });

        if (
          data.experience &&
          data.experience.list &&
          Array.isArray(data.experience.list) &&
          data.experience.list.length !== 0
        )
          links.push({ label: "experience", href: "#experience" });

        if (
          data.qualification &&
          data.qualification.list &&
          Array.isArray(data.qualification.list) &&
          data.qualification.list.length !== 0
        )
          links.push({ label: "qualification", href: "#qualification" });

        if (
          data.skills &&
          Array.isArray(data.skills) &&
          data.skills.length !== 0
        )
          links.push({ label: "skills", href: "#skills" });

        if (
          data.services &&
          data.services.list &&
          Array.isArray(data.services.list) &&
          data.services.list.length !== 0
        )
          links.push({ label: "services", href: "#services" });

        if (
          data.packages &&
          data.packages.list &&
          Array.isArray(data.packages.list) &&
          data.packages.list.length !== 0
        )
          links.push({ label: "packages", href: "#packages" });

        if (
          data.contact &&
          Array.isArray(data.contact) &&
          data.contact.length !== 0
        )
          links.push({ label: "contact", href: "#contact" });

        // eslint-disable-next-line no-param-reassign
        data.links = links;

        return data;
      },
    ],
  },
};
