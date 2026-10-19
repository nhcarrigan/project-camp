# @repo/db

The `@repo/db` package is a database utility library designed to simplify database interactions within the project. It provides type-safe schemas, Drizzle ORM client initialization, migrations, and TypeScript models for consuming applications and background workers.

## CLI Scripts

All commands can be run from the repository root using the `--filter` flag, or directly inside `packages/db`:

```bash
# Generate database migrations
pnpm --filter @repo/db db:generate

# Apply database migrations
pnpm --filter @repo/db db:migrate

# Push schema changes directly to the database
pnpm --filter @repo/db db:push

# Open Drizzle Studio visual database browser
pnpm --filter @repo/db db:studio

# Perform TypeScript type-checking
pnpm --filter @repo/db check-types
```
