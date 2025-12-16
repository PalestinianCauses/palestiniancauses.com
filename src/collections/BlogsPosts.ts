// REVIEWED

import { CollectionConfig, PayloadRequest } from "payload";

import { hasPermissionFieldAccess } from "@/access/global";
import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { hasPermission } from "@/lib/permissions";
import { isNumber, isObject, isString } from "@/lib/types/guards";
import { BlogsPost, User } from "@/payload-types";

// Helper: Check if user is owner of any blog room
const isAnyBlogRoomOwner = async (req: PayloadRequest): Promise<boolean> => {
  if (!req.user?.id) return false;

  const rooms = await actionSafeExecute(
    req.payload.find({
      collection: "blogs-rooms",
      where: { roomOwner: { equals: req.user.id } },
      limit: 1,
      depth: 0,
    }),
    messages.http.serverError,
  );

  if (!rooms.data || rooms.error || rooms.data.docs.length === 0) return false;

  return true;
};

// Helper: Check if user is author in any blog room
const isAnyBlogRoomAuthor = async (req: PayloadRequest): Promise<boolean> => {
  if (!req.user?.id) return false;

  const rooms = await actionSafeExecute(
    req.payload.find({
      collection: "blogs-rooms",
      where: { authors: { equals: req.user.id } },
      limit: 1,
      depth: 0,
    }),
    messages.http.serverError,
  );

  if (!rooms.data || rooms.error || rooms.data.docs.length === 0) return false;

  return true;
};

// Helper: Get blog room ID from post (handles both ID and populated object)
const getBlogRoomId = (post: BlogsPost | Partial<BlogsPost>): number | null => {
  if (!post.blogRoom) return null;

  return isNumber(post.blogRoom) ? post.blogRoom : post.blogRoom.id;
};

// Helper: Check if user is owner of a specific blog room
const isBlogRoomOwner = async (
  req: PayloadRequest,
  roomId: number,
): Promise<boolean> => {
  if (!req.user?.id) return false;

  const room = await actionSafeExecute(
    req.payload.findByID({
      collection: "blogs-rooms",
      id: roomId,
      depth: 0,
    }),
    messages.http.serverError,
  );

  if (!room.data || room.error) return false;

  const owner = isNumber(room.data.roomOwner)
    ? room.data.roomOwner
    : room.data.roomOwner.id;

  return owner === req.user.id;
};

// Access control: Admin
const accessAdmin = ({ req }: { req: PayloadRequest }) =>
  hasPermission(req.user, { resource: "blogs-posts", action: "manage" });

const accessCreate = async ({ req }: { req: PayloadRequest }) => {
  if (hasPermission(req.user, { resource: "blogs-posts", action: "create" }))
    return true;

  const isOwner = await isAnyBlogRoomOwner(req);
  const isAuthor = await isAnyBlogRoomAuthor(req);
  return isOwner || isAuthor;
};

// Helper: Check if user is in authors array
const isBlogPostAuthor = (post: BlogsPost, userId: number): boolean => {
  // Check authors array
  if (post.authors && post.authors.length !== 0)
    return post.authors.some((author) => {
      const authorId = isNumber(author) ? author : author.id;
      return authorId === userId;
    });

  return false;
};

// Access control: Read
const accessRead = async ({
  req,
  id,
}: {
  req: PayloadRequest;
  id?: string | number;
}) => {
  if (hasPermission(req.user, { resource: "blogs-posts", action: "read" }))
    return true;

  if (!req.user?.id || !id) return false;

  const post = await actionSafeExecute(
    req.payload.findByID({
      collection: "blogs-posts",
      id: isString(id) ? parseInt(id, 10) : id,
      depth: 1,
    }),
    messages.http.serverError,
  );

  if (!post.data || post.error) return false;

  if (isBlogPostAuthor(post.data, req.user.id)) return true;

  const roomId = getBlogRoomId(post.data);
  if (!roomId) return false;

  return isBlogRoomOwner(req, roomId);
};

