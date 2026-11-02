import React from "react";

/**
 * Header section for the camper dashboard.
 *
 * Where used:
 * - Rendered at the top of the user dashboard (`apps/web/app/dashboard/page.tsx`).
 *
 * How used:
 * - Displays the primary "Dashboard" heading and introductory subtitle for logged-in campers.
 */
export function DashboardHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-foreground-secondary mt-1">
        Welcome to Project Camp. Explore projects, track your contributions, and
        collaborate.
      </p>
    </div>
  );
}
