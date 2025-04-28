// REVIEWED - 05
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { DiaryEntries } from "@/collections/DiaryEntries";
import { Media } from "@/collections/Media";
import { Products } from "@/collections/Products";
import { Users } from "@/collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || "" },
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  editor: lexicalEditor(),
  admin: { user: Users.slug, importMap: { baseDir: path.resolve(dirname) } },
  collections: [Media, Users, Products, DiaryEntries],
  sharp,
  plugins: [],
});
