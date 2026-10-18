import { z } from "zod";

/**
 * Zod validation schema representing a persisted test record from the database,
 * containing its unique UUID identifier, user names, and creation audit timestamp.
 */
export const testTableSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Last name is required"),
  createdAt: z.coerce.date(),
});

/**
 * Business model representing a retrieved test record from the database.
 */
export type TestTable = z.infer<typeof testTableSchema>;

/**
 * Zod validation schema for creating a new test record, omitting server-managed
 * fields like `id` and `createdAt`.
 */
export const insertTestTableSchema = testTableSchema.omit({
  id: true,
  createdAt: true,
});

/**
 * Payload required to insert a new test record.
 */
export type InsertTestTable = z.infer<typeof insertTestTableSchema>;
