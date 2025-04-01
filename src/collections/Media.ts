// REVIEWED - 01
import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: { read: () => true },
  admin: { hidden: true },
  upload: true,
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
