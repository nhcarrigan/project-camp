import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { relations } from "./schemas/relations";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
});

export const db = drizzle({ client: pool, relations });

// Re-export query operators from the same drizzle-orm instance to avoid
// version/type mismatches across workspace packages.
export { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
export * from "./constants";
export * from "./schemas";
// Explicit named exports are required for tsx/Node CJS->ESM static analysis
// across chained `export *` barrels when running tests without a build step.
export {
  projectMembers,
  projectMilestones,
  projectSkills,
  projectVotes,
  projects,
  skills,
  users,
} from "./schemas";
export * from "./types";
