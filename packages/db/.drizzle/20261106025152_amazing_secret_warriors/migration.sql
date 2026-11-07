ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE text USING "email"::text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE text USING "name"::text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "bio" SET DATA TYPE text USING "bio"::text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "github_username" SET DATA TYPE text USING "github_username"::text;--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "name" SET DATA TYPE text USING "name"::text;--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "slug" SET DATA TYPE text USING "slug"::text;--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "category" SET DATA TYPE text USING "category"::text;--> statement-breakpoint
ALTER TABLE "skills" ALTER COLUMN "description" SET DATA TYPE text USING "description"::text;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "title" SET DATA TYPE text USING "title"::text;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "slug" SET DATA TYPE text USING "slug"::text;--> statement-breakpoint
ALTER TABLE "project_milestones" ALTER COLUMN "title" SET DATA TYPE text USING "title"::text;