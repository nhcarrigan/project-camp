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

/**
 * Interactive project proposal submission form.
 *
 * Where used:
 * - Rendered in the main body of the propose project route (`apps/web/app/projects/propose/page.tsx`).
 *
 * How used:
 * - Collects project title, repository URL, description, and required skills for proposed open source projects.
 * - Handles client-side submission state and surfaces a success alert upon submission.
 * - Includes a cancel button linking back to `/projects` and a submit button.
 */
export function ProposeProjectForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {submitted && (
        <Alert variant="success">
          Your project proposal has been submitted for review!
        </Alert>
      )}

      <Panel variant="primary">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormGroup>
            <ControlLabel htmlFor="project-name">Project Title</ControlLabel>
            <FormControl
              id="project-name"
              type="text"
              placeholder="e.g. FreeCodeCamp Study Group Finder"
              required
            />
            <HelpBlock>
              Clear and concise name for the proposed project.
            </HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="project-repo">Repository URL</ControlLabel>
            <FormControl
              id="project-repo"
              type="url"
              placeholder="https://github.com/owner/repository"
              required
            />
            <HelpBlock>
              Public GitHub repository link for the project.
            </HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="project-desc">
              Description & Purpose
            </ControlLabel>
            <FormControl
              id="project-desc"
              componentClass="textarea"
              rows={4}
              placeholder="Describe what problem this project solves and how contributors can get involved..."
              required
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="project-skills">
              Required Skills & Stack
            </ControlLabel>
            <FormControl
              id="project-skills"
              type="text"
              placeholder="e.g. Next.js, Fastify, PostgreSQL"
            />
            <HelpBlock>Primary technologies used in the project.</HelpBlock>
          </FormGroup>

          <div className="flex justify-end gap-3 pt-2">
            <Button href="/projects" variant="info">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit Proposal
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
}
