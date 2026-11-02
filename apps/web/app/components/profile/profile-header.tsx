import React from "react";

/**
 * Header section for the user profile page.
 *
 * Where used:
 * - Rendered at the top of the camper profile view (`apps/web/app/profile/page.tsx`).
 *
 * How used:
 * - Displays the "User Profile" title and description for managing camper profile details and preferences.
 */
export function ProfileHeader() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
      <p className="text-foreground-secondary mt-1">
        Manage your contributor profile, skills, and platform preferences.
      </p>
    </div>
  );
}
