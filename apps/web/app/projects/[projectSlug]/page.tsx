"use client";

import React, { use } from "react";
import { Button, Panel, Callout } from "@repo/ui";

type ProjectDetailPageProps = {
  params: Promise<{
    projectSlug: string;
  }>;
};

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { projectSlug } = use(params);
  const decodedSlug = decodeURIComponent(projectSlug);

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-4xl mx-auto space-y-8">
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

      <Callout label="Project Status" variant="note">
        This is the project detail route for <code>{decodedSlug}</code>. As
        platform features are added, this page will surface task lists,
        contributor leaderboards, and issue tracking.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel variant="info">
          <div className="p-5 space-y-3">
            <h2 className="text-xl font-bold">About the Project</h2>
            <p className="text-sm text-foreground-secondary">
              A community-driven project built to help freeCodeCamp learners
              gain real-world collaborative development experience.
            </p>
          </div>
        </Panel>

        <Panel variant="primary">
          <div className="p-5 space-y-3">
            <h2 className="text-xl font-bold">Getting Started</h2>
            <p className="text-sm text-foreground-secondary">
              Check the open issues on GitHub or browse the project guide to
              begin contributing.
            </p>
            <div className="pt-2">
              <Button href="/projects" variant="primary">
                Back to All Projects
              </Button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
