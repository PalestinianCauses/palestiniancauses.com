// REVIEWED

import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export const up = async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(
    sql`
      CREATE TYPE "public"."enum_rooms_education_status" AS ENUM('in-progress', 'completed', 'cancelled');
      CREATE TYPE "public"."enum_rooms_experience_type" AS ENUM('employment', 'activity');
      CREATE TYPE "public"."enum_rooms_skills_skills_categorized_level" AS ENUM('beginner', 'intermediate', 'advanced', 'expert');
      CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
      CREATE TYPE "public"."enum__blogs_v_version_status" AS ENUM('draft', 'published');
      CREATE TYPE "public"."enum_comments_votes_vote" AS ENUM('up', 'down');
      CREATE TYPE "public"."enum_comments_status" AS ENUM('approved', 'pending', 'rejected');
      CREATE TABLE IF NOT EXISTS "rooms_education" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "institution" varchar NOT NULL,
        "degree" varchar NOT NULL,
        "status" "enum_rooms_education_status" NOT NULL,
        "date_start" timestamp(3) with time zone NOT NULL,
        "date_end" timestamp(3) with time zone,
        "description" varchar NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "rooms_experience" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "type" "enum_rooms_experience_type" DEFAULT 'employment' NOT NULL,
        "company" varchar,
        "organization" varchar,
        "title" varchar,
        "position" varchar NOT NULL,
        "is_remote" boolean DEFAULT false,
        "location" varchar,
        "date_start" timestamp(3) with time zone NOT NULL,
        "is_current" boolean DEFAULT false,
        "date_end" timestamp(3) with time zone,
        "link" varchar NOT NULL,
        "description" varchar NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "rooms_qualification" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "issuer" varchar NOT NULL,
        "date_start" timestamp(3) with time zone NOT NULL,
        "date_end" timestamp(3) with time zone NOT NULL,
        "link" varchar,
        "has_certificate" boolean DEFAULT false,
        "certificate_id" integer,
        "description" varchar NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "rooms_skills_skills_categorized" (
        "_order" integer NOT NULL,
        "_parent_id" varchar NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "level" "enum_rooms_skills_skills_categorized_level" DEFAULT 'expert' NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "rooms_skills" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "category" varchar NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "rooms" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "hero_name_professional" varchar NOT NULL,
        "hero_title_professional" varchar NOT NULL,
        "hero_description_professional" varchar NOT NULL,
        "hero_image_professional_id" integer,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "blogs" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar,
        "slug" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "_status" "enum_blogs_status" DEFAULT 'draft'
      );
      
      CREATE TABLE IF NOT EXISTS "_blogs_v" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "version_title" varchar,
        "version_slug" varchar,
        "version_updated_at" timestamp(3) with time zone,
        "version_created_at" timestamp(3) with time zone,
        "version__status" "enum__blogs_v_version_status" DEFAULT 'draft',
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "latest" boolean
      );
      
      CREATE TABLE IF NOT EXISTS "comments_votes" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "user_id" integer NOT NULL,
        "vote" "enum_comments_votes_vote" NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS "comments" (
        "id" serial PRIMARY KEY NOT NULL,
        "parent_id" integer,
        "user_id" integer NOT NULL,
        "content" varchar NOT NULL,
        "status" "enum_comments_status" DEFAULT 'approved' NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
  
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rooms_id" integer;
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blogs_id" integer;
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "comments_id" integer;
      DO $$ BEGIN
        ALTER TABLE "rooms_education" ADD CONSTRAINT "rooms_education_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "rooms_experience" ADD CONSTRAINT "rooms_experience_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "rooms_qualification" ADD CONSTRAINT "rooms_qualification_certificate_id_media_id_fk" FOREIGN KEY ("certificate_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "rooms_qualification" ADD CONSTRAINT "rooms_qualification_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "rooms_skills_skills_categorized" ADD CONSTRAINT "rooms_skills_skills_categorized_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_skills"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "rooms_skills" ADD CONSTRAINT "rooms_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hero_image_professional_id_media_id_fk" FOREIGN KEY ("hero_image_professional_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_parent_id_blogs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "comments_votes" ADD CONSTRAINT "comments_votes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "comments_votes" ADD CONSTRAINT "comments_votes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "comments" ADD CONSTRAINT "comments_parent_id_comments_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."comments"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      DO $$ BEGIN
        ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
  
      CREATE INDEX IF NOT EXISTS "rooms_education_order_idx" ON "rooms_education" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "rooms_education_parent_id_idx" ON "rooms_education" USING btree ("_parent_id");
      CREATE INDEX IF NOT EXISTS "rooms_experience_order_idx" ON "rooms_experience" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "rooms_experience_parent_id_idx" ON "rooms_experience" USING btree ("_parent_id");
      CREATE INDEX IF NOT EXISTS "rooms_qualification_order_idx" ON "rooms_qualification" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "rooms_qualification_parent_id_idx" ON "rooms_qualification" USING btree ("_parent_id");
      CREATE INDEX IF NOT EXISTS "rooms_qualification_certificate_idx" ON "rooms_qualification" USING btree ("certificate_id");
      CREATE INDEX IF NOT EXISTS "rooms_skills_skills_categorized_order_idx" ON "rooms_skills_skills_categorized" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "rooms_skills_skills_categorized_parent_id_idx" ON "rooms_skills_skills_categorized" USING btree ("_parent_id");
      CREATE INDEX IF NOT EXISTS "rooms_skills_order_idx" ON "rooms_skills" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "rooms_skills_parent_id_idx" ON "rooms_skills" USING btree ("_parent_id");
      CREATE UNIQUE INDEX IF NOT EXISTS "rooms_name_idx" ON "rooms" USING btree ("name");
      CREATE UNIQUE INDEX IF NOT EXISTS "rooms_slug_idx" ON "rooms" USING btree ("slug");
      CREATE INDEX IF NOT EXISTS "rooms_hero_hero_image_professional_idx" ON "rooms" USING btree ("hero_image_professional_id");
      CREATE INDEX IF NOT EXISTS "rooms_updated_at_idx" ON "rooms" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "rooms_created_at_idx" ON "rooms" USING btree ("created_at");
      CREATE INDEX IF NOT EXISTS "blogs_slug_idx" ON "blogs" USING btree ("slug");
      CREATE INDEX IF NOT EXISTS "blogs_updated_at_idx" ON "blogs" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "blogs_created_at_idx" ON "blogs" USING btree ("created_at");
      CREATE INDEX IF NOT EXISTS "blogs__status_idx" ON "blogs" USING btree ("_status");
      CREATE INDEX IF NOT EXISTS "_blogs_v_parent_idx" ON "_blogs_v" USING btree ("parent_id");
      CREATE INDEX IF NOT EXISTS "_blogs_v_version_version_slug_idx" ON "_blogs_v" USING btree ("version_slug");
      CREATE INDEX IF NOT EXISTS "_blogs_v_version_version_updated_at_idx" ON "_blogs_v" USING btree ("version_updated_at");
      CREATE INDEX IF NOT EXISTS "_blogs_v_version_version_created_at_idx" ON "_blogs_v" USING btree ("version_created_at");
      CREATE INDEX IF NOT EXISTS "_blogs_v_version_version__status_idx" ON "_blogs_v" USING btree ("version__status");
      CREATE INDEX IF NOT EXISTS "_blogs_v_created_at_idx" ON "_blogs_v" USING btree ("created_at");
      CREATE INDEX IF NOT EXISTS "_blogs_v_updated_at_idx" ON "_blogs_v" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "_blogs_v_latest_idx" ON "_blogs_v" USING btree ("latest");
      CREATE INDEX IF NOT EXISTS "comments_votes_order_idx" ON "comments_votes" USING btree ("_order");
      CREATE INDEX IF NOT EXISTS "comments_votes_parent_id_idx" ON "comments_votes" USING btree ("_parent_id");
      CREATE INDEX IF NOT EXISTS "comments_votes_user_idx" ON "comments_votes" USING btree ("user_id");
      CREATE INDEX IF NOT EXISTS "comments_parent_idx" ON "comments" USING btree ("parent_id");
      CREATE INDEX IF NOT EXISTS "comments_user_idx" ON "comments" USING btree ("user_id");
      CREATE INDEX IF NOT EXISTS "comments_updated_at_idx" ON "comments" USING btree ("updated_at");
      CREATE INDEX IF NOT EXISTS "comments_created_at_idx" ON "comments" USING btree ("created_at");
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_fk" FOREIGN KEY ("rooms_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      DO $$ BEGIN
        ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
        EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
      
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_id");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_comments_id_idx" ON "payload_locked_documents_rels" USING btree ("comments_id");
      ALTER TABLE "orders" DROP COLUMN IF EXISTS "ordered_at";
    `,
  );
};

