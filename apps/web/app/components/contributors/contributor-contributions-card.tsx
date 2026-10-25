"use client";

import React from "react";
import { Panel } from "@repo/ui";

/**
 * Contributions and reputation metrics card for contributor profiles.
 *
 * Where used:
 * - Rendered in the 2-column detail grid on the contributor profile route (`apps/web/app/contributors/[userSlug]/page.tsx`).
 *
 * How used:
 * - Displays summary counts of merged pull requests, reviewed discussions, and maintained projects.
 */
export function ContributorContributionsCard() {
  return (
    <Panel variant="primary">
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-bold">Contributions & Reputation</h2>
        <div className="text-sm text-foreground-secondary space-y-2">
          <p>Merged Pull Requests: 12</p>
          <p>Reviewed Discussions: 8</p>
          <p>Projects Maintained: 1</p>
        </div>
      </div>
    </Panel>
  );
}
