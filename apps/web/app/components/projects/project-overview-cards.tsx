"use client";

import React from "react";
import { Button, Panel } from "@repo/ui";

/**
 * Overview and getting started cards for project details.
 *
 * Where used:
 * - Rendered in the main content grid of the project detail route (`apps/web/app/projects/[projectSlug]/page.tsx`).
 *
 * How used:
 * - Displays an "About the Project" summary panel.
 * - Displays a "Getting Started" guide panel with a button navigating back to `/projects`.
 */
export function ProjectOverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Panel variant="info">
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">About the Project</h2>
          <p className="text-sm text-foreground-secondary">
            A community-driven project built to help freeCodeCamp learners gain
            real-world collaborative development experience.
          </p>
        </div>
      </Panel>

      <Panel variant="primary">
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">Getting Started</h2>
          <p className="text-sm text-foreground-secondary">
            Check the open issues on GitHub or browse the project guide to begin
            contributing.
          </p>
          <div className="pt-2">
            <Button href="/projects" variant="primary">
              Back to All Projects
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
