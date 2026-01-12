import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_blogs_posts_references_type" AS ENUM('original', 'reference');
  CREATE TYPE "public"."enum_blogs_posts_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_blogs_rooms_language" AS ENUM('arabic', 'english');
  CREATE TYPE "public"."enum_blogs_rooms_color" AS ENUM('red', 'yellow', 'green', 'teal', 'blue');
  CREATE TYPE "public"."enum_notifications_type" AS ENUM('achievement', 'blog', 'comment', 'diary-entry', 'order', 'system');
  CREATE TYPE "public"."enum_notifications_resource_type" AS ENUM('blogs', 'comments', 'diary-entries', 'orders');
  CREATE TYPE "public"."enum_orders_items_item_type" AS ENUM('service', 'package', 'product');
  CREATE TYPE "public"."enum_orders_order_type" AS ENUM('service', 'package', 'product');
  CREATE TYPE "public"."enum_orders_order_status" AS ENUM('new', 'in-progress', 'completed', 'cancelled', 'not-applicable');
  CREATE TYPE "public"."enum_permissions_resource" AS ENUM('achievement-notifications', 'blogs-categories', 'blogs-posts', 'blogs-posts.authors', 'blogs-posts.status', 'blogs-rooms', 'comments', 'comments.on', 'comments.parent', 'comments.status', 'comments.user', 'diary-entries', 'diary-entries.author', 'diary-entries.isAuthentic', 'diary-entries.status', 'media-private', 'media-public', 'notifications', 'notification-subscriptions', 'orders', 'permissions', 'products', 'roles', 'rooms', 'room-contact', 'room-packages', 'room-services', 'service-categories', 'service-categories.system', 'service-categories.priority', 'users', 'users.previousRole', 'users.roles', 'verification-tokens-email');
  CREATE TYPE "public"."enum_permissions_action" AS ENUM('create', 'read', 'update', 'delete', 'manage', 'publish', 'unpublish');
  CREATE TYPE "public"."enum_rooms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_rooms_information_status" AS ENUM('available', 'working', 'unavailable');
  CREATE TYPE "public"."enum_rooms_contact_type" AS ENUM('email', 'whatsapp', 'telegram', 'twitter', 'instagram', 'linkedin', 'github', 'other');
  CREATE TYPE "public"."enum_rooms_contact_status" AS ENUM('active', 'inactive');
  CREATE TYPE "public"."enum_rooms_packages_pricing_type" AS ENUM('fixed', 'hourly', 'daily', 'project', 'custom');
  CREATE TYPE "public"."enum_rooms_packages_currency" AS ENUM('USD', 'EUR', 'ILS');
  CREATE TYPE "public"."enum_rooms_packages_status" AS ENUM('available', 'unavailable', 'coming-soon');
  CREATE TYPE "public"."enum_rooms_services_status" AS ENUM('available', 'unavailable', 'coming-soon');
  CREATE TYPE "public"."enum_service_categories_color" AS ENUM('red', 'orange', 'amber', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink');
  CREATE TYPE "public"."enum_service_categories_status" AS ENUM('active', 'inactive');
  ALTER TYPE "public"."enum_orders_type" RENAME TO "enum_orders_product_order_type";
  ALTER TYPE "public"."enum_orders_status" RENAME TO "enum_orders_product_order_status";
  ALTER TYPE "public"."enum_rooms_education_status" RENAME TO "enum_rooms_education_list_status";
  ALTER TYPE "public"."enum_rooms_experience_type" RENAME TO "enum_rooms_experience_list_type";
  ALTER TYPE "public"."enum_rooms_skills_skills_categorized_level" RENAME TO "enum_rooms_skills_list_skills_categorized_level";
  ALTER TYPE "public"."enum_users_role" RENAME TO "enum_users_previous_role";
  CREATE TABLE IF NOT EXISTS "achievement_notifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"achievement" varchar NOT NULL,
  	"notified" boolean DEFAULT false NOT NULL,
  	"notified_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blogs_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"room_id" integer NOT NULL,
  	"room_owner_id" integer,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blogs_posts_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"type" "enum_blogs_posts_references_type" DEFAULT 'reference' NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "blogs_posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"blog_room_id" integer NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"image_featured_id" integer,
  	"status" "enum_blogs_posts_status" DEFAULT 'draft' NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"description_meta" varchar,
  	"tags" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blogs_posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"blogs_categories_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "blogs_rooms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"room_owner_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"language" "enum_blogs_rooms_language" DEFAULT 'english' NOT NULL,
  	"color" "enum_blogs_rooms_color" DEFAULT 'blue' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "blogs_rooms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "media_public" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
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
  	"focal_y" numeric,
  	"sizes_user_avatar_url" varchar,
  	"sizes_user_avatar_width" numeric,
  	"sizes_user_avatar_height" numeric,
  	"sizes_user_avatar_mime_type" varchar,
  	"sizes_user_avatar_filesize" numeric,
  	"sizes_user_avatar_filename" varchar,
  	"sizes_room_photograph_url" varchar,
  	"sizes_room_photograph_width" numeric,
  	"sizes_room_photograph_height" numeric,
  	"sizes_room_photograph_mime_type" varchar,
  	"sizes_room_photograph_filesize" numeric,
  	"sizes_room_photograph_filename" varchar,
  	"sizes_blog_post_image_url" varchar,
  	"sizes_blog_post_image_width" numeric,
  	"sizes_blog_post_image_height" numeric,
  	"sizes_blog_post_image_mime_type" varchar,
  	"sizes_blog_post_image_filesize" numeric,
  	"sizes_blog_post_image_filename" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "notifications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"type" "enum_notifications_type" NOT NULL,
  	"resource_type" "enum_notifications_resource_type",
  	"title" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"read" boolean DEFAULT false NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "notifications_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"comments_id" integer,
  	"diary_entries_id" integer,
  	"orders_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "permissions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"resource" "enum_permissions_resource" NOT NULL,
  	"action" "enum_permissions_action" NOT NULL,
  	"conditions" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "roles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"is_default" boolean DEFAULT false,
  	"priority" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "roles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"permissions_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_about_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"paragraph" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"rooms_services_id" integer,
  	"rooms_packages_id" integer,
  	"rooms_contact_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"type" "enum_rooms_contact_type" DEFAULT 'email' NOT NULL,
  	"label" varchar,
  	"value" varchar NOT NULL,
  	"status" "enum_rooms_contact_status" DEFAULT 'active' NOT NULL,
  	"primary" boolean DEFAULT false,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_packages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_packages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"audience_intended" varchar NOT NULL,
  	"pricing_type" "enum_rooms_packages_pricing_type" NOT NULL,
  	"price" numeric DEFAULT 0,
  	"currency" "enum_rooms_packages_currency" DEFAULT 'USD' NOT NULL,
  	"duration" varchar,
  	"image_id" integer,
  	"status" "enum_rooms_packages_status" DEFAULT 'available' NOT NULL,
  	"featured" boolean DEFAULT false,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_packages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"rooms_services_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_services_skills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "rooms_services" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"name" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"category_id" integer NOT NULL,
  	"duration" varchar,
  	"status" "enum_rooms_services_status" DEFAULT 'available' NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "service_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar,
  	"color" "enum_service_categories_color" DEFAULT 'teal' NOT NULL,
  	"status" "enum_service_categories_status" DEFAULT 'active' NOT NULL,
  	"system" boolean DEFAULT false,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS "users_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"roles_id" integer
  );
  
  CREATE TABLE IF NOT EXISTS "verification_tokens_email" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"token" varchar NOT NULL,
  	"new_email" varchar,
  	"used" boolean DEFAULT false NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "blogs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_blogs_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "blogs" CASCADE;
  DROP TABLE "_blogs_v" CASCADE;
  ALTER TABLE "media" RENAME TO "media_private";
  ALTER TABLE "rooms_education" RENAME TO "rooms_education_list";
  ALTER TABLE "rooms_experience" RENAME TO "rooms_experience_list";
  ALTER TABLE "rooms_qualification" RENAME TO "rooms_qualification_list";
  ALTER TABLE "rooms_skills_skills_categorized" RENAME TO "rooms_skills_list_skills_categorized";
  ALTER TABLE "rooms_skills" RENAME TO "rooms_skills_list";
  ALTER TABLE "users" RENAME COLUMN "role" TO "previous_role";
  ALTER TABLE "orders" RENAME COLUMN "type" TO "product_order_type";
  ALTER TABLE "orders" RENAME COLUMN "status" TO "product_order_status";
  ALTER TABLE "rooms" RENAME COLUMN "hero_name_professional" TO "information_name";
  ALTER TABLE "rooms" RENAME COLUMN "hero_title_professional" TO "information_title";
  ALTER TABLE "rooms" RENAME COLUMN "hero_image_professional_id" TO "information_photograph_id";
  ALTER TABLE "payload_locked_documents_rels" RENAME COLUMN "media_id" TO "media_private_id";
  ALTER TABLE "products_files" DROP CONSTRAINT "products_files_file_id_media_id_fk";
  
  ALTER TABLE "rooms_education_list" DROP CONSTRAINT "rooms_education_parent_id_fk";
  
  ALTER TABLE "rooms_experience_list" DROP CONSTRAINT "rooms_experience_parent_id_fk";
  
  ALTER TABLE "rooms_qualification_list" DROP CONSTRAINT "rooms_qualification_certificate_id_media_id_fk";
  
  ALTER TABLE "rooms_qualification_list" DROP CONSTRAINT "rooms_qualification_parent_id_fk";
  
  ALTER TABLE "rooms_skills_list_skills_categorized" DROP CONSTRAINT "rooms_skills_skills_categorized_parent_id_fk";
  
  ALTER TABLE "rooms_skills_list" DROP CONSTRAINT "rooms_skills_parent_id_fk";
  
  ALTER TABLE "rooms" DROP CONSTRAINT "rooms_hero_image_professional_id_media_id_fk";
  
  ALTER TABLE "comments_rels" DROP CONSTRAINT IF EXISTS "comments_rels_blogs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_blogs_fk";
  
  DROP INDEX IF EXISTS "media_updated_at_idx";
  DROP INDEX IF EXISTS "media_created_at_idx";
  DROP INDEX IF EXISTS "media_filename_idx";
  DROP INDEX IF EXISTS "rooms_education_order_idx";
  DROP INDEX IF EXISTS "rooms_education_parent_id_idx";
  DROP INDEX IF EXISTS "rooms_experience_order_idx";
  DROP INDEX IF EXISTS "rooms_experience_parent_id_idx";
  DROP INDEX IF EXISTS "rooms_qualification_order_idx";
  DROP INDEX IF EXISTS "rooms_qualification_parent_id_idx";
  DROP INDEX IF EXISTS "rooms_qualification_certificate_idx";
  DROP INDEX IF EXISTS "rooms_skills_skills_categorized_order_idx";
  DROP INDEX IF EXISTS "rooms_skills_skills_categorized_parent_id_idx";
  DROP INDEX IF EXISTS "rooms_skills_order_idx";
  DROP INDEX IF EXISTS "rooms_skills_parent_id_idx";
  DROP INDEX IF EXISTS "rooms_hero_hero_image_professional_idx";
  DROP INDEX IF EXISTS "comments_rels_blogs_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_media_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_blogs_id_idx";
  ALTER TABLE "orders_items" ALTER COLUMN "product_id" DROP NOT NULL;
  ALTER TABLE "orders_items" ALTER COLUMN "price" SET DEFAULT 0;
  ALTER TABLE "media_private" ADD COLUMN "user_id" integer NOT NULL;
  ALTER TABLE "users" ADD COLUMN "account_verified" boolean DEFAULT false NOT NULL;
  ALTER TABLE "users" ADD COLUMN "pending_email" varchar;
  ALTER TABLE "users" ADD COLUMN "bio" varchar;
  ALTER TABLE "users" ADD COLUMN "avatar_id" integer;
  ALTER TABLE "users" ADD COLUMN "links_social_github" varchar;
  ALTER TABLE "users" ADD COLUMN "links_social_instagram" varchar;
  ALTER TABLE "users" ADD COLUMN "links_social_twitter" varchar;
  ALTER TABLE "users" ADD COLUMN "links_social_linkedin" varchar;
  ALTER TABLE "users" ADD COLUMN "links_social_website" varchar;
  ALTER TABLE "users" ADD COLUMN "privacy_settings_show_email" boolean DEFAULT false NOT NULL;
  ALTER TABLE "users" ADD COLUMN "privacy_settings_show_activity" boolean DEFAULT true NOT NULL;
  ALTER TABLE "users" ADD COLUMN "privacy_settings_show_achievements" boolean DEFAULT true NOT NULL;
  ALTER TABLE "users" ADD COLUMN "privacy_settings_show_orders" boolean DEFAULT false NOT NULL;
  ALTER TABLE "orders_items" ADD COLUMN "item_type" "enum_orders_items_item_type" DEFAULT 'product' NOT NULL;
  ALTER TABLE "orders_items" ADD COLUMN "service_id" integer;
  ALTER TABLE "orders_items" ADD COLUMN "package_id" integer;
  ALTER TABLE "orders" ADD COLUMN "room_owner_id" integer;
  ALTER TABLE "orders" ADD COLUMN "order_type" "enum_orders_order_type" DEFAULT 'product' NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "customer_name" varchar DEFAULT 'N/A';
  ALTER TABLE "orders" ADD COLUMN "customer_email" varchar DEFAULT 'N/A';
  ALTER TABLE "orders" ADD COLUMN "customer_phone" varchar;
  ALTER TABLE "orders" ADD COLUMN "customer_message" varchar;
  ALTER TABLE "orders" ADD COLUMN "order_status" "enum_orders_order_status" DEFAULT 'not-applicable' NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "stripe_session_id" varchar;
  ALTER TABLE "orders" ADD COLUMN "stripe_payment_intent_id" varchar;
  ALTER TABLE "rooms_education_list" ADD COLUMN "location" varchar NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "user_id" integer NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "status" "enum_rooms_status" DEFAULT 'draft' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "information_headline" varchar NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "information_status" "enum_rooms_information_status" DEFAULT 'available' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_headline" varchar NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_headline_sub" varchar DEFAULT 'Meet the person behind this room' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_photograph_id" integer;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_experience_years" numeric NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_experience_heading" varchar DEFAULT 'Years of dedication' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_experience_description" varchar DEFAULT 'Always learning, growing, and making an impact each year' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_happy_clients_clients" numeric NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_happy_clients_heading" varchar DEFAULT 'Delighted clients' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_happy_clients_description" varchar DEFAULT 'Delivering results that delight clients, every single project' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_milestones_achieved_milestones" numeric NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_milestones_achieved_heading" varchar DEFAULT 'Ideas turned reality' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "about_stats_milestones_achieved_description" varchar DEFAULT 'Overcoming challenges to deliver successful projects' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "education_headline" varchar DEFAULT 'Based on a formal education and fueled by a passion for "non-stop" growth.' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "education_headline_sub" varchar DEFAULT 'A Journey in Learning' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "experience_headline" varchar DEFAULT 'Career highlights: A snapshot of my professional life.' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "experience_headline_sub" varchar DEFAULT 'My Professional Journey' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "experience_photograph_id" integer;
  ALTER TABLE "rooms" ADD COLUMN "qualification_headline" varchar DEFAULT 'Beyond the Classroom: A Commitment to Lifelong Learning and Mastery.' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "qualification_headline_sub" varchar DEFAULT 'A Record of Specialized Training' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "qualification_photograph_id" integer;
  ALTER TABLE "rooms" ADD COLUMN "skills_headline" varchar DEFAULT 'My Professional Toolkit: A Showcase of Core Competencies' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "skills_headline_sub" varchar DEFAULT 'Areas of Expertise' NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "services_headline" varchar DEFAULT 'Crafting Solutions to Elevate Your Vision: My Core Offerings';
  ALTER TABLE "rooms" ADD COLUMN "services_headline_sub" varchar DEFAULT 'A Menu of Professional Services';
  ALTER TABLE "rooms" ADD COLUMN "packages_headline" varchar DEFAULT 'Your Roadmap to Results: A Clear Path to Achieving Your Goals';
  ALTER TABLE "rooms" ADD COLUMN "packages_headline_sub" varchar DEFAULT 'Curated Packages for Common Needs';
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "achievement_notifications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blogs_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blogs_posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blogs_rooms_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_public_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "notifications_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "permissions_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "roles_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rooms_contact_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rooms_packages_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "rooms_services_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "verification_tokens_email_id" integer;
  DO $$ BEGIN
   ALTER TABLE "achievement_notifications" ADD CONSTRAINT "achievement_notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_categories" ADD CONSTRAINT "blogs_categories_room_id_blogs_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."blogs_rooms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_categories" ADD CONSTRAINT "blogs_categories_room_owner_id_users_id_fk" FOREIGN KEY ("room_owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_categories" ADD CONSTRAINT "blogs_categories_image_id_media_public_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_posts_references" ADD CONSTRAINT "blogs_posts_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blogs_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_posts" ADD CONSTRAINT "blogs_posts_blog_room_id_blogs_rooms_id_fk" FOREIGN KEY ("blog_room_id") REFERENCES "public"."blogs_rooms"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_posts" ADD CONSTRAINT "blogs_posts_image_featured_id_media_public_id_fk" FOREIGN KEY ("image_featured_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_posts_rels" ADD CONSTRAINT "blogs_posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_posts_rels" ADD CONSTRAINT "blogs_posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_posts_rels" ADD CONSTRAINT "blogs_posts_rels_blogs_categories_fk" FOREIGN KEY ("blogs_categories_id") REFERENCES "public"."blogs_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_rooms" ADD CONSTRAINT "blogs_rooms_room_owner_id_users_id_fk" FOREIGN KEY ("room_owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_rooms_rels" ADD CONSTRAINT "blogs_rooms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs_rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "blogs_rooms_rels" ADD CONSTRAINT "blogs_rooms_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "media_public" ADD CONSTRAINT "media_public_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "notifications_rels" ADD CONSTRAINT "notifications_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "notifications_rels" ADD CONSTRAINT "notifications_rels_comments_fk" FOREIGN KEY ("comments_id") REFERENCES "public"."comments"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "notifications_rels" ADD CONSTRAINT "notifications_rels_diary_entries_fk" FOREIGN KEY ("diary_entries_id") REFERENCES "public"."diary_entries"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "notifications_rels" ADD CONSTRAINT "notifications_rels_orders_fk" FOREIGN KEY ("orders_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "roles_rels" ADD CONSTRAINT "roles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "roles_rels" ADD CONSTRAINT "roles_rels_permissions_fk" FOREIGN KEY ("permissions_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_about_paragraphs" ADD CONSTRAINT "rooms_about_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_links" ADD CONSTRAINT "rooms_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_rels" ADD CONSTRAINT "rooms_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_rels" ADD CONSTRAINT "rooms_rels_rooms_services_fk" FOREIGN KEY ("rooms_services_id") REFERENCES "public"."rooms_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_rels" ADD CONSTRAINT "rooms_rels_rooms_packages_fk" FOREIGN KEY ("rooms_packages_id") REFERENCES "public"."rooms_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_rels" ADD CONSTRAINT "rooms_rels_rooms_contact_fk" FOREIGN KEY ("rooms_contact_id") REFERENCES "public"."rooms_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_contact" ADD CONSTRAINT "rooms_contact_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_packages_features" ADD CONSTRAINT "rooms_packages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_packages" ADD CONSTRAINT "rooms_packages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_packages" ADD CONSTRAINT "rooms_packages_image_id_media_public_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_packages_rels" ADD CONSTRAINT "rooms_packages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."rooms_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_packages_rels" ADD CONSTRAINT "rooms_packages_rels_rooms_services_fk" FOREIGN KEY ("rooms_services_id") REFERENCES "public"."rooms_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_services_skills" ADD CONSTRAINT "rooms_services_skills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_services" ADD CONSTRAINT "rooms_services_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_services" ADD CONSTRAINT "rooms_services_category_id_service_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."service_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users_rels" ADD CONSTRAINT "users_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "verification_tokens_email" ADD CONSTRAINT "verification_tokens_email_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "achievement_notifications_user_idx" ON "achievement_notifications" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "achievement_notifications_achievement_idx" ON "achievement_notifications" USING btree ("achievement");
  CREATE INDEX IF NOT EXISTS "achievement_notifications_updated_at_idx" ON "achievement_notifications" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "achievement_notifications_created_at_idx" ON "achievement_notifications" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blogs_categories_room_idx" ON "blogs_categories" USING btree ("room_id");
  CREATE INDEX IF NOT EXISTS "blogs_categories_room_owner_idx" ON "blogs_categories" USING btree ("room_owner_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blogs_categories_slug_idx" ON "blogs_categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blogs_categories_image_idx" ON "blogs_categories" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "blogs_categories_updated_at_idx" ON "blogs_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blogs_categories_created_at_idx" ON "blogs_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blogs_posts_references_order_idx" ON "blogs_posts_references" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "blogs_posts_references_parent_id_idx" ON "blogs_posts_references" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "blogs_posts_blog_room_idx" ON "blogs_posts" USING btree ("blog_room_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blogs_posts_slug_idx" ON "blogs_posts" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blogs_posts_image_featured_idx" ON "blogs_posts" USING btree ("image_featured_id");
  CREATE INDEX IF NOT EXISTS "blogs_posts_status_idx" ON "blogs_posts" USING btree ("status");
  CREATE INDEX IF NOT EXISTS "blogs_posts_published_at_idx" ON "blogs_posts" USING btree ("published_at");
  CREATE INDEX IF NOT EXISTS "blogs_posts_updated_at_idx" ON "blogs_posts" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blogs_posts_created_at_idx" ON "blogs_posts" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blogs_posts_rels_order_idx" ON "blogs_posts_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blogs_posts_rels_parent_idx" ON "blogs_posts_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blogs_posts_rels_path_idx" ON "blogs_posts_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blogs_posts_rels_users_id_idx" ON "blogs_posts_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "blogs_posts_rels_blogs_categories_id_idx" ON "blogs_posts_rels" USING btree ("blogs_categories_id");
  CREATE INDEX IF NOT EXISTS "blogs_rooms_room_owner_idx" ON "blogs_rooms" USING btree ("room_owner_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "blogs_rooms_slug_idx" ON "blogs_rooms" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "blogs_rooms_updated_at_idx" ON "blogs_rooms" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "blogs_rooms_created_at_idx" ON "blogs_rooms" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "blogs_rooms_rels_order_idx" ON "blogs_rooms_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "blogs_rooms_rels_parent_idx" ON "blogs_rooms_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "blogs_rooms_rels_path_idx" ON "blogs_rooms_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "blogs_rooms_rels_users_id_idx" ON "blogs_rooms_rels" USING btree ("users_id");
  CREATE INDEX IF NOT EXISTS "media_public_user_idx" ON "media_public" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "media_public_updated_at_idx" ON "media_public" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_public_created_at_idx" ON "media_public" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_public_filename_idx" ON "media_public" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "media_public_sizes_user_avatar_sizes_user_avatar_filename_idx" ON "media_public" USING btree ("sizes_user_avatar_filename");
  CREATE INDEX IF NOT EXISTS "media_public_sizes_room_photograph_sizes_room_photograph_filename_idx" ON "media_public" USING btree ("sizes_room_photograph_filename");
  CREATE INDEX IF NOT EXISTS "media_public_sizes_blog_post_image_sizes_blog_post_image_filename_idx" ON "media_public" USING btree ("sizes_blog_post_image_filename");
  CREATE INDEX IF NOT EXISTS "notifications_user_idx" ON "notifications" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "notifications_type_idx" ON "notifications" USING btree ("type");
  CREATE INDEX IF NOT EXISTS "notifications_read_idx" ON "notifications" USING btree ("read");
  CREATE INDEX IF NOT EXISTS "notifications_updated_at_idx" ON "notifications" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "notifications_created_at_idx" ON "notifications" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "notifications_rels_order_idx" ON "notifications_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "notifications_rels_parent_idx" ON "notifications_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "notifications_rels_path_idx" ON "notifications_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "notifications_rels_comments_id_idx" ON "notifications_rels" USING btree ("comments_id");
  CREATE INDEX IF NOT EXISTS "notifications_rels_diary_entries_id_idx" ON "notifications_rels" USING btree ("diary_entries_id");
  CREATE INDEX IF NOT EXISTS "notifications_rels_orders_id_idx" ON "notifications_rels" USING btree ("orders_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "permissions_name_idx" ON "permissions" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "permissions_updated_at_idx" ON "permissions" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "permissions_created_at_idx" ON "permissions" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "roles_name_idx" ON "roles" USING btree ("name");
  CREATE INDEX IF NOT EXISTS "roles_updated_at_idx" ON "roles" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "roles_created_at_idx" ON "roles" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "roles_rels_order_idx" ON "roles_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "roles_rels_parent_idx" ON "roles_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "roles_rels_path_idx" ON "roles_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "roles_rels_permissions_id_idx" ON "roles_rels" USING btree ("permissions_id");
  CREATE INDEX IF NOT EXISTS "rooms_about_paragraphs_order_idx" ON "rooms_about_paragraphs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_about_paragraphs_parent_id_idx" ON "rooms_about_paragraphs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_links_order_idx" ON "rooms_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_links_parent_id_idx" ON "rooms_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_rels_order_idx" ON "rooms_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "rooms_rels_parent_idx" ON "rooms_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_rels_path_idx" ON "rooms_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "rooms_rels_rooms_services_id_idx" ON "rooms_rels" USING btree ("rooms_services_id");
  CREATE INDEX IF NOT EXISTS "rooms_rels_rooms_packages_id_idx" ON "rooms_rels" USING btree ("rooms_packages_id");
  CREATE INDEX IF NOT EXISTS "rooms_rels_rooms_contact_id_idx" ON "rooms_rels" USING btree ("rooms_contact_id");
  CREATE INDEX IF NOT EXISTS "rooms_contact_user_idx" ON "rooms_contact" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "rooms_contact_updated_at_idx" ON "rooms_contact" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rooms_contact_created_at_idx" ON "rooms_contact" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "rooms_packages_features_order_idx" ON "rooms_packages_features" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_packages_features_parent_id_idx" ON "rooms_packages_features" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_packages_user_idx" ON "rooms_packages" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "rooms_packages_image_idx" ON "rooms_packages" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "rooms_packages_updated_at_idx" ON "rooms_packages" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rooms_packages_created_at_idx" ON "rooms_packages" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "rooms_packages_rels_order_idx" ON "rooms_packages_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "rooms_packages_rels_parent_idx" ON "rooms_packages_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_packages_rels_path_idx" ON "rooms_packages_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "rooms_packages_rels_rooms_services_id_idx" ON "rooms_packages_rels" USING btree ("rooms_services_id");
  CREATE INDEX IF NOT EXISTS "rooms_services_skills_order_idx" ON "rooms_services_skills" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_services_skills_parent_id_idx" ON "rooms_services_skills" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_services_user_idx" ON "rooms_services" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "rooms_services_category_idx" ON "rooms_services" USING btree ("category_id");
  CREATE INDEX IF NOT EXISTS "rooms_services_updated_at_idx" ON "rooms_services" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "rooms_services_created_at_idx" ON "rooms_services" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "service_categories_slug_idx" ON "service_categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "service_categories_updated_at_idx" ON "service_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "service_categories_created_at_idx" ON "service_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "users_rels_order_idx" ON "users_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "users_rels_parent_idx" ON "users_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "users_rels_path_idx" ON "users_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "users_rels_roles_id_idx" ON "users_rels" USING btree ("roles_id");
  CREATE INDEX IF NOT EXISTS "verification_tokens_email_user_idx" ON "verification_tokens_email" USING btree ("user_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "verification_tokens_email_token_idx" ON "verification_tokens_email" USING btree ("token");
  CREATE INDEX IF NOT EXISTS "verification_tokens_email_updated_at_idx" ON "verification_tokens_email" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "verification_tokens_email_created_at_idx" ON "verification_tokens_email" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "media_private" ADD CONSTRAINT "media_private_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "users" ADD CONSTRAINT "users_avatar_id_media_public_id_fk" FOREIGN KEY ("avatar_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_files" ADD CONSTRAINT "products_files_file_id_media_private_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media_private"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_service_id_rooms_services_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."rooms_services"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_package_id_rooms_packages_id_fk" FOREIGN KEY ("package_id") REFERENCES "public"."rooms_packages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "orders" ADD CONSTRAINT "orders_room_owner_id_users_id_fk" FOREIGN KEY ("room_owner_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_education_list" ADD CONSTRAINT "rooms_education_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_experience_list" ADD CONSTRAINT "rooms_experience_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_qualification_list" ADD CONSTRAINT "rooms_qualification_list_certificate_id_media_public_id_fk" FOREIGN KEY ("certificate_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_qualification_list" ADD CONSTRAINT "rooms_qualification_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_skills_list_skills_categorized" ADD CONSTRAINT "rooms_skills_list_skills_categorized_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms_skills_list"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms_skills_list" ADD CONSTRAINT "rooms_skills_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms" ADD CONSTRAINT "rooms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms" ADD CONSTRAINT "rooms_information_photograph_id_media_public_id_fk" FOREIGN KEY ("information_photograph_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms" ADD CONSTRAINT "rooms_about_photograph_id_media_public_id_fk" FOREIGN KEY ("about_photograph_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms" ADD CONSTRAINT "rooms_experience_photograph_id_media_public_id_fk" FOREIGN KEY ("experience_photograph_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms" ADD CONSTRAINT "rooms_qualification_photograph_id_media_public_id_fk" FOREIGN KEY ("qualification_photograph_id") REFERENCES "public"."media_public"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_achievement_notifications_fk" FOREIGN KEY ("achievement_notifications_id") REFERENCES "public"."achievement_notifications"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_categories_fk" FOREIGN KEY ("blogs_categories_id") REFERENCES "public"."blogs_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_posts_fk" FOREIGN KEY ("blogs_posts_id") REFERENCES "public"."blogs_posts"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_rooms_fk" FOREIGN KEY ("blogs_rooms_id") REFERENCES "public"."blogs_rooms"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_private_fk" FOREIGN KEY ("media_private_id") REFERENCES "public"."media_private"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_public_fk" FOREIGN KEY ("media_public_id") REFERENCES "public"."media_public"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_notifications_fk" FOREIGN KEY ("notifications_id") REFERENCES "public"."notifications"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_permissions_fk" FOREIGN KEY ("permissions_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_roles_fk" FOREIGN KEY ("roles_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_contact_fk" FOREIGN KEY ("rooms_contact_id") REFERENCES "public"."rooms_contact"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_packages_fk" FOREIGN KEY ("rooms_packages_id") REFERENCES "public"."rooms_packages"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_rooms_services_fk" FOREIGN KEY ("rooms_services_id") REFERENCES "public"."rooms_services"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_categories_fk" FOREIGN KEY ("service_categories_id") REFERENCES "public"."service_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_verification_tokens_email_fk" FOREIGN KEY ("verification_tokens_email_id") REFERENCES "public"."verification_tokens_email"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_private_user_idx" ON "media_private" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "media_private_updated_at_idx" ON "media_private" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_private_created_at_idx" ON "media_private" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_private_filename_idx" ON "media_private" USING btree ("filename");
  CREATE INDEX IF NOT EXISTS "users_avatar_idx" ON "users" USING btree ("avatar_id");
  CREATE INDEX IF NOT EXISTS "orders_items_service_idx" ON "orders_items" USING btree ("service_id");
  CREATE INDEX IF NOT EXISTS "orders_items_package_idx" ON "orders_items" USING btree ("package_id");
  CREATE INDEX IF NOT EXISTS "orders_room_owner_idx" ON "orders" USING btree ("room_owner_id");
  CREATE INDEX IF NOT EXISTS "rooms_education_list_order_idx" ON "rooms_education_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_education_list_parent_id_idx" ON "rooms_education_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_experience_list_order_idx" ON "rooms_experience_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_experience_list_parent_id_idx" ON "rooms_experience_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_qualification_list_order_idx" ON "rooms_qualification_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_qualification_list_parent_id_idx" ON "rooms_qualification_list" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_qualification_list_certificate_idx" ON "rooms_qualification_list" USING btree ("certificate_id");
  CREATE INDEX IF NOT EXISTS "rooms_skills_list_skills_categorized_order_idx" ON "rooms_skills_list_skills_categorized" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_skills_list_skills_categorized_parent_id_idx" ON "rooms_skills_list_skills_categorized" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "rooms_skills_list_order_idx" ON "rooms_skills_list" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "rooms_skills_list_parent_id_idx" ON "rooms_skills_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "rooms_user_idx" ON "rooms" USING btree ("user_id");
  CREATE INDEX IF NOT EXISTS "rooms_information_information_photograph_idx" ON "rooms" USING btree ("information_photograph_id");
  CREATE INDEX IF NOT EXISTS "rooms_about_about_photograph_idx" ON "rooms" USING btree ("about_photograph_id");
  CREATE INDEX IF NOT EXISTS "rooms_experience_experience_photograph_idx" ON "rooms" USING btree ("experience_photograph_id");
  CREATE INDEX IF NOT EXISTS "rooms_qualification_qualification_photograph_idx" ON "rooms" USING btree ("qualification_photograph_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_achievement_notifications_id_idx" ON "payload_locked_documents_rels" USING btree ("achievement_notifications_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blogs_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blogs_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_posts_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blogs_rooms_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_rooms_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_private_id_idx" ON "payload_locked_documents_rels" USING btree ("media_private_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_public_id_idx" ON "payload_locked_documents_rels" USING btree ("media_public_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_notifications_id_idx" ON "payload_locked_documents_rels" USING btree ("notifications_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_permissions_id_idx" ON "payload_locked_documents_rels" USING btree ("permissions_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_roles_id_idx" ON "payload_locked_documents_rels" USING btree ("roles_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rooms_contact_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_contact_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rooms_packages_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_packages_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_rooms_services_id_idx" ON "payload_locked_documents_rels" USING btree ("rooms_services_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_service_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("service_categories_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_verification_tokens_email_id_idx" ON "payload_locked_documents_rels" USING btree ("verification_tokens_email_id");
  ALTER TABLE "rooms_qualification_list" DROP COLUMN IF EXISTS "description";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "hero_description_professional";
  ALTER TABLE "comments_rels" DROP COLUMN IF EXISTS "blogs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blogs_id";
  ALTER TABLE "public"."rooms_education_list" ALTER COLUMN "status" SET DATA TYPE text;
  DROP TYPE "public"."enum_rooms_education_list_status";
  CREATE TYPE "public"."enum_rooms_education_list_status" AS ENUM('in-progress', 'graduated', 'dropped-out');
  ALTER TABLE "public"."rooms_education_list" ALTER COLUMN "status" SET DATA TYPE "public"."enum_rooms_education_list_status" USING "status"::"public"."enum_rooms_education_list_status";
  DROP TYPE "public"."enum_blogs_status";
  DROP TYPE "public"."enum__blogs_v_version_status";`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'system-user', 'website-user');
  CREATE TYPE "public"."enum_orders_type" AS ENUM('free', 'paid');
  CREATE TYPE "public"."enum_orders_status" AS ENUM('pending', 'paid', 'failed', 'refunded', 'not-applicable');
  CREATE TYPE "public"."enum_rooms_education_status" AS ENUM('in-progress', 'completed', 'cancelled');
  CREATE TYPE "public"."enum_rooms_experience_type" AS ENUM('employment', 'activity');
  CREATE TYPE "public"."enum_rooms_skills_skills_categorized_level" AS ENUM('beginner', 'intermediate', 'advanced', 'expert');
  CREATE TYPE "public"."enum_blogs_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blogs_v_version_status" AS ENUM('draft', 'published');
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
  
  ALTER TABLE "achievement_notifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_posts_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_rooms" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blogs_rooms_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_private" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_public" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notifications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "notifications_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "permissions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "roles_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_about_paragraphs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_education_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_experience_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_qualification_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_skills_list_skills_categorized" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_skills_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_packages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_packages" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_packages_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_services_skills" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "rooms_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "users_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "verification_tokens_email" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "achievement_notifications" CASCADE;
  DROP TABLE "blogs_categories" CASCADE;
  DROP TABLE "blogs_posts_references" CASCADE;
  DROP TABLE "blogs_posts" CASCADE;
  DROP TABLE "blogs_posts_rels" CASCADE;
  DROP TABLE "blogs_rooms" CASCADE;
  DROP TABLE "blogs_rooms_rels" CASCADE;
  DROP TABLE "media_private" CASCADE;
  DROP TABLE "media_public" CASCADE;
  DROP TABLE "notifications" CASCADE;
  DROP TABLE "notifications_rels" CASCADE;
  DROP TABLE "permissions" CASCADE;
  DROP TABLE "roles" CASCADE;
  DROP TABLE "roles_rels" CASCADE;
  DROP TABLE "rooms_about_paragraphs" CASCADE;
  DROP TABLE "rooms_education_list" CASCADE;
  DROP TABLE "rooms_experience_list" CASCADE;
  DROP TABLE "rooms_qualification_list" CASCADE;
  DROP TABLE "rooms_skills_list_skills_categorized" CASCADE;
  DROP TABLE "rooms_skills_list" CASCADE;
  DROP TABLE "rooms_links" CASCADE;
  DROP TABLE "rooms_rels" CASCADE;
  DROP TABLE "rooms_contact" CASCADE;
  DROP TABLE "rooms_packages_features" CASCADE;
  DROP TABLE "rooms_packages" CASCADE;
  DROP TABLE "rooms_packages_rels" CASCADE;
  DROP TABLE "rooms_services_skills" CASCADE;
  DROP TABLE "rooms_services" CASCADE;
  DROP TABLE "service_categories" CASCADE;
  DROP TABLE "users_rels" CASCADE;
  DROP TABLE "verification_tokens_email" CASCADE;
  ALTER TABLE "orders_items" DROP CONSTRAINT "orders_items_service_id_rooms_services_id_fk";
  
  ALTER TABLE "orders_items" DROP CONSTRAINT "orders_items_package_id_rooms_packages_id_fk";
  
  ALTER TABLE "orders" DROP CONSTRAINT "orders_room_owner_id_users_id_fk";
  
  ALTER TABLE "products_files" DROP CONSTRAINT "products_files_file_id_media_private_id_fk";
  
  ALTER TABLE "rooms" DROP CONSTRAINT "rooms_user_id_users_id_fk";
  
  ALTER TABLE "rooms" DROP CONSTRAINT "rooms_information_photograph_id_media_public_id_fk";
  
  ALTER TABLE "rooms" DROP CONSTRAINT "rooms_about_photograph_id_media_public_id_fk";
  
  ALTER TABLE "rooms" DROP CONSTRAINT "rooms_experience_photograph_id_media_public_id_fk";
  
  ALTER TABLE "rooms" DROP CONSTRAINT "rooms_qualification_photograph_id_media_public_id_fk";
  
  ALTER TABLE "users" DROP CONSTRAINT "users_avatar_id_media_public_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_achievement_notifications_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blogs_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blogs_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blogs_rooms_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_private_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_media_public_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_notifications_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_permissions_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_roles_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rooms_contact_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rooms_packages_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_rooms_services_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_verification_tokens_email_fk";
  
  DROP INDEX IF EXISTS "orders_items_service_idx";
  DROP INDEX IF EXISTS "orders_items_package_idx";
  DROP INDEX IF EXISTS "orders_room_owner_idx";
  DROP INDEX IF EXISTS "rooms_user_idx";
  DROP INDEX IF EXISTS "rooms_information_information_photograph_idx";
  DROP INDEX IF EXISTS "rooms_about_about_photograph_idx";
  DROP INDEX IF EXISTS "rooms_experience_experience_photograph_idx";
  DROP INDEX IF EXISTS "rooms_qualification_qualification_photograph_idx";
  DROP INDEX IF EXISTS "users_avatar_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_achievement_notifications_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_blogs_categories_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_blogs_posts_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_blogs_rooms_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_media_private_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_media_public_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_notifications_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_permissions_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_roles_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rooms_contact_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rooms_packages_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_rooms_services_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_service_categories_id_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_verification_tokens_email_id_idx";
  ALTER TABLE "orders_items" ALTER COLUMN "product_id" SET NOT NULL;
  ALTER TABLE "orders_items" ALTER COLUMN "price" DROP DEFAULT;
  ALTER TABLE "comments_rels" ADD COLUMN "blogs_id" integer;
  ALTER TABLE "orders" ADD COLUMN "type" "enum_orders_type" DEFAULT 'free' NOT NULL;
  ALTER TABLE "orders" ADD COLUMN "status" "enum_orders_status" DEFAULT 'pending';
  ALTER TABLE "rooms" ADD COLUMN "hero_name_professional" varchar NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "hero_title_professional" varchar NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "hero_description_professional" varchar NOT NULL;
  ALTER TABLE "rooms" ADD COLUMN "hero_image_professional_id" integer;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'website-user' NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "media_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blogs_id" integer;
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
   ALTER TABLE "_blogs_v" ADD CONSTRAINT "_blogs_v_parent_id_blogs_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blogs"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX IF NOT EXISTS "media_filename_idx" ON "media" USING btree ("filename");
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
  DO $$ BEGIN
   ALTER TABLE "comments_rels" ADD CONSTRAINT "comments_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_files" ADD CONSTRAINT "products_files_file_id_media_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "rooms" ADD CONSTRAINT "rooms_hero_image_professional_id_media_id_fk" FOREIGN KEY ("hero_image_professional_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blogs_fk" FOREIGN KEY ("blogs_id") REFERENCES "public"."blogs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "comments_rels_blogs_id_idx" ON "comments_rels" USING btree ("blogs_id");
  CREATE INDEX IF NOT EXISTS "rooms_hero_hero_image_professional_idx" ON "rooms" USING btree ("hero_image_professional_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_blogs_id_idx" ON "payload_locked_documents_rels" USING btree ("blogs_id");
  ALTER TABLE "orders_items" DROP COLUMN IF EXISTS "item_type";
  ALTER TABLE "orders_items" DROP COLUMN IF EXISTS "service_id";
  ALTER TABLE "orders_items" DROP COLUMN IF EXISTS "package_id";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "room_owner_id";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "order_type";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "customer_name";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "customer_email";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "customer_phone";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "customer_message";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "product_order_type";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "order_status";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "product_order_status";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "stripe_session_id";
  ALTER TABLE "orders" DROP COLUMN IF EXISTS "stripe_payment_intent_id";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "user_id";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "status";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "information_name";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "information_title";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "information_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "information_status";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "information_photograph_id";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_headline_sub";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_photograph_id";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_experience_years";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_experience_heading";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_experience_description";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_happy_clients_clients";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_happy_clients_heading";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_happy_clients_description";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_milestones_achieved_milestones";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_milestones_achieved_heading";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "about_stats_milestones_achieved_description";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "education_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "education_headline_sub";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "experience_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "experience_headline_sub";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "experience_photograph_id";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "qualification_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "qualification_headline_sub";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "qualification_photograph_id";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "skills_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "skills_headline_sub";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "services_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "services_headline_sub";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "packages_headline";
  ALTER TABLE "rooms" DROP COLUMN IF EXISTS "packages_headline_sub";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "account_verified";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "pending_email";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "bio";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "avatar_id";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "links_social_github";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "links_social_instagram";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "links_social_twitter";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "links_social_linkedin";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "links_social_website";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "privacy_settings_show_email";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "privacy_settings_show_activity";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "privacy_settings_show_achievements";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "privacy_settings_show_orders";
  ALTER TABLE "users" DROP COLUMN IF EXISTS "previous_role";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "achievement_notifications_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blogs_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blogs_posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "blogs_rooms_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "media_private_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "media_public_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "notifications_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "permissions_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "roles_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "rooms_contact_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "rooms_packages_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "rooms_services_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "service_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "verification_tokens_email_id";
  DROP TYPE "public"."enum_blogs_posts_references_type";
  DROP TYPE "public"."enum_blogs_posts_status";
  DROP TYPE "public"."enum_blogs_rooms_language";
  DROP TYPE "public"."enum_blogs_rooms_color";
  DROP TYPE "public"."enum_notifications_type";
  DROP TYPE "public"."enum_notifications_resource_type";
  DROP TYPE "public"."enum_orders_items_item_type";
  DROP TYPE "public"."enum_orders_order_type";
  DROP TYPE "public"."enum_orders_product_order_type";
  DROP TYPE "public"."enum_orders_order_status";
  DROP TYPE "public"."enum_orders_product_order_status";
  DROP TYPE "public"."enum_permissions_resource";
  DROP TYPE "public"."enum_permissions_action";
  DROP TYPE "public"."enum_rooms_education_list_status";
  DROP TYPE "public"."enum_rooms_experience_list_type";
  DROP TYPE "public"."enum_rooms_skills_list_skills_categorized_level";
  DROP TYPE "public"."enum_rooms_status";
  DROP TYPE "public"."enum_rooms_information_status";
  DROP TYPE "public"."enum_rooms_contact_type";
  DROP TYPE "public"."enum_rooms_contact_status";
  DROP TYPE "public"."enum_rooms_packages_pricing_type";
  DROP TYPE "public"."enum_rooms_packages_currency";
  DROP TYPE "public"."enum_rooms_packages_status";
  DROP TYPE "public"."enum_rooms_services_status";
  DROP TYPE "public"."enum_service_categories_color";
  DROP TYPE "public"."enum_service_categories_status";
  DROP TYPE "public"."enum_users_previous_role";`);
}
