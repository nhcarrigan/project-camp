"use client";

import React from "react";
import { Button, Panel } from "@repo/ui";

type ProjectDetailHeaderProps = {
  projectSlug: string;
  decodedSlug: string;
};

/**
 * Header card for the project details overview page.
 *
 * Where used:
 * - Rendered at the top of the project detail route (`apps/web/app/projects/[projectSlug]/page.tsx`).
 *
 * How used:
 * - Displays decoded project title and open-source initiative label.
 * - Provides navigation buttons to edit the project (`/projects/${projectSlug}/edit`) and to open its GitHub repository.
 *
 * @param props.projectSlug - The URL-encoded project route parameter.
 * @param props.decodedSlug - The decoded, human-readable project title.
 */
export function ProjectDetailHeader({
  projectSlug,
  decodedSlug,
}: ProjectDetailHeaderProps) {
  return (
    <Panel variant="primary">
      <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-foreground-tertiary">
            Project Overview
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-1">
            {decodedSlug}
          </h1>
          <p className="text-foreground-secondary mt-1">
            Community managed open-source initiative
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button href={`/projects/${projectSlug}/edit`} variant="info">
            Edit Project
          </Button>
          <Button
            variant="primary"
            href={`https://github.com/${decodedSlug}`}
            target="_blank"
          >
            GitHub Repo
          </Button>
        </div>
      </div>
    </Panel>
  );
}
