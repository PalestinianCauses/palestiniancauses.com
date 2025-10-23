// REVIEWED - 02

import { Field } from "payload";

export const InformationField: Field = {
  admin: {
    description:
      "Essential personal and professional identification details that form the foundation of your professional profile.",
  },
  label: "Professional Identity",
  name: "information",
  type: "group",
  fields: [
    {
      admin: {
        description:
          "Your full legal name as it should appear in professional communications and documentation.",
      },
      label: "Full Name",
      name: "name",
      type: "text",
      maxLength: 16,
      required: true,
    },
    {
      admin: {
        description:
          "Your current professional title, role, or position that best describes your expertise and responsibilities.",
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
          "A compelling professional tagline that summarizes your expertise, value proposition, or professional focus in a single impactful statement.",
      },
      label: "Professional Headline",
      name: "headline",
      type: "text",
      maxLength: 56,
      required: true,
    },
    {
      admin: {
        description:
          "Your current professional availability status, indicating whether you are open to new opportunities or currently engaged.",
        position: "sidebar",
      },
      label: "Professional Availability",
      name: "status",
      type: "select",
      options: [
        { label: "Available for New Opportunities", value: "available" },
        { label: "Currently Engaged in Projects", value: "working" },
        { label: "Not Available for New Work", value: "unavailable" },
      ],
      defaultValue: "available",
      required: true,
    },
    {
      admin: {
        description:
          "A high-quality professional head-shot or profile photograph that represents your professional image (recommended but optional).",
        position: "sidebar",
      },
      label: "Professional Photograph",
      name: "photograph",
      type: "upload",
      relationTo: "media",
      hasMany: false,
      required: false,
    },
  ],
};
