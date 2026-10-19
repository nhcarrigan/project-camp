import { z } from "zod";
import { milestoneStatusSchema } from "../enums/index";

/**
 * Zod validation schema representing a time-boxed milestone within a project.
 */
export const projectMilestoneSchema = z.object({
  id: z.string().uuid(),
  projectId: z.string().uuid(),
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().nullable().optional(),
  status: milestoneStatusSchema.default("pending"),
  dueDate: z.coerce.date().nullable().optional(),
  order: z.number().int().nonnegative().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * Project milestone model representing a structured timeline milestone.
 */
export type ProjectMilestone = z.infer<typeof projectMilestoneSchema>;

/**
 * Zod validation schema for inserting a milestone into the database.
 */
export const insertProjectMilestoneSchema = projectMilestoneSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Payload required to insert a project milestone into the database.
 */
export type InsertProjectMilestone = z.infer<
  typeof insertProjectMilestoneSchema
>;

/**
 * Zod validation schema for creating a new milestone on a project from client requests.
 */
export const createMilestoneSchema = projectMilestoneSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

/**
 * Payload required to create a project milestone.
 */
export type CreateMilestone = z.infer<typeof createMilestoneSchema>;

/**
 * Zod validation schema for updating an existing milestone.
 */
export const updateMilestoneSchema = projectMilestoneSchema
  .pick({
    title: true,
    description: true,
    status: true,
    dueDate: true,
    order: true,
  })
  .partial();

/**
 * Payload required to update a project milestone.
 */
export type UpdateMilestone = z.infer<typeof updateMilestoneSchema>;
