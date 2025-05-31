// REVIEWED

import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export const up = async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'system-user', 'website-user');
      CREATE TYPE "public"."enum_diary_entries_status" AS ENUM('pending', 'rejected', 'approved', 'published', 'archived');
      CREATE TABLE IF NOT EXISTS "media" (
        "id" serial PRIMARY KEY NOT NULL,
        "alt" varchar NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "url" varchar,
        "thumbnail_u_r_l" varchar,
        "filename" varchar,
        "mime_type" varchar,
        "filesize" numeric,
        "width" numeric,
        "height" numeric,
        "focal_x" numeric,
        "focal_y" numeric
      );
      
      CREATE TABLE IF NOT EXISTS "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "first_name" varchar DEFAULT '',
        "last_name" varchar DEFAULT '',
        "role" "enum_users_role" DEFAULT 'website-user' NOT NULL,
        "frappe_user_id" varchar NOT NULL,
        "frappe_user_role" varchar NOT NULL,
        "is_synced_with_frappe" boolean DEFAULT false,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "email" varchar NOT NULL,
        "reset_password_token" varchar,
        "reset_password_expiration" timestamp(3) with time zone,
        "salt" varchar,
        "hash" varchar,
        "login_attempts" numeric DEFAULT 0,
        "lock_until" timestamp(3) with time zone
      );
      
      CREATE TABLE IF NOT EXISTS "diary_entries" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "date" timestamp(3) with time zone NOT NULL,
        "content" varchar NOT NULL,
        "status" "enum_diary_entries_status" DEFAULT 'pending' NOT NULL,
        "author_id" integer NOT NULL,
        "is_authentic" boolean DEFAULT false NOT NULL,
        "is_anonymous" boolean DEFAULT false NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
        "id" serial PRIMARY KEY NOT NULL,
        "global_slug" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "media_id" integer,
        "users_id" integer,
        "diary_entries_id" integer
      );
      
      CREATE TABLE IF NOT EXISTS "payload_preferences" (
        "id" serial PRIMARY KEY NOT NULL,
        "key" varchar,
        "value" jsonb,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "payload_preferences_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "users_id" integer
      );
      
      CREATE TABLE IF NOT EXISTS "payload_migrations" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar,
        "batch" numeric,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      
      DO $$ BEGIN
        ALTER TABLE "diary_entries" ADD CONSTRAINT "diary_entries_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_diary_entries_fk" FOREIGN KEY ("diary_entries_id") REFERENCES "public"."diary_entries"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
        END $$;
        
      DO $$ BEGIN
        ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
      CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
      CREATE UNIQUE INDEX IF NOT EXISTS "users_frappe_user_id_idx" ON "users" USING btree ("frappe_user_id");
      CREATE INDEX IF NOT EXISTS "users_updated_at_idx" ON "users" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "users_created_at_idx" ON "users" USING btree ("created_at");
      CREATE UNIQUE INDEX IF NOT EXISTS "users_email_idx" ON "users" USING btree ("email");
      CREATE UNIQUE INDEX IF NOT EXISTS "diary_entries_title_idx" ON "diary_entries" USING btree ("title");
      CREATE INDEX IF NOT EXISTS "diary_entries_author_idx" ON "diary_entries" USING btree ("author_id");
      CREATE INDEX IF NOT EXISTS "diary_entries_updated_at_idx" ON "diary_entries" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "diary_entries_created_at_idx" ON "diary_entries" USING btree ("created_at");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_diary_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("diary_entries_id");
      CREATE INDEX IF NOT EXISTS "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
      CREATE INDEX IF NOT EXISTS "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
      CREATE INDEX IF NOT EXISTS "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
      CREATE INDEX IF NOT EXISTS "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
      CREATE INDEX IF NOT EXISTS "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
      CREATE INDEX IF NOT EXISTS "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
      CREATE INDEX IF NOT EXISTS "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
    `,
  );
};

export const down = async function down({
  db,
}: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      DROP TABLE "media" CASCADE;
      DROP TABLE "users" CASCADE;
      DROP TABLE "diary_entries" CASCADE;
      DROP TABLE "payload_locked_documents" CASCADE;
      DROP TABLE "payload_locked_documents_rels" CASCADE;
      DROP TABLE "payload_preferences" CASCADE;
      DROP TABLE "payload_preferences_rels" CASCADE;
      DROP TABLE "payload_migrations" CASCADE;
      DROP TYPE "public"."enum_users_role";
      DROP TYPE "public"."enum_diary_entries_status";
    `,
  );
};
