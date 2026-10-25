# Web Application Agent Guidelines

When creating or modifying components, pages, or features in the `apps/web` application, adhere to the following rules:

## 1. Component Documentation & JSDocs

- **Every component must have JSDoc comments**: Every React component defined in the web application must include a comprehensive JSDoc comment explaining:
  - **Where used**: The specific route(s), page(s), or layout(s) that render or compose the component (e.g. `apps/web/app/dashboard/page.tsx`).
  - **How used**: The component's role, behavioral characteristics, client-side interactions, and rendered UI elements.
  - **Props documentation**: For any component accepting props, document each property using `@param` annotations.
- Example pattern:
  ```tsx
  /**
   * Header card for the project details overview page.
   *
   * Where used:
   * - Rendered at the top of the project detail route (`apps/web/app/projects/[projectSlug]/page.tsx`).
   *
   * How used:
   * - Displays decoded project title and open-source initiative label.
   * - Provides navigation buttons to edit the project and visit its GitHub repository.
   *
   * @param props.projectSlug - The URL-encoded project route parameter.
   * @param props.decodedSlug - The decoded, human-readable project title.
   */
  export function ProjectDetailHeader({ projectSlug, decodedSlug }: ProjectDetailHeaderProps) { ... }
  ```

## 2. Component Organization & Modularity

- **Keep Page Files Lean**: Route page files (`page.tsx`) must remain concise and focused on route parameter resolution, data fetching, metadata, and high-level layout composition.
- **Dedicated Components Directory**: Extract large blocks of JSX, forms, showcases, cards, and domain-specific UI into dedicated files under `apps/web/app/components/<feature>/` (e.g., `home/`, `dashboard/`, `profile/`, `projects/`, `contributors/`).
- **Barrel Exports**: Use feature-level `index.ts` files under `apps/web/app/components/<feature>/` to organize and re-export related components.
- **Client Components Boundary**: Add `"use client";` to components that manage interactive state (`useState`), event handlers, or consume context-based client UI primitives from `@repo/ui`.

## 3. Verification & Quality Assurance

- Run `pnpm --filter web check-types` to verify TypeScript types and Next.js route type generation.
- Run `pnpm --filter web lint` to ensure zero ESLint warnings (`--max-warnings 0`).
- Run `pnpm --filter web build` to verify production builds and static/dynamic route generation.
