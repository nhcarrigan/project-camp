"use client";

import React from "react";
import { Callout } from "@repo/ui";

type ProjectStatusNoticeProps = {
  decodedSlug: string;
};

/**
 * Roadmap status notice for project detail pages.
 *
 * Where used:
 * - Rendered below the project header on the project detail view (`apps/web/app/projects/[projectSlug]/page.tsx`).
 *
 * How used:
 * - Informs contributors about upcoming capabilities (task lists, leaderboards, and issue tracking) for `decodedSlug`.
 *
 * @param props.decodedSlug - The decoded, human-readable project title.
 */
export function ProjectStatusNotice({ decodedSlug }: ProjectStatusNoticeProps) {
  return (
    <Callout label="Project Status" variant="note">
      This is the project detail route for <code>{decodedSlug}</code>. As
      platform features are added, this page will surface task lists,
      contributor leaderboards, and issue tracking.
    </Callout>
  );
}
