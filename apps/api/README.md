# `api`

Fastify backend REST API service for Project Camp.

## Overview

The `api` service provides the high-performance HTTP backend for Project Camp.

## Development & Scripts

All commands can be run from the repository root using the `--filter` flag, or directly inside `apps/api`:

```bash
# Start development server with hot-reload (tsx watch)
pnpm --filter api dev

# Build TypeScript to JavaScript (dist/)
pnpm --filter api build

# Start production server from dist/
pnpm --filter api start

# Run ESLint checks
pnpm --filter api lint

# Perform TypeScript type-checking
pnpm --filter api check-types
```

When running locally, the server listens by default at [http://localhost:3001](http://localhost:3001).
