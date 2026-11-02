"use client";

import React from "react";
import { Button, Panel } from "@repo/ui";

/**
 * Grid of dashboard navigation and summary cards.
 *
 * Where used:
 * - Rendered in the main content area of the camper dashboard (`apps/web/app/dashboard/page.tsx`).
 *
 * How used:
 * - Renders a 2-column responsive grid containing panels for:
 *   1. Discover Projects: links to `/projects` and `/projects/propose`.
 *   2. Your Profile: links to `/profile`.
 *   3. Followed Projects: displays followed project status.
 *   4. GitHub Connection: link to connect GitHub account.
 */
export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Project Search & Discovery */}
      <Panel variant="primary">
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">Discover Projects</h2>
          <p className="text-sm text-foreground-secondary">
            Find open-source projects matched to your skill set and favorite
            programming languages.
          </p>
          <div className="flex gap-2 pt-2">
            <Button href="/projects" variant="primary">
              Browse All Projects
            </Button>
            <Button href="/projects/propose" variant="info">
              Propose Project
            </Button>
          </div>
        </div>
      </Panel>

      {/* Profile / Onboarding Card */}
      <Panel variant="info">
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">Your Profile</h2>
          <p className="text-sm text-foreground-secondary">
            Set up your developer profile, skills, and bio to receive
            personalized project recommendations.
          </p>
          <div className="pt-2">
            <Button href="/profile" variant="info">
              Edit Profile
            </Button>
          </div>
        </div>
      </Panel>

      {/* Followed Projects Card */}
      <Panel variant="primary">
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">Followed Projects</h2>
          <p className="text-sm text-foreground-secondary">
            Track updates and active issues for projects you are contributing to
            or following.
          </p>
          <p className="text-xs text-foreground-tertiary italic">
            You are not following any projects yet.
          </p>
        </div>
      </Panel>

      {/* GitHub Interop Card */}
      <Panel variant="info">
        <div className="p-5 space-y-3">
          <h2 className="text-xl font-bold">GitHub Connection</h2>
          <p className="text-sm text-foreground-secondary">
            Link your GitHub account to showcase pull requests, commits, and
            earned badges.
          </p>
          <div className="pt-2">
            <Button href="/profile" variant="primary">
              Connect GitHub
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  );
}
