import { execSync } from "node:child_process";
import process from "node:process";

try {
  console.log("Checking migration integrity with drizzle-kit check...");
  execSync("pnpm exec drizzle-kit check", { stdio: "inherit" });

  console.log("Checking for ungenerated schema changes...");
  execSync("pnpm exec drizzle-kit generate", { stdio: "inherit" });

  const status = execSync("git status --porcelain .drizzle", {
    encoding: "utf-8",
  }).trim();

  if (status) {
    console.error(
      "\n[ERROR] Schema changes detected without generated migrations!",
    );
    console.error(
      "Please run 'pnpm db:generate' and commit the resulting files in packages/db/.drizzle.\n",
    );
    console.error(status);
    process.exit(1);
  }

  console.log("Database migrations are up to date.");
} catch {
  process.exit(1);
}
