// REVIEWED - 14
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Users } from "@/collections/Users";

import { collections } from "./collections";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
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
  email: resendAdapter({
    defaultFromAddress: "hello@notifications.palestiniancauses.com",
    defaultFromName: "PalestinianCauses LLC.",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  plugins: [
    vercelBlobStorage({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      enabled: true,
    }),
  ],
});
