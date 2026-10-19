import { z } from "zod";
import { projectDifficultySchema, projectStatusSchema } from "../enums/index";
import { paginationQuerySchema } from "../pagination/index";

/**
 * Zod validation schema representing a persisted project or proposal.
 */
export const projectSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z.string().min(3, "Slug must be at least 3 characters").max(100),
  description: z.string().min(10, "Description must be at least 10 characters"),
  status: projectStatusSchema.default("draft"),
  difficulty: projectDifficultySchema.default("intermediate"),
  repositoryUrl: z.string().url("Must be a valid URL").nullable().optional(),
  ownerId: z.string().uuid(),
  upvotesCount: z.number().int().nonnegative().default(0),
  downvotesCount: z.number().int().nonnegative().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Project model representing a proposed, ongoing, or completed project.
 */
export type Project = z.infer<typeof projectSchema>;

/**
 * Zod validation schema for inserting a new project record into the database.
 */
export const insertProjectSchema = projectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  upvotesCount: true,
  downvotesCount: true,
});

/**
 * Payload required to insert a new project record.
 */
export type InsertProject = z.infer<typeof insertProjectSchema>;

/**
 * Zod validation schema for submitting a new project proposal, including associated skills.
 */
export const createProjectSchema = projectSchema
  .pick({
    title: true,
    description: true,
    difficulty: true,
    repositoryUrl: true,
  })
  .extend({
    skillIds: z
      .array(z.string().uuid())
      .min(1, "Select at least one required skill"),
  });

/**
 * Payload required to submit a project proposal from the client.
 */
export type CreateProject = z.infer<typeof createProjectSchema>;

/**
 * Zod validation schema for updating an existing project's metadata.
 */
export const updateProjectSchema = projectSchema
  .pick({
    title: true,
    description: true,
    status: true,
    difficulty: true,
    repositoryUrl: true,
  })
  .partial();

/**
 * Payload required to update an existing project.
 */
export type UpdateProject = z.infer<typeof updateProjectSchema>;

/**
 * Zod validation schema for querying and filtering projects list.
 */
export const projectFilterQuerySchema = paginationQuerySchema.extend({
  status: projectStatusSchema.optional(),
  difficulty: projectDifficultySchema.optional(),
  search: z.string().optional(),
  skill: z.string().optional(),
});

/**
 * Parsed project query parameters.
 */
export type ProjectFilterQuery = z.infer<typeof projectFilterQuerySchema>;
