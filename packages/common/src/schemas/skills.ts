import { z } from "zod";
import { skillCategorySchema } from "../enums/index";

/**
 * Zod validation schema representing a skill or technology taxonomy entry.
 */
export const skillSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required").max(50),
  slug: z.string().min(1, "Slug is required").max(100),
  category: skillCategorySchema,
  description: z.string().max(300).nullable().optional(),
  createdAt: z.coerce.date(),
});

/**
 * Skill model representing a developer proficiency or project tech requirement.
 */
export type Skill = z.infer<typeof skillSchema>;

/**
 * Zod validation schema for creating a new skill entry.
 */
export const insertSkillSchema = skillSchema.omit({
  id: true,
  createdAt: true,
});

/**
 * Payload required to insert a new skill.
 */
export type InsertSkill = z.infer<typeof insertSkillSchema>;
