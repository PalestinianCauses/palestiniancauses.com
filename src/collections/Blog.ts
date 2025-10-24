// REVIEWED - 04
import { CollectionConfig } from "payload";

import { hasPermissionAccess } from "@/access/global";

export const Blog: CollectionConfig = {
  slug: "blogs",
  access: {
    read: hasPermissionAccess({ resource: "blogs", action: "read" }),
    create: hasPermissionAccess({ resource: "blogs", action: "create" }),
    update: hasPermissionAccess({ resource: "blogs", action: "update" }),
    delete: hasPermissionAccess({ resource: "blogs", action: "delete" }),
  },
  admin: {
    group: "Content",
    defaultColumns: ["title", "author", "status", "publishedAt", "createdAt"],
    useAsTitle: "title",
    preview: (doc) => {
      if (doc.slug)
        return [process.env.NEXT_PUBLIC_URL! + doc.slug].join("/blogs/");
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
              description: "",
              sourcePath: "title",
              slugPath: "slug",
              label: "Slug",
              readOnly: true,
              disabled: true,
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
