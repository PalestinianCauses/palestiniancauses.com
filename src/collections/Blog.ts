// REVIEWED
import { CollectionConfig } from "payload";

import { isAdminOrSelf, isAdminOrSystemUser } from "@/access/global";

export const Blog: CollectionConfig = {
  slug: "blogs",
  access: {
    read: isAdminOrSelf,
    create: isAdminOrSystemUser,
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "author", "status", "publishedAt", "createdAt"],
    useAsTitle: "title",
    preview: (doc) => {
      if (doc.slug)
        return [process.env.NEXT_PUBLIC_SITE_URL! + doc.slug].join("/blogs/");
      return null;
    },
  },
  versions: { drafts: true },
  fields: [
    {
      label: "Title",
      name: "title",
      type: "text",
      required: true,
    },
    {
      admin: {
        readOnly: true,
        position: "sidebar",
        components: {
          Field: {
            path: "../components/payload/fields/slug#default",
            clientProps: {
              path: "slug",
              sourcePath: "title",
              slugPath: "slug",
              label: "Slug",
              readOnly: true,
            },
          },
        },
      },
      label: "Slug",
      name: "slug",
      type: "text",
      index: true,
      required: true,
    },
  ],
};
