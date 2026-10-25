"use client";

import React from "react";
import { Callout } from "@repo/ui";

/**
 * Community notice callout for the camper dashboard.
 *
 * Where used:
 * - Rendered below the header on the user dashboard (`apps/web/app/dashboard/page.tsx`).
 *
 * How used:
 * - Uses `@repo/ui` `Callout` with the "note" variant to communicate platform status and onboarding steps.
 */
export function DashboardNotice() {
  return (
    <Callout label="Community Notice" variant="note">
      This is the initial dashboard interface. You can search projects, manage
      your profile, and connect your GitHub account.
    </Callout>
  );
}
