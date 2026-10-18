import { z } from "zod";

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
