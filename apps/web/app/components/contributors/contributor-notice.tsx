"use client";

import React from "react";
import { Callout } from "@repo/ui";

type ContributorNoticeProps = {
  userSlug: string;
};

/**
 * Informational notice callout for public contributor pages.
 *
 * Where used:
 * - Rendered below the header on the public contributor profile route (`apps/web/app/contributors/[userSlug]/page.tsx`).
 *
 * How used:
 * - Informs visitors about the public nature of the profile for the given `userSlug` and features available.
 *
 * @param props.userSlug - The username or slug of the contributor being viewed.
 */
export function ContributorNotice({ userSlug }: ContributorNoticeProps) {
  return (
    <Callout label="Contributor Info" variant="note">
      This is a public contributor profile for {userSlug}. Contributors can
      showcase skills, project involvement, and reputation metrics.
    </Callout>
  );
}
