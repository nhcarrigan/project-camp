# Common Package Agent Guidelines

- Always add JSDoc comments to public-facing entities (exported functions, types, schemas, and constants). These comments must describe their business representation so it is clear how they are intended to be used across applications.
- The `src/schemas/` directory is reserved strictly for database table models and schemas. Non-table items (such as enums or query utilities) must be organized into their own dedicated folders under `src/` (e.g., `src/enums/`, `src/pagination/`).
- Always co-locate unit test files alongside the source files they test (`<filename>.test.ts`).
