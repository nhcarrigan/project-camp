import { z } from "zod";

/**
 * Zod validation schema representing a many-to-many link between a project and a skill.
 */
export const projectSkillSchema = z.object({
  projectId: z.string().uuid(),
  skillId: z.string().uuid(),
  createdAt: z.coerce.date(),
});

/**
 * Project skill model representing an association between a project and a required skill.
 */
export type ProjectSkill = z.infer<typeof projectSkillSchema>;

/**
 * Zod validation schema for associating a skill with a project.
 */
export const insertProjectSkillSchema = projectSkillSchema.omit({
  createdAt: true,
});

/**
 * Payload required to associate a skill with a project.
 */
export type InsertProjectSkill = z.infer<typeof insertProjectSkillSchema>;
