# @repo/common

Shared isomorphic utilities, TypeScript types, and Zod schemas for Project Camp.

## Contents

- **`pagination.ts`**: Isomorphic pagination calculations (`calculatePagination`, `getPaginationOffset`, `createPaginatedResult`) and TypeScript types (`PaginationOptions`, `PaginationMeta`, `PaginatedResult<T>`).
- **`schemas/`**:
  - `pagination.ts`: `paginationQuerySchema` and `PaginationQuery` type.
  - `test-table.ts`: Zod validation schemas (`testTableSchema`, `insertTestTableSchema`) and inferred TypeScript types (`TestTable`, `InsertTestTable`) matching `@repo/db` schema.

## Usage

```typescript
// Import pagination utilities and schemas
import {
  calculatePagination,
  paginationQuerySchema,
  testTableSchema,
  type TestTable,
  type PaginatedResult,
} from "@repo/common";
```
