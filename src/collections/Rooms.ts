// REVIEWED - 24

import { CollectionConfig } from "payload";

import { isAdminOrSelf } from "@/access/global";
import { isObject, isString } from "@/lib/types/guards";

import { AboutField } from "./rooms/fields/about";
import { EducationField } from "./rooms/fields/education";
import { ExperienceField } from "./rooms/fields/experience";
import { InformationField } from "./rooms/fields/information";
import { QualificationField } from "./rooms/fields/qualification";

export const Rooms: CollectionConfig = {
  slug: "rooms",
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

        if (room.docs.length === 0) return true;

        return false;
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
    defaultColumns: ["id", "name", "slug", "createdAt"],
    useAsTitle: "name",
    preview: (doc) => {
      if (doc.slug)
        return [process.env.NEXT_PUBLIC_URL! + doc.slug].join("/rooms/");
      return null;
    },
  },
  fields: [
    {
      admin: { hidden: true },
      label: "User",
      name: "user",
      type: "relationship",
      relationTo: "users",
      unique: true,
      required: true,
    },
    {
      admin: {
        description: "A unique name for this Room, chosen by the user.",
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
              description: "A URL-friendly, unique identifier for this Room.",
              sourcePath: "name",
              slugPath: "slug",
              label: "Slug",
              readOnly: true,
              disabled: true,
            },
          },
        },
      },
      label: "Room Slug",
      name: "slug",
      type: "text",
      unique: true,
      required: true,
    },
    {
      admin: {
        description:
          "The publication status of the Room, controlling its visibility to users.",
      },
      label: "Room Publication Status",
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
    },
    InformationField,
    AboutField,
    EducationField,
    ExperienceField,
    QualificationField,
    {
      admin: {
        description:
          "Comprehensive list of skills and corresponding proficiency levels.",
      },
      label: "Skills and Competencies",
      name: "skills",
      type: "array",
      fields: [
        {
          admin: {
            description: "Categorize related skills under a formal group.",
          },
          label: "Skill Category",
          name: "category",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Enumerate individual skills within this category.",
          },
          label: "Skills in Category",
          name: "skillsCategorized",
          type: "array",
          required: true,
          fields: [
            {
              admin: {
                description: "Official name of the skill.",
              },
              label: "Skill Name",
              name: "name",
              type: "text",
              required: true,
            },
            {
              admin: {
                description:
                  "Select the proficiency level that best represents your expertise in this skill.",
              },
              label: "Proficiency Level",
              name: "level",
              type: "select",
              options: [
                { label: "Beginner", value: "beginner" },
                { label: "Intermediate", value: "intermediate" },
                { label: "Advanced", value: "advanced" },
                { label: "Expert", value: "expert" },
              ],
              defaultValue: "expert",
              required: true,
            },
          ],
        },
      ],
    },
    {
      admin: {
        description:
          "Services you offer to clients and potential collaborators.",
      },
      label: "Services",
      name: "services",
      type: "relationship",
      relationTo: "rooms-services",
      hasMany: true,
      required: false,
    },
    {
      admin: {
        description: "Service packages with pricing and bundled offerings.",
      },
      label: "Service Packages",
      name: "packages",
      type: "relationship",
      relationTo: "rooms-packages",
      hasMany: true,
      required: false,
    },
    {
      admin: {
        description: "Contact information and methods for reaching you.",
      },
      label: "Contact Information",
      name: "contact",
      type: "relationship",
      relationTo: "rooms-contact",
      hasMany: true,
      required: false,
    },
    {
      admin: {
        readOnly: true,
        description:
          "Auto-generated navigation links for sections with content.",
      },
      label: "Links",
      name: "links",
      type: "array",
      fields: [
        {
          label: "Name",
          name: "label",
          type: "text",
          required: true,
        },
        {
          label: "Link",
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ operation, req, data }) => {
        if (!req.user) return data;

        // eslint-disable-next-line no-param-reassign
        if (operation === "create") data.user = req.user.id;

        return data;
      },
      ({ data }) => {
        const links: { label: string; href: string }[] = [];

        if (
          data.about &&
          data.about.paragraphs &&
          Array.isArray(data.about.paragraphs) &&
          data.about.paragraphs.length > 0
        )
          links.push({ label: "about", href: "#about" });

        if (
          data.education &&
          data.education.list &&
          Array.isArray(data.education.list) &&
          data.education.list.length > 0
        )
          links.push({ label: "education", href: "#education" });

        if (
          data.experience &&
          data.experience.list &&
          Array.isArray(data.experience.list) &&
          data.experience.list.length > 0
        )
          links.push({ label: "experience", href: "#experience" });

        if (
          data.qualification &&
          data.qualification.list &&
          Array.isArray(data.qualification.list) &&
          data.qualification.list.length > 0
        )
          links.push({ label: "qualification", href: "#qualification" });

        if (data.skills && Array.isArray(data.skills) && data.skills.length > 0)
          links.push({ label: "skills", href: "#skills" });

        if (
          data.services &&
          Array.isArray(data.services) &&
          data.services.length > 0
        )
          links.push({ label: "services", href: "#services" });

        if (
          data.packages &&
          Array.isArray(data.packages) &&
          data.packages.length > 0
        )
          links.push({ label: "packages", href: "#packages" });

        if (
          data.contact &&
          Array.isArray(data.contact) &&
          data.contact.length > 0
        )
          links.push({ label: "contact", href: "#contact" });

        // eslint-disable-next-line no-param-reassign
        data.links = links;

        return data;
      },
    ],
    beforeRead: [],
  },
};
