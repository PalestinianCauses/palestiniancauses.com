// REVIEWED - 19
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig, Where } from "payload";
import sharp from "sharp";

import { Users } from "@/collections/Users";

import { collections } from "./collections";
import { messages } from "./lib/messages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Public collections that can be fetched without access control
const PUBLIC_COLLECTIONS = [
  "blogs-rooms",
  "blogs-posts",
  "comments",
  "diary-entries",
] as const;

type PublicCollection = (typeof PUBLIC_COLLECTIONS)[number];

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_URL || "https://palestiniancauses.com",
  cors: [process.env.NEXT_PUBLIC_DOMAIN || "https://palestiniancauses.com"],
  csrf: [process.env.NEXT_PUBLIC_DOMAIN || "https://palestiniancauses.com"],
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  editor: lexicalEditor(),
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname, "src") },
  },
  collections,
  sharp,
  email: nodemailerAdapter({
    defaultFromAddress: "no-reply@palestiniancauses.com",
    defaultFromName: "PalestinianCauses LLC.",
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { "media-private": true, "media-public": true },
      enabled: true,
    }),
  ],
  endpoints: [
    {
      path: "/public/:collection",
      method: "get",
      handler: async (req) => {
        const { collection } = req.routeParams as { collection: string };

        // Validate collection is in allowed list
        if (!PUBLIC_COLLECTIONS.includes(collection as PublicCollection))
          return Response.json(
            { error: messages.http.notFound },
            { status: 404 },
          );

        const url = new URL(req.url || "", process.env.NEXT_PUBLIC_URL);
        const page = parseInt(url.searchParams.get("page") || "1", 10);
        const limit = parseInt(url.searchParams.get("limit") || "10", 10);
        const sort = url.searchParams.get("sort") || "-createdAt";
        const depth = parseInt(url.searchParams.get("depth") || "0", 10);
        const whereParam = url.searchParams.get("where");

        let where: Where = {};
        if (whereParam)
          try {
            where = JSON.parse(whereParam);
          } catch {
            return Response.json({ error: messages.http.bad }, { status: 400 });
          }

        try {
          const result = await req.payload.find({
            collection: collection as PublicCollection,
            page,
            limit,
            sort,
            where,
            depth,
          });

          return Response.json(result);
        } catch (error) {
          console.error("Error getting collection:", error);
          return Response.json(
            { error: messages.http.serverError },
            { status: 500 },
          );
        }
      },
    },
    {
      path: "/public/:collection/count",
      method: "get",
      handler: async (req) => {
        const { collection } = req.routeParams as { collection: string };

        // Validate collection is in allowed list
        if (!PUBLIC_COLLECTIONS.includes(collection as PublicCollection))
          return Response.json(
            { error: messages.http.notFound },
            { status: 404 },
          );

        const url = new URL(req.url || "", process.env.NEXT_PUBLIC_URL);
        const whereParam = url.searchParams.get("where");

        let where: Where = {};
        if (whereParam)
          try {
            where = JSON.parse(whereParam);
          } catch {
            return Response.json({ error: messages.http.bad }, { status: 400 });
          }

        try {
          const result = await req.payload.count({
            collection: collection as PublicCollection,
            where,
          });

          return Response.json(result);
        } catch (error) {
          console.error("Error counting collection:", error);
          return Response.json(
            { error: messages.http.serverError },
            { status: 500 },
          );
        }
      },
    },
    {
      path: "/public/users/by-email",
      method: "get",
      handler: async (req) => {
        const url = new URL(req.url || "", process.env.NEXT_PUBLIC_URL);
        const email = url.searchParams.get("email");

        if (!email)
          return Response.json({ error: messages.http.bad }, { status: 400 });

        try {
          const result = await req.payload.find({
            collection: "users",
            where: { email: { equals: email } },
            limit: 1,
          });

          return Response.json(result);
        } catch (error) {
          console.error("Error getting user by email:", error);
          return Response.json(
            { error: messages.http.serverError },
            { status: 500 },
          );
        }
      },
    },
    {
      path: "/public/notification-subscriptions/by-endpoint",
      method: "get",
      handler: async (req) => {
        const url = new URL(req.url || "", process.env.NEXT_PUBLIC_URL);
        const endpoint = url.searchParams.get("endpoint");

        if (!endpoint)
          return Response.json({ error: messages.http.bad }, { status: 400 });

        try {
          const result = await req.payload.find({
            collection: "notification-subscriptions",
            where: { endpoint: { equals: endpoint } },
            limit: 1,
          });

          if (result.docs.length !== 1)
            return Response.json(
              { error: messages.actions.notificationSubscription.notFound },
              { status: 404 },
            );

          return Response.json(result.docs[0]);
        } catch (error) {
          console.error("Error getting notification subscription:", error);
          return Response.json(
            { error: messages.http.serverError },
            { status: 500 },
          );
        }
      },
    },
  ],
});
