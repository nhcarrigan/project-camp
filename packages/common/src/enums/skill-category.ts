import { z } from "zod";

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
