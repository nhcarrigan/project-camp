import { z } from "zod";

/**
 * Suggested standard developer skill and technology taxonomy categories.
 */
export const STANDARD_SKILL_CATEGORIES = [
  "language",
  "framework",
  "database",
  "devops",
  "tool",
  "frontend",
  "backend",
  "mobile",
  "ai_ml",
  "design",
  "other",
] as const;

/**
 * Type representing standard suggested skill categories.
 */
export type StandardSkillCategory = (typeof STANDARD_SKILL_CATEGORIES)[number];

/**
 * Zod validation schema representing categorizations for developer skills and technology stacks.
 * Supports extensible and externally defined taxonomy categories while maintaining length bounds.
 */
export const skillCategorySchema = z
  .string()
  .trim()
  .min(1, "Skill category is required")
  .max(50)
  .toLowerCase();

/**
 * Skill categorization type.
 */
export type SkillCategory = z.infer<typeof skillCategorySchema>;
