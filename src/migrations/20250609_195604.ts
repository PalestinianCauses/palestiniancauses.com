// REVIEWED

import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export const up = async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      CREATE TABLE IF NOT EXISTS "comments_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "diary_entries_id" integer,
        "blogs_id" integer
      );
      
      DO $$ BEGIN
        ALTER TABLE "comments_rels" ADD CONSTRAINT "comments_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "comments_rels" ADD CONSTRAINT "comments_rels_diary_entries_fk" FOREIGN KEY ("diary_entries_id") REFERENCES "public"."diary_entries"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "comments_rels" ADD CONSTRAINT "comments_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      CREATE INDEX IF NOT EXISTS "comments_rels_order_idx" ON "comments_rels" USING btree ("order");
      CREATE INDEX IF NOT EXISTS "comments_rels_parent_idx" ON "comments_rels" USING btree ("parent_id");
      CREATE INDEX IF NOT EXISTS "comments_rels_path_idx" ON "comments_rels" USING btree ("path");
      CREATE INDEX IF NOT EXISTS "comments_rels_diary_entries_id_idx" ON "comments_rels" USING btree ("diary_entries_id");
      CREATE INDEX IF NOT EXISTS "comments_rels_blogs_id_idx" ON "comments_rels" USING btree ("blogs_id");
    `,
  );
};

export const down = async function down({
  db,
}: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      DROP TABLE "comments_rels" CASCADE;
    `,
  );
};
