// REVIEWED

import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export const up = async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      CREATE TABLE IF NOT EXISTS "products_links" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "title" varchar,
        "is_file" boolean DEFAULT true,
        "file_size" numeric DEFAULT 0,
        "url" varchar
      );
      
      ALTER TABLE "orders" ALTER COLUMN "ordered_at" SET DEFAULT '4/29/2025, 2:34:47 PM';
      
      DO $$ BEGIN
        ALTER TABLE "products_links" ADD CONSTRAINT "products_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      CREATE INDEX IF NOT EXISTS "products_links_order_idx" ON "products_links" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "products_links_parent_id_idx" ON "products_links" USING btree ("_parent_id");
      ALTER TABLE "products" DROP COLUMN IF EXISTS "link";
    `,
  );
};

export const down = async function down({
  db,
}: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TABLE "products_links" DISABLE ROW LEVEL SECURITY;
      DROP TABLE "products_links" CASCADE;
      ALTER TABLE "orders" ALTER COLUMN "ordered_at" SET DEFAULT '4/29/2025, 4:56:45 AM';
      ALTER TABLE "products" ADD COLUMN "link" varchar;
    `,
  );
};
