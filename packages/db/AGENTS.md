# DB Package Agent Guidelines

When modifying or expanding the `@repo/db` package, always adhere to the following rules:

## 1. File Organization & Modularity

- **Enums**: All PostgreSQL enum types (`pgEnum`) must be declared in `src/constants/enums.ts` and re-exported via `src/constants/index.ts`. Never declare enums directly inside table files or use unconstrained text columns where enums are appropriate.
- **Tables**: Each database table must have its own isolated schema file in `src/schemas/<entity-name>.ts`. Keep table files pure DDL declarations (columns, column defaults, indexes, foreign keys, and unique/primary constraints).
- **Relations**: All Drizzle relations must be defined centrally in `src/schemas/relations.ts` using `defineRelations`. Do not define relations inside individual table schema files to prevent circular module dependencies and initialization errors.
- **Barrel Exports**: Always re-export new tables in `src/schemas/index.ts`, and ensure `src/schema.ts` remains the main schema barrel.

## 2. Type Safety & Model Inference

- For every table, export both `InferSelectModel<typeof table>` and `InferInsertModel<typeof table>` in `src/types.ts`.
- Derive enum union types from enum values (`(typeof enumObject.enumValues)[number]`).
- Do not manually handwrite database models that duplicate schema fields; always derive them via Drizzle inference to ensure zero type drift.

## 3. Migration Workflow

- Whenever updating or adding tables, columns, constraints, or enums, run `pnpm --filter @repo/db db:generate` to generate the migration file under `.drizzle/`.
- Verify there is zero unplanned schema drift by executing `pnpm --filter @repo/db exec drizzle-kit generate --explain`.
- Do not manually edit generated migration SQL files unless adding custom data migration logic.

## 4. Verification & Quality Assurance

- Always run `pnpm --filter @repo/db check-types` after making schema or type changes.
- Ensure dependent apps remain compatible by running `pnpm --filter api check-types`.
- Add JSDoc comments to public tables, enums, and composite types describing their domain purpose and relationships within Project Camp.
