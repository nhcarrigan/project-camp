"use client";

import React, { useState } from "react";
import {
  Button,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Alert,
} from "@repo/ui";

type EditProjectFormProps = {
  projectSlug: string;
  decodedSlug: string;
};

/**
 * Interactive project settings edit form.
 *
 * Where used:
 * - Rendered in the main body of the project editing page (`apps/web/app/projects/[projectSlug]/edit/page.tsx`).
 *
 * How used:
 * - Provides editable inputs for project title, description, and required skill stack.
 * - Handles client-side form submission state and surfaces a success alert.
 * - Includes a cancel button linking back to `/projects/${projectSlug}` and a submit button.
 *
 * @param props.projectSlug - The URL-encoded project route parameter used for the cancel link.
 * @param props.decodedSlug - The decoded project title pre-filling the title input.
 */
export function EditProjectForm({
  projectSlug,
  decodedSlug,
}: EditProjectFormProps) {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <>
      {saved && (
        <Alert variant="success">Project details updated successfully!</Alert>
      )}

      <Panel variant="primary">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormGroup>
            <ControlLabel htmlFor="edit-project-name">
              Project Title
            </ControlLabel>
            <FormControl
              id="edit-project-name"
              type="text"
              defaultValue={decodedSlug}
              required
            />
            <HelpBlock>The visible project name on Project Camp.</HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="edit-project-desc">Description</ControlLabel>
            <FormControl
              id="edit-project-desc"
              componentClass="textarea"
              rows={4}
              defaultValue="Community-driven project built to help freeCodeCamp learners gain real-world collaborative experience."
              required
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="edit-project-skills">
              Skills & Stack
            </ControlLabel>
            <FormControl
              id="edit-project-skills"
              type="text"
              defaultValue="TypeScript, React, Next.js"
            />
            <HelpBlock>
              Comma-separated list of required skills or technologies.
            </HelpBlock>
          </FormGroup>

          <div className="flex justify-end gap-3 pt-2">
            <Button href={`/projects/${projectSlug}`} variant="info">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
}
