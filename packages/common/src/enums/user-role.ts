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
