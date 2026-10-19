import { pgEnum } from "drizzle-orm/pg-core";

/**
 * User system roles across the platform.
 */
export const userRoleEnum = pgEnum("user_role", [
  "admin",
  "maintainer",
  "contributor",
  "volunteer",
  "member",
]);

/**
 * Lifecycle states of an open-source project or proposal.
 */
export const projectStatusEnum = pgEnum("project_status", [
  "draft",
  "proposal",
  "voting",
  "in_development",
  "completed",
  "archived",
]);

/**
 * Target technical difficulty levels for contributors.
 */
export const projectDifficultyEnum = pgEnum("project_difficulty", [
  "beginner",
  "intermediate",
  "advanced",
]);

/**
 * Project community voting types.
 */
export const voteTypeEnum = pgEnum("vote_type", ["upvote", "downvote"]);

/**
 * Categorization for developer skills and technology stacks.
 */
export const skillCategoryEnum = pgEnum("skill_category", [
  "frontend",
  "backend",
  "devops",
  "database",
  "mobile",
  "ai_ml",
  "design",
  "other",
]);

/**
 * Functional roles assigned to project team members.
 */
export const projectMemberRoleEnum = pgEnum("project_member_role", [
  "owner",
  "maintainer",
  "contributor",
  "volunteer",
]);

/**
 * Membership and application status for a project member.
 */
export const projectMemberStatusEnum = pgEnum("project_member_status", [
  "pending",
  "accepted",
  "rejected",
  "left",
]);

/**
 * Progress states for project milestones.
 */
export const milestoneStatusEnum = pgEnum("milestone_status", [
  "pending",
  "in_progress",
  "completed",
  "blocked",
]);
