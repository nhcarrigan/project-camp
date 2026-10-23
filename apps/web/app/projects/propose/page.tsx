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

export default function ProposeProjectPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Propose a New Project
        </h1>
        <p className="text-foreground-secondary mt-1">
          Submit an open source project to be curated and collaborated on by the
          Project Camp community.
        </p>
      </div>

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
    </div>
  );
}
