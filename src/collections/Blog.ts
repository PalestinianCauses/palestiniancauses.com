// REVIEWED - 06
import { CollectionConfig } from "payload";

import {
  hasPermissionAccess,
  hasPermissionFieldAccess,
  isSelf,
} from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { User } from "@/payload-types";

export const Blog: CollectionConfig = {
  slug: "blogs",
  access: {
    admin: ({ req }) =>
      hasPermission(req.user, { resource: "blogs", action: "manage" }),
    create: hasPermissionAccess({ resource: "blogs", action: "create" }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "blogs", action: "read" })({ req }) ||
      isSelf("author")({ req }),
    update: ({ req }) =>
      hasPermissionAccess({ resource: "blogs", action: "update" })({ req }) ||
      isSelf("author")({ req }),
    delete: ({ req }) =>
      hasPermissionAccess({ resource: "blogs", action: "delete" })({ req }) ||
      isSelf("author")({ req }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "blogs",
        action: "manage",
      }),
    group: "Content",
    defaultColumns: ["title", "author", "status", "publishedAt", "createdAt"],
    useAsTitle: "title",
  },
  versions: { drafts: true },
  fields: [
    {
      access: {
        create: hasPermissionFieldAccess("blogs.author", "create"),
        update: hasPermissionFieldAccess("blogs.author", "update"),
      },
      admin: { position: "sidebar" },
      label: "Author",
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
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
    {
      access: {
        create: hasPermissionFieldAccess("blogs.status", "create"),
        update: hasPermissionFieldAccess("blogs.status", "update"),
      },
      admin: { position: "sidebar" },
      label: "Status",
      name: "status",
      type: "text",
      defaultValue: "pending",
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req }) => {
        if (!data.author)
          if (req.user)
            // eslint-disable-next-line no-param-reassign
            data.author = req.user.id;

        if (hasPermission(req.user, { resource: "blogs", action: "publish" }))
          // eslint-disable-next-line no-param-reassign
          data.status = "approved";

        return data;
      },
    ],
  },
};
