// REVIEWED

import { Field } from "payload";

export const InformationField: Field = {
  admin: {
    description:
      "Formal personal and professional details displayed at the top of the room profile.",
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
      label: "Name",
      name: "name",
      type: "text",
      maxLength: 16,
      required: true,
    },
    {
      admin: {
        description: "Current professional designation or job title.",
      },
      label: "Title",
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
      label: "Headline",
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
      label: "Photograph",
      name: "photograph",
      type: "upload",
      relationTo: "media",
      hasMany: false,
      required: false,
    },
  ],
};
