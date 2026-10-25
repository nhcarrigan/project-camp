import React from "react";

type EditProjectHeaderProps = {
  decodedSlug: string;
};

/**
 * Header section for the edit project route.
 *
 * Where used:
 * - Rendered at the top of the project editing page (`apps/web/app/projects/[projectSlug]/edit/page.tsx`).
 *
 * How used:
 * - Displays the "Edit Project" heading and subtitle specifying the decoded project title.
 *
 * @param props.decodedSlug - The decoded, human-readable project title.
 */
export function EditProjectHeader({ decodedSlug }: EditProjectHeaderProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
      <p className="text-foreground-secondary mt-1">
        Update project settings and details for <code>{decodedSlug}</code>.
      </p>
    </div>
  );
}