// Access control: Update
const accessUpdate = async ({
  req,
  id,
}: {
  req: PayloadRequest;
  id?: string | number;
}) => {
  if (hasPermission(req.user, { resource: "blogs-posts", action: "update" }))
    return true;

  if (!req.user?.id || !id) return false;

  const post = await actionSafeExecute(
    req.payload.findByID({
      collection: "blogs-posts",
      id: isString(id) ? parseInt(id, 10) : id,
      depth: 1,
    }),
    messages.http.serverError,
  );

  if (!post.data || post.error) return false;

  if (isBlogPostAuthor(post.data, req.user.id)) return true;

  const roomId = getBlogRoomId(post.data);
  if (!roomId) return false;

  return isBlogRoomOwner(req, roomId);
};

// Access control: Delete
const accessDelete = async ({
  req,
  id,
}: {
  req: PayloadRequest;
  id?: string | number;
}) => {
  if (hasPermission(req.user, { resource: "blogs-posts", action: "delete" }))
    return true;

  if (!req.user?.id || !id) return false;

  const post = await actionSafeExecute(
    req.payload.findByID({
      collection: "blogs-posts",
      id: isString(id) ? parseInt(id, 10) : id,
      depth: 1,
    }),
    messages.http.serverError,
  );

  if (!post.data || post.error) return false;

  const roomId = getBlogRoomId(post.data);
  if (!roomId) return false;

  return isBlogRoomOwner(req, roomId);
};

