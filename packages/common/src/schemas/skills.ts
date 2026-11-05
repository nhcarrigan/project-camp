import { z } from "zod";
import { skillCategorySchema } from "../enums/index";
import { searchQueryParamSchema } from "../search/index";

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

/**
 * Zod validation schema representing a single tag lookup item with project usage metrics.
 */
export const tagItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  slug: z.string().min(1).max(100),
  category: skillCategorySchema,
  projectCount: z.number().int().nonnegative(),
});

/**
 * Tag item representation returned in autocomplete and taxonomy listings.
 */
export type TagItem = z.infer<typeof tagItemSchema>;

/**
 * Zod validation schema for querying taxonomy tags and skills.
 */
export const tagsQuerySchema = z.object({
  category: skillCategorySchema.optional(),
  q: searchQueryParamSchema,
  limit: z.coerce.number().int().positive().max(100).default(50),
});

/**
 * Query parameter payload for filtering and searching tags.
 */
export type TagsQuery = z.infer<typeof tagsQuerySchema>;

/**
 * Zod validation schema for the tags lookup API response payload.
 */
export const tagsResponseSchema = z.object({
  tags: z.array(tagItemSchema),
});

/**
 * Response payload structure for tags lookup endpoints.
 */
export type TagsResponse = z.infer<typeof tagsResponseSchema>;
