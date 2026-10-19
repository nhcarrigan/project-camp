CREATE TYPE "milestone_status" AS ENUM('pending', 'in_progress', 'completed', 'blocked');--> statement-breakpoint
CREATE TYPE "project_difficulty" AS ENUM('beginner', 'intermediate', 'advanced');--> statement-breakpoint
CREATE TYPE "project_member_role" AS ENUM('owner', 'maintainer', 'contributor', 'volunteer');--> statement-breakpoint
CREATE TYPE "project_member_status" AS ENUM('pending', 'accepted', 'rejected', 'left');--> statement-breakpoint
CREATE TYPE "project_status" AS ENUM('draft', 'proposal', 'voting', 'in_development', 'completed', 'archived');--> statement-breakpoint
CREATE TYPE "skill_category" AS ENUM('frontend', 'backend', 'devops', 'database', 'mobile', 'ai_ml', 'design', 'other');--> statement-breakpoint
CREATE TYPE "user_role" AS ENUM('admin', 'maintainer', 'contributor', 'volunteer', 'member');--> statement-breakpoint
CREATE TYPE "vote_type" AS ENUM('upvote', 'downvote');--> statement-breakpoint
CREATE TABLE "project_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" "project_member_role" DEFAULT 'volunteer'::"project_member_role" NOT NULL,
	"status" "project_member_status" DEFAULT 'pending'::"project_member_status" NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_members_project_user_uq" UNIQUE("project_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "project_milestones" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"project_id" uuid NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" text,
	"status" "milestone_status" DEFAULT 'pending'::"milestone_status" NOT NULL,
	"due_date" timestamp with time zone,
	"order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_skills" (
	"project_id" uuid,
	"skill_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_skills_pkey" PRIMARY KEY("project_id","skill_id")
);
--> statement-breakpoint
CREATE TABLE "project_votes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"project_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"vote_type" "vote_type" NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "project_votes_project_user_uq" UNIQUE("project_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" varchar(200) NOT NULL,
	"slug" varchar(100) NOT NULL UNIQUE,
	"description" text NOT NULL,
	"status" "project_status" DEFAULT 'draft'::"project_status" NOT NULL,
	"difficulty" "project_difficulty" DEFAULT 'intermediate'::"project_difficulty" NOT NULL,
	"repository_url" text,
	"owner_id" uuid NOT NULL,
	"upvotes_count" integer DEFAULT 0 NOT NULL,
	"downvotes_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar(50) NOT NULL UNIQUE,
	"slug" varchar(100) NOT NULL UNIQUE,
	"category" "skill_category" NOT NULL,
	"description" varchar(300),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"email" varchar(255) NOT NULL UNIQUE,
	"name" varchar(100) NOT NULL,
	"role" "user_role" DEFAULT 'member'::"user_role" NOT NULL,
	"bio" varchar(500),
	"github_username" varchar(39),
	"website" text,
	"reputation_score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "project_members_project_id_idx" ON "project_members" ("project_id");--> statement-breakpoint
CREATE INDEX "project_members_user_id_idx" ON "project_members" ("user_id");--> statement-breakpoint
CREATE INDEX "project_milestones_project_id_idx" ON "project_milestones" ("project_id");--> statement-breakpoint
CREATE INDEX "project_milestones_status_idx" ON "project_milestones" ("status");--> statement-breakpoint
CREATE INDEX "project_skills_skill_id_idx" ON "project_skills" ("skill_id");--> statement-breakpoint
CREATE INDEX "project_votes_project_id_idx" ON "project_votes" ("project_id");--> statement-breakpoint
CREATE INDEX "project_votes_user_id_idx" ON "project_votes" ("user_id");--> statement-breakpoint
CREATE INDEX "projects_owner_id_idx" ON "projects" ("owner_id");--> statement-breakpoint
CREATE INDEX "projects_status_idx" ON "projects" ("status");--> statement-breakpoint
CREATE INDEX "projects_difficulty_idx" ON "projects" ("difficulty");--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_project_id_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_members" ADD CONSTRAINT "project_members_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_milestones" ADD CONSTRAINT "project_milestones_project_id_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_project_id_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_skills" ADD CONSTRAINT "project_skills_skill_id_skills_id_fkey" FOREIGN KEY ("skill_id") REFERENCES "skills"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_votes" ADD CONSTRAINT "project_votes_project_id_projects_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "project_votes" ADD CONSTRAINT "project_votes_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_users_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE;