// REVIEWED

import { Field } from "payload";

import { messages } from "@/lib/messages";
import { validateDateInRange } from "@/lib/utils/dates";

export const QualificationHeadline =
  "Beyond the Classroom: A Commitment to Lifelong Learning and Mastery.";

export const QualificationField: Field = {
  admin: {
    description:
      "Catalog of professional qualifications, courses, and certifications.",
  },
  label: "Professional Qualifications",
  name: "qualification",
  type: "group",
  fields: [
    {
      admin: {
        description:
          "A concise headline summarizing your professional qualification, course, or certification.",
      },
      label: "Headline",
      name: "headline",
      type: "text",
      defaultValue: QualificationHeadline,
      maxLength: 80,
      required: true,
    },
    {
      admin: {
        description:
          "A formal photograph or image representing this qualification, course, or certification (optional).",
      },
      label: "Qualification Photograph",
      name: "photograph",
      type: "upload",
      relationTo: "media",
      hasMany: false,
      required: false,
    },
    {
      label: "Qualification List",
      name: "list",
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
          maxLength: 68,
          required: true,
        },
        {
          admin: {
            description: "Name of the issuing organization or platform.",
          },
          label: "Issuing Organization",
          name: "issuer",
          type: "text",
          maxLength: 68,
          required: true,
        },
        {
          admin: {
            description: "Month and year the qualification program commenced.",
            date: {
              pickerAppearance: "monthOnly",
              minDate: new Date(Date.UTC(2010, 0, 1, 0, 0, 0, 0)),
              maxDate: (() => {
                const d = new Date();

                d.setUTCDate(d.getUTCDate() - 1);
                d.setUTCHours(0, 0, 0, 0);

                return d;
              })(),
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

            // Normalize start and end to 00:00:00 UTC for date-only comparison
            const start = new Date(siblingData.dateStart);
            start.setUTCHours(0, 0, 0, 0);
            const end = new Date();
            end.setUTCDate(end.getUTCDate() - 1);
            end.setUTCHours(0, 0, 0, 0);

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
      ],
    },
  ],
};
