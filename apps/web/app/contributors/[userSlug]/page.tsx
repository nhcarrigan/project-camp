"use client";

import React, { use } from "react";
import { Button, Panel, Callout } from "@repo/ui";

type ContributorPageProps = {
  params: Promise<{
    userSlug: string;
  }>;
};

export default function ContributorPage({ params }: ContributorPageProps) {
  const { userSlug } = use(params);

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-4xl mx-auto space-y-8">
      {/* Contributor Header Card */}
      <Panel variant="primary">
        <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wider text-foreground-tertiary">
              Contributor Profile
            </div>
            <h1 className="text-3xl font-bold tracking-tight mt-1">
              {userSlug}
            </h1>
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

      <Callout label="Contributor Info" variant="note">
        This is a public contributor profile for {userSlug}. Contributors can
        showcase skills, project involvement, and reputation metrics.
      </Callout>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Panel variant="info">
          <div className="p-5 space-y-3">
            <h2 className="text-xl font-bold">Skills & Technologies</h2>
            <ul className="list-disc list-inside space-y-1 text-foreground-secondary text-sm">
              <li>TypeScript / JavaScript</li>
              <li>React / Next.js</li>
              <li>Node.js / Fastify</li>
              <li>PostgreSQL / Drizzle ORM</li>
            </ul>
          </div>
        </Panel>

        <Panel variant="primary">
          <div className="p-5 space-y-3">
            <h2 className="text-xl font-bold">Contributions & Reputation</h2>
            <div className="text-sm text-foreground-secondary space-y-2">
              <p>Merged Pull Requests: 12</p>
              <p>Reviewed Discussions: 8</p>
              <p>Projects Maintained: 1</p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
