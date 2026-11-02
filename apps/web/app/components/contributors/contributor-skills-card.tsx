"use client";

import React from "react";
import { Panel } from "@repo/ui";

/**
 * Skills and technologies showcase card for contributor profiles.
 *
 * Where used:
 * - Rendered in the 2-column detail grid on the contributor profile route (`apps/web/app/contributors/[userSlug]/page.tsx`).
 *
 * How used:
 * - Displays an unordered list of technical skills, languages, and frameworks associated with the contributor.
 */
export function ContributorSkillsCard() {
  return (
    <Panel variant="info">
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold">Skills & Technologies</h2>
        <ul className="list-disc list-inside space-y-1 text-foreground-secondary text-sm">
          <li>TypeScript / JavaScript</li>
          <li>React / Next.js</li>
          <li>Node.js / Fastify</li>
          <li>PostgreSQL / Drizzle ORM</li>
        </ul>
      </div>
    </Panel>
  );
}
