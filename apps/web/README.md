# `web`

Next.js frontend web application for Project Camp.

## Overview

The `web` application is the primary user interface for Project Camp. Built with Next.js App Router, React 19, and Tailwind CSS v4, it integrates directly with the [`@repo/ui`](file:///home/brad/Projects/project-camp/packages/ui) design system package (built on `@freecodecamp/ui`) to deliver a modern, accessible experience.

## Development & Scripts

All commands can be run from the repository root using the `--filter` flag, or directly inside `apps/web`:

```bash
# Start development server on http://localhost:3000
pnpm --filter web dev

# Create an optimized production build
pnpm --filter web build

# Start production server
pnpm --filter web start

# Run ESLint checks
pnpm --filter web lint

# Perform TypeScript type-checking and Next.js type generation
pnpm --filter web check-types
```

When running locally, the application is accessible at [http://localhost:3000](http://localhost:3000).
