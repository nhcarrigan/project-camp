"use client";

import React from "react";
import { Button, Panel } from "@repo/ui";

type ContributorHeaderProps = {
  userSlug: string;
};

/**
 * Header card for a public contributor profile.
 *
 * Where used:
 * - Rendered at the top of the contributor profile route (`apps/web/app/contributors/[userSlug]/page.tsx`).
 *
 * How used:
 * - Displays the contributor username (`userSlug`) and contributor badge.
 * - Provides direct links to the contributor's GitHub profile and email contact.
 *
 * @param props.userSlug - The username or slug of the contributor being viewed.
 */
export function ContributorHeader({ userSlug }: ContributorHeaderProps) {
  return (
    <Panel variant="primary">
      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-foreground-tertiary">
            Contributor Profile
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">{userSlug}</h1>
          <p className="text-foreground-secondary mt-1">
            Active open source contributor on Project Camp
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="primary"
            href={`https://github.com/${userSlug}`}
            target="_blank"
          >
            GitHub Profile
          </Button>
          <Button variant="info" href={`mailto:${userSlug}@example.com`}>
            Connect
          </Button>
        </div>
      </div>
    </Panel>
  );
}
