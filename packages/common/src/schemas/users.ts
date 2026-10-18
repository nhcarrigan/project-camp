import { z } from "zod";
import { userRoleSchema } from "../enums/index.js";

/**
 * Zod validation schema representing a full user account and developer profile.
 */
export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1, "Name is required").max(100),
  role: userRoleSchema.default("member"),
  bio: z.string().max(500).nullable().optional(),
  githubUsername: z
    .string()
    .regex(
      /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
      "Invalid GitHub username",
    )
    .nullable()
    .optional(),
  website: z.string().url().nullable().optional(),
  reputationScore: z.number().int().nonnegative().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

/**
 * User model representing a registered platform user.
 */
export type User = z.infer<typeof userSchema>;

/**
 * Zod validation schema for creating a new user record.
 */
export const insertUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  reputationScore: true,
});

/**
 * Payload required to insert a new user record.
 */
export type InsertUser = z.infer<typeof insertUserSchema>;

/**
 * Zod validation schema for updating an existing user's public developer profile.
 */
export const updateUserProfileSchema = userSchema
  .pick({
    name: true,
    bio: true,
    githubUsername: true,
    website: true,
  })
  .partial();

/**
 * Payload required to update a developer's profile.
 */
export type UpdateUserProfile = z.infer<typeof updateUserProfileSchema>;