export const BlogsPosts: CollectionConfig = {
  slug: "blogs-posts",
  access: {
    admin: accessAdmin,
    create: accessCreate,
    read: accessRead,
    update: accessUpdate,
    delete: accessDelete,
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "blogs-posts",
        action: "manage",
      }),
    group: "Blogs Content",
    defaultColumns: [
      "id",
      "blogRoom",
      "title",
      "status",
      "publishedAt",
      "createdAt",
    ],
    useAsTitle: "title",
    preview: (doc) => {
      const document = doc as unknown as BlogsPost;
      if (document.slug && document.blogRoom) {
        const room = isObject(document.blogRoom) ? document.blogRoom : null;

        if (!room) return null;

        return [
          process.env.NEXT_PUBLIC_URL!,
          // eslint-disable-next-line prefer-template
          room.slug + "/" + document.slug,
        ].join("/blogs/");
      }

      return null;
    },
  },
  fields: [
    {
      admin: {
        description:
          "The blog room this post belongs to. This determines where the post will be published.",
      },
      label: "Blog Room",
      name: "blogRoom",
      type: "relationship",
      relationTo: "blogs-rooms",
      hasMany: false,
      required: true,
      index: true,
    },
    {
      label: "Title",
      name: "title",
      type: "text",
      minLength: 16,
      maxLength: 100,
      required: true,
    },
    {
      admin: {
        readOnly: true,
        components: {
          Field: {
            path: "../components/payload/fields/slug#default",
            clientProps: {
              description:
                "A URL-friendly, unique identifier automatically generated from the title.",
              sourcePath: "title",
              slugPath: "slug",
              label: "URL Slug",
              readOnly: true,
              disabled: true,
            },
          },
        },
      },
      label: "URL Slug",
      name: "slug",
      type: "text",
      unique: true,
      required: true,
      index: true,
    },
    {
      admin: {
        description:
          "A brief summary or excerpt of the post. This will be displayed in post listings and previews.",
      },
      label: "Excerpt",
      name: "excerpt",
      type: "textarea",
      maxLength: 500,
      required: true,
    },
    {
      admin: {
        description:
          "The main content of the blog post. Use rich text formatting for better presentation.",
      },
      label: "Content",
      name: "content",
      type: "richText",
      required: true,
    },
    {
      admin: {
        description:
          "An optional featured image that will be displayed prominently with the post.",
      },
      label: "Featured Image",
      name: "imageFeatured",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      access: {
        create: hasPermissionFieldAccess("blogs-posts.status", "create"),
        update: hasPermissionFieldAccess("blogs-posts.status", "update"),
      },
      admin: { position: "sidebar" },
      label: "Status",
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Archived", value: "archived" },
      ],
      defaultValue: "draft",
      required: true,
      index: true,
    },
    {
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description:
          "The date and time when this post should be published. Leave empty to publish immediately.",
      },
      label: "Published At",
      name: "publishedAt",
      type: "date",
      required: false,
      index: true,
    },
    {
      access: {
        create: hasPermissionFieldAccess("blogs-posts.authors", "create"),
        update: hasPermissionFieldAccess("blogs-posts.authors", "update"),
      },
      admin: {
        description:
          "Users who contributed to writing or creating this post content. At least one author is required. Multiple authors are allowed. The creator is automatically added.",
      },
      label: "Authors",
      name: "authors",
      type: "relationship",
      relationTo: "users",
      minRows: 1,
      hasMany: true,
      required: true,
    },
    {
      admin: {
        description:
          "Users who translated this post from another language. Leave empty if this is an original post. Multiple translators are allowed.",
      },
      label: "Translators",
      name: "translators",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: false,
    },
    {
      admin: {
        description:
          "Categories that this post belongs to. Helps organize and filter posts.",
      },
      label: "Categories",
      name: "categories",
      type: "relationship",
      relationTo: "blogs-categories",
      hasMany: true,
      required: false,
    },
    {
      admin: {
        description:
          "A list of references, sources, or related articles. Can include original articles that were translated or general references.",
      },
      label: "References",
      name: "references",
      type: "array",
      fields: [
        {
          label: "Title",
          name: "title",
          type: "text",
          required: true,
        },
        {
          label: "URL",
          name: "url",
          type: "text",
          required: true,
        },
        {
          admin: {
            description:
              "The type of reference. 'original' means this post was translated from this article. 'reference' means it's a general source or related article.",
          },
          label: "Reference Type",
          name: "type",
          type: "select",
          options: [
            {
              label: "Original Article (Translated From)",
              value: "original",
            },
            {
              label: "Reference",
              value: "reference",
            },
          ],
          defaultValue: "reference",
          required: true,
        },
        {
          admin: {
            description: "Optional description or note about this reference.",
          },
          label: "Description",
          name: "description",
          type: "textarea",
          maxLength: 500,
          required: false,
        },
      ],
      required: false,
    },
    {
      admin: {
        description:
          "SEO meta description for search engines. In case of being left empty, the excerpt will be used.",
      },
      label: "Meta Description",
      name: "descriptionMeta",
      type: "textarea",
      maxLength: 100,
      required: false,
    },
    {
      admin: {
        description:
          "Tags for better searchability and organization. Separate multiple tags with commas.",
      },
      label: "Tags",
      name: "tags",
      type: "text",
      required: false,
    },
    {
      admin: {
        description:
          "The language this post is written in. Should match one of the blog room's languages.",
      },
      label: "Language",
      name: "language",
      type: "select",
      options: [
        { label: "Arabic", value: "arabic" },
        { label: "English", value: "english" },
      ],
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ req, data, operation }) => {
        // Automatically add creator to authors array on create
        if (operation === "create" && req.user?.id) {
          const userId = req.user.id;
          const authors = (data.authors || []) as BlogsPost["authors"];

          // Convert authors to array of IDs if needed
          const authorIds = authors.map((author) =>
            isNumber(author) ? author : author.id,
          );

          // Ensure creator is in authors array
          if (!authorIds.includes(userId))
            // eslint-disable-next-line no-param-reassign
            data.authors = [...authorIds, userId];
          // Ensure authors is set (even if empty, add creator)
          // eslint-disable-next-line no-param-reassign
          else data.authors = authorIds.length !== 0 ? authorIds : [userId];
        }

        if (
          hasPermission(req.user, {
            resource: "blogs-posts",
            action: "publish",
          })
        )
          // eslint-disable-next-line no-param-reassign
          data.status = "published";

        return data;
      },
    ],
  },
};
