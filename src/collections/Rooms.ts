// REVIEWED - 16

import { CollectionConfig } from "payload";

import { isAdminOrSelf } from "@/access/global";
import { messages } from "@/lib/messages";
import { validateDateInRange } from "@/lib/utils/dates";

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
    // read: isAdminOrSelf,
    // update: isAdminOrSelf,
    // delete: isAdminOrSelf,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Content",
    defaultColumns: ["id", "name", "slug", "createdAt"],
    useAsTitle: "name",
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
        description: "A unique, system-generated identifier for this Room.",
      },
      label: "Room Name",
      name: "name",
      type: "text",
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
          "Current publication state of the Room, indicating its visibility and availability.",
      },
      label: "Room Status",
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "In Progress", value: "in-progress" },
        { label: "Coming Soon", value: "coming-soon" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      admin: {
        description:
          "Formal personal and professional details displayed at the top of the Room profile.",
      },
      label: "Personal and Professional Information",
      name: "information",
      type: "group",
      fields: [
        {
          admin: {
            description:
              "Full legal name as it should appear in professional contexts.",
          },
          label: "Professional Name",
          name: "name",
          type: "text",
          maxLength: 16,
          required: true,
        },
        {
          admin: {
            description: "Current professional designation or job title.",
          },
          label: "Professional Title",
          name: "title",
          type: "text",
          maxLength: 32,
          required: true,
        },
        {
          admin: {
            description:
              "A brief, impactful statement summarizing your professional identity or expertise.",
          },
          label: "Professional Headline",
          name: "headline",
          type: "text",
          maxLength: 56,
          required: true,
        },
        {
          label: "Status",
          name: "status",
          type: "select",
          options: [
            { label: "Open to New Opportunities", value: "available" },
            { label: "Currently Engaged", value: "working" },
            { label: "Not Available", value: "unavailable" },
          ],
          defaultValue: "available",
          required: true,
        },
        {
          admin: {
            description:
              "A formal professional head-shot or profile photograph (optional).",
          },
          label: "Professional Photograph",
          name: "photograph",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: false,
        },
      ],
    },
    {
      admin: {
        description:
          "Personal introduction section, providing a detailed narrative about yourself, your values, and your journey.",
      },
      label: "About",
      name: "about",
      type: "group",
      fields: [
        {
          admin: {
            description:
              "A compelling headline that encapsulates your personal story or philosophy.",
          },
          label: "Headline",
          name: "headline",
          type: "text",
          maxLength: 56,
          required: true,
        },
        {
          admin: {
            description:
              "A personal photograph to visually introduce yourself (optional).",
          },
          label: "Photograph",
          name: "photograph",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: false,
        },
        {
          admin: {
            description:
              "A series of well-crafted paragraphs that together provide a comprehensive and authentic overview of who you are. Each paragraph should be between 350 and 500 characters. Please provide at least 3 paragraphs.",
          },
          label: "Paragraphs",
          name: "paragraphs",
          type: "array",
          minRows: 3,
          required: true,
          fields: [
            {
              admin: {
                description:
                  "A single paragraph (350-500 characters) that forms part of your personal narrative.",
              },
              label: "Paragraph",
              name: "paragraph",
              type: "textarea",
              minLength: 350,
              maxLength: 500,
              required: true,
            },
          ],
        },
      ],
    },
    {
      admin: {
        description:
          "Academic history, including institutions attended and degrees or certifications obtained.",
      },
      label: "Educational Background",
      name: "education",
      type: "array",
      fields: [
        {
          admin: {
            description: "Official name of the educational institution.",
          },
          label: "Institution Name",
          name: "institution",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Degree or qualification conferred." },
          label: "Degree or Qualification",
          name: "degree",
          type: "text",
          required: true,
        },
        {
          admin: { description: "Current completion status of the program." },
          label: "Program Status",
          name: "status",
          type: "select",
          options: [
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
            { label: "Cancelled", value: "cancelled" },
          ],
          required: true,
        },
        {
          admin: {
            description: "Month and year the educational program commenced.",
            date: {
              pickerAppearance: "monthOnly",
              minDate: new Date(2010, 0, 1, 0, 0, 0, 0),
              maxDate: new Date(
                new Date(
                  new Date().setUTCDate(new Date().getUTCDate() - 1),
                ).setUTCHours(0, 0, 0, 0),
              ),
            },
          },
          label: "Start Date",
          name: "dateStart",
          type: "date",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.status !== "in-progress",
            description:
              "Month and year the educational program was completed or ended.",
            date: { pickerAppearance: "monthOnly" },
          },
          label: "End Date",
          name: "dateEnd",
          type: "date",
          required: true,
          validate: (value, { siblingData }) => {
            if (
              !("dateStart" in siblingData) ||
              !siblingData.dateStart ||
              !(
                siblingData.dateStart instanceof Date ||
                typeof siblingData.dateStart === "string"
              )
            )
              return messages.forms.required("start date");

            const start = new Date(siblingData.dateStart);
            const end = new Date();
            end.setUTCDate(end.getUTCDate() - 1);

            return validateDateInRange(
              value,
              start,
              end,
              messages.forms.required("end date"),
              messages.forms.valid("end date"),
              messages.forms.date(start.toLocaleDateString(), "yesterday"),
            );
          },
        },
        {
          admin: {
            description:
              "Detailed description of academic focus, coursework, and notable achievements.",
          },
          label: "Program Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      admin: {
        description:
          "Comprehensive record of professional experience and relevant activities.",
      },
      label: "Professional Experience",
      name: "experience",
      type: "array",
      fields: [
        {
          admin: {
            description: "Specify the type of professional experience.",
          },
          label: "Experience Type",
          name: "type",
          type: "select",
          options: [
            { label: "Employment", value: "employment" },
            { label: "External Activities", value: "activity" },
          ],
          defaultValue: "employment",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "employment",
            description: "Official name of the employing company.",
          },
          label: "Company Name",
          name: "company",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
            description: "Official name of the organization involved.",
          },
          label: "Organization Name",
          name: "organization",
          type: "text",
          required: true,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.type === "activity",
            description:
              "Formal title of the activity, project, or initiative.",
          },
          label: "Activity or Project Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Position or role held during this experience.",
          },
          label: "Position Title",
          name: "position",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Indicate whether this position was remote.",
          },
          label: "Remote Position",
          name: "isRemote",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isRemote === false,
            description: "Physical location of the workplace.",
          },
          label: "Workplace Location",
          name: "location",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Month and year the position commenced.",
            date: {
              pickerAppearance: "monthOnly",
              minDate: new Date(2010, 0, 1, 0, 0, 0, 0),
              maxDate: new Date(
                new Date(
                  new Date().setUTCDate(new Date().getUTCDate() - 1),
                ).setUTCHours(0, 0, 0, 0),
              ),
            },
          },
          label: "Start Date",
          name: "dateStart",
          type: "date",
          required: true,
        },
        {
          admin: {
            description: "Indicate if this is the current or ongoing position.",
          },
          label: "Current Position",
          name: "isCurrent",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.isCurrent === false,
            description: "Month and year the position ended.",
            date: { pickerAppearance: "monthOnly" },
          },
          label: "End Date",
          name: "dateEnd",
          type: "date",
          required: true,
          validate: (value, { siblingData }) => {
            if (
              !("dateStart" in siblingData) ||
              !siblingData.dateStart ||
              !(
                siblingData.dateStart instanceof Date ||
                typeof siblingData.dateStart === "string"
              )
            )
              return messages.forms.required("start date");

            const start = new Date(siblingData.dateStart);
            const end = new Date();
            end.setUTCDate(end.getUTCDate() - 1);

            return validateDateInRange(
              value,
              start,
              end,
              messages.forms.required("end date"),
              messages.forms.valid("end date"),
              messages.forms.date(start.toLocaleDateString(), "yesterday"),
            );
          },
        },
        {
          admin: {
            description:
              "Official URL to the company, organization, or project (e.g., website, social media, or press release).",
          },
          label: "Reference Link",
          name: "link",
          type: "text",
          required: true,
        },
        {
          admin: {
            description:
              "Comprehensive description of responsibilities, achievements, and contributions.",
          },
          label: "Experience Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
    {
      admin: {
        description:
          "Catalog of professional qualifications, courses, and certifications.",
      },
      label: "Professional Qualifications",
      name: "qualification",
      type: "array",
      fields: [
        {
          admin: {
            description:
              "Full official title of the course, certification, or qualification.",
          },
          label: "Qualification Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Name of the issuing organization or platform.",
          },
          label: "Issuing Organization",
          name: "issuer",
          type: "text",
          required: true,
        },
        {
          admin: {
            description: "Month and year the qualification program commenced.",
            date: {
              pickerAppearance: "monthOnly",
              minDate: new Date(2010, 0, 1, 0, 0, 0, 0),
              maxDate: new Date(
                new Date(
                  new Date().setUTCDate(new Date().getUTCDate() - 1),
                ).setUTCHours(0, 0, 0, 0),
              ),
            },
          },
          label: "Start Date",
          name: "dateStart",
          type: "date",
          required: true,
        },
        {
          admin: {
            description:
              "Month and year the qualification was completed or awarded.",
            date: { pickerAppearance: "monthOnly" },
          },
          label: "End Date",
          name: "dateEnd",
          type: "date",
          required: true,
          validate: (value, { siblingData }) => {
            if (
              !("dateStart" in siblingData) ||
              !siblingData.dateStart ||
              !(
                siblingData.dateStart instanceof Date ||
                typeof siblingData.dateStart === "string"
              )
            )
              return messages.forms.required("start date");

            const start = new Date(siblingData.dateStart);
            const end = new Date();
            end.setUTCDate(end.getUTCDate() - 1);

            return validateDateInRange(
              value,
              start,
              end,
              messages.forms.required("end date"),
              messages.forms.valid("end date"),
              messages.forms.date(start.toLocaleDateString(), "yesterday"),
            );
          },
        },
        {
          admin: {
            description:
              "Optional: Official URL to the organization, course, or certification page.",
          },
          label: "Reference Link",
          name: "link",
          type: "text",
          required: false,
        },
        {
          admin: {
            description:
              "Indicate whether a certificate was awarded for this qualification.",
          },
          label: "Certificate Awarded",
          name: "hasCertificate",
          type: "checkbox",
          defaultValue: false,
        },
        {
          admin: {
            condition: (_, siblingData) => siblingData.hasCertificate === true,
            description: "Upload the official certificate document or image.",
          },
          label: "Certificate Document",
          name: "certificate",
          type: "upload",
          relationTo: "media",
          hasMany: false,
          required: true,
        },
        {
          admin: {
            description:
              "Detailed summary of knowledge, skills, and competencies acquired.",
          },
          label: "Qualification Description",
          name: "description",
          type: "textarea",
          required: true,
        },
      ],
    },
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
  ],
  hooks: {
    beforeChange: [
      ({ operation, req, data }) => {
        if (!req.user) return data;

        // eslint-disable-next-line no-param-reassign
        if (operation === "create") data.user = req.user.id;

        return data;
      },
    ],
  },
};
