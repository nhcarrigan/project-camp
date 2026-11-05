import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { relations } from "./schemas/relations";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "",
});

export const db = drizzle({ client: pool, relations });

export { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
export * from "./constants";
export * from "./schemas";
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
