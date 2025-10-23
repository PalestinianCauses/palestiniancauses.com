// REVIEWED - 03

import { Field } from "payload";

import { messages } from "@/lib/messages";
import { validateDateInRange } from "@/lib/utils/dates";

export const ExperienceHeadline =
  "Career highlights: A snapshot of my professional life.";

export const ExperienceHeadlineSub = "My Professional Journey";

export const ExperienceField: Field = {
  admin: {
    description:
      "Comprehensive record of professional experience and relevant activities.",
  },
  label: "Professional Experience",
  name: "experience",
  type: "group",
  fields: [
    {
      admin: {
        description:
          "Summarize your entire professional experience section with a concise, impactful headline.",
      },
      label: "Headline",
      name: "headline",
      type: "text",
      defaultValue: ExperienceHeadline,
      maxLength: 80,
      required: true,
    },
    {
      admin: {
        description:
          "A sub-headline that provides additional context or information about the headline.",
      },
      label: "Sub-Headline",
      name: "headline-sub",
      type: "text",
      defaultValue: ExperienceHeadlineSub,
      maxLength: 32,
      required: true,
    },
    {
      admin: {
        description:
          "A formal photograph or image representing this professional experience (optional).",
      },
      label: "Experience Photograph",
      name: "photograph",
      type: "upload",
      relationTo: "media",
      hasMany: false,
      required: false,
    },
    {
      label: "Experience List",
      name: "list",
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
          maxLength: 100,
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
          maxLength: 100,
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
          maxLength: 68,
          required: true,
        },
        {
          admin: {
            description: "Position or role held during this experience.",
          },
          label: "Position Title",
          name: "position",
          type: "text",
          maxLength: 48,
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
          maxLength: 32,
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
            description:
              "Indicate if this is the current or on-going position.",
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
          minLength: 200,
          maxLength: 750,
          required: true,
        },
      ],
    },
  ],
};
