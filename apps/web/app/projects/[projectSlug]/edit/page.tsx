"use client";

import React, { useState, use } from "react";
import {
  Button,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Alert,
} from "@repo/ui";

type EditProjectPageProps = {
  params: Promise<{
    projectSlug: string;
  }>;
};

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const { projectSlug } = use(params);
  const decodedSlug = decodeURIComponent(projectSlug);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-foreground-secondary mt-1">
          Update project settings and details for <code>{decodedSlug}</code>.
        </p>
      </div>

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
    </div>
  );
}
