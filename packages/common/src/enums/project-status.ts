import { z } from "zod";

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