export const down = async function down({
  db,
}: MigrateDownArgs): Promise<void> {
  await db.execute(
    sql`
      ALTER TABLE "rooms_education" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "rooms_experience" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "rooms_qualification" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "rooms_skills_skills_categorized" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "rooms_skills" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "rooms" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "blogs" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "_blogs_v" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "comments_votes" DISABLE ROW LEVEL SECURITY;
      ALTER TABLE "comments" DISABLE ROW LEVEL SECURITY;
      DROP TABLE "rooms_education" CASCADE;
      DROP TABLE "rooms_experience" CASCADE;
      DROP TABLE "rooms_qualification" CASCADE;
      DROP TABLE "rooms_skills_skills_categorized" CASCADE;
      DROP TABLE "rooms_skills" CASCADE;
      DROP TABLE "rooms" CASCADE;
      DROP TABLE "blogs" CASCADE;
      DROP TABLE "_blogs_v" CASCADE;
      DROP TABLE "comments_votes" CASCADE;
      DROP TABLE "comments" CASCADE;
      ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rooms_fk";
      ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blogs_fk";
      ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_comments_fk";
      DROP INDEX IF EXISTS "payload_locked_documents_rels_rooms_id_idx";
      DROP INDEX IF EXISTS "payload_locked_documents_rels_blogs_id_idx";
      DROP INDEX IF EXISTS "payload_locked_documents_rels_comments_id_idx";
      ALTER TABLE "orders" ADD COLUMN "ordered_at" timestamp(3) with time zone DEFAULT '5/8/2025, 8:37:59 PM' NOT NULL;
      ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "rooms_id";
      ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blogs_id";
      ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "comments_id";
      DROP TYPE "public"."enum_rooms_education_status";
      DROP TYPE "public"."enum_rooms_experience_type";
      DROP TYPE "public"."enum_rooms_skills_skills_categorized_level";
      DROP TYPE "public"."enum_blogs_status";
      DROP TYPE "public"."enum__blogs_v_version_status";
      DROP TYPE "public"."enum_comments_votes_vote";
      DROP TYPE "public"."enum_comments_status";
    `,
  );
};
