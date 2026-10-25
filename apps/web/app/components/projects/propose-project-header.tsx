import React from "react";

/**
 * Header section for the project proposal page.
 *
 * Where used:
 * - Rendered at the top of the propose project route (`apps/web/app/projects/propose/page.tsx`).
 *
 * How used:
 * - Displays the "Propose a New Project" heading and introductory subtitle for community proposals.
 */
export function ProposeProjectHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">
        Propose a New Project
      </h1>
      <p className="text-foreground-secondary mt-1">
        Submit an open source project to be curated and collaborated on by the
        Project Camp community.
      </p>
    </div>
  );
}
