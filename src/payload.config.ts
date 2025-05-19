// REVIEWED - 09
import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Comments } from "@/collections/Comments";
import { DiaryEntries } from "@/collections/DiaryEntries";
import { Media } from "@/collections/Media";
import { NotificationSubscriptions } from "@/collections/NotificationSubscriptions";
import { Orders } from "@/collections/Orders";
import { Products } from "@/collections/Products";
import { Rooms } from "@/collections/Rooms";
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
  collections: [
    NotificationSubscriptions,
    Media,
    Users,
    Products,
    Orders,
    DiaryEntries,
    Rooms,
    Comments,
  ],
  sharp,
  plugins: [],
});
