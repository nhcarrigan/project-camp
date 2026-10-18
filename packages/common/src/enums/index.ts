import { z } from "zod";

/**
 * Zod validation schema representing user system roles across the platform.
 */
export const userRoleSchema = z.enum([
  "admin",
  "maintainer",
  "contributor",
  "volunteer",
  "member",
]);

/**
 * User system roles type.
 */
export type UserRole = z.infer<typeof userRoleSchema>;

/**
 * Zod validation schema representing lifecycle states of an open-source project or proposal.
 */
export const projectStatusSchema = z.enum([
  "draft",
  "proposal",
  "voting",
  "in_development",
  "completed",
  "archived",
]);

/**
 * Project lifecycle states type.
 */
export type ProjectStatus = z.infer<typeof projectStatusSchema>;

/**
 * Zod validation schema representing target technical difficulty levels for contributors.
 */
export const projectDifficultySchema = z.enum([
  "beginner",
  "intermediate",
  "advanced",
]);

/**
 * Target technical difficulty levels type.
 */
export type ProjectDifficulty = z.infer<typeof projectDifficultySchema>;

/**
 * Zod validation schema representing community voting types (upvote or downvote).
 */
export const voteTypeSchema = z.enum(["upvote", "downvote"]);

/**
 * Community voting type.
 */
export type VoteType = z.infer<typeof voteTypeSchema>;

/**
 * Zod validation schema representing categorizations for developer skills and technology stacks.
 */
export const skillCategorySchema = z.enum([
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
 * Skill categorization type.
 */
export type SkillCategory = z.infer<typeof skillCategorySchema>;

/**
 * Zod validation schema representing functional roles assigned to project team members.
 */
export const projectMemberRoleSchema = z.enum([
  "owner",
  "maintainer",
  "contributor",
  "volunteer",
]);

/**
 * Project team member functional role type.
 */
export type ProjectMemberRole = z.infer<typeof projectMemberRoleSchema>;

/**
 * Zod validation schema representing membership and application status for a project member.
 */
export const projectMemberStatusSchema = z.enum([
  "pending",
  "accepted",
  "rejected",
  "left",
]);

/**
 * Project membership status type.
 */
export type ProjectMemberStatus = z.infer<typeof projectMemberStatusSchema>;

/**
 * Zod validation schema representing progress states for time-boxed project milestones.
 */
export const milestoneStatusSchema = z.enum([
  "pending",
  "in_progress",
  "completed",
  "blocked",
]);

/**
 * Project milestone progress state type.
 */
export type MilestoneStatus = z.infer<typeof milestoneStatusSchema>;
