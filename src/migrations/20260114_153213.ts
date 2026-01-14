import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "media_private_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  ALTER TABLE "media_private" DROP CONSTRAINT "media_private_user_id_users_id_fk";
  
  DROP INDEX IF EXISTS "media_private_user_idx";
  ALTER TABLE "media_private" ADD COLUMN "owner_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "media_private_rels" ADD CONSTRAINT "media_private_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media_private"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "media_private_rels" ADD CONSTRAINT "media_private_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_private_rels_order_idx" ON "media_private_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "media_private_rels_parent_idx" ON "media_private_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "media_private_rels_path_idx" ON "media_private_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "media_private_rels_users_id_idx" ON "media_private_rels" USING btree ("users_id");
  DO $$ BEGIN
   ALTER TABLE "media_private" ADD CONSTRAINT "media_private_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_private_owner_idx" ON "media_private" USING btree ("owner_id");
  ALTER TABLE "media_private" DROP COLUMN IF EXISTS "user_id";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_private_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_private_rels" CASCADE;
  ALTER TABLE "media_private" DROP CONSTRAINT "media_private_owner_id_users_id_fk";
  
  DROP INDEX IF EXISTS "media_private_owner_idx";
  ALTER TABLE "media_private" ADD COLUMN "user_id" integer NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "media_private" ADD CONSTRAINT "media_private_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_private_user_idx" ON "media_private" USING btree ("user_id");
  ALTER TABLE "media_private" DROP COLUMN IF EXISTS "owner_id";`);
}
