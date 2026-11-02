"use client";

import React from "react";
import Image from "next/image";
import { Button, Callout } from "@repo/ui";

/**
 * Hero banner component for the landing page.
 *
 * Where used:
 * - Top section of the landing page (`apps/web/app/page.tsx`).
 *
 * How used:
 * - Introduces Project Camp with the project logo and subtitle.
 * - Provides outbound links to the freeCodeCamp Storybook and Turborepo documentation.
 * - Displays a callout highlighting the component architecture backed by `@repo/ui`.
 */
export function HeroBanner() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-foreground-secondary gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/vercel.svg"
            alt="Project Camp Logo"
            width={28}
            height={28}
            priority
          />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Project Camp</h1>
            <p className="text-sm text-foreground-tertiary">
              freeCodeCamp UI Component Integration
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="small"
            variant="primary"
            href="https://freecodecamp.github.io/ui/"
            target="_blank"
          >
            freeCodeCamp Storybook
          </Button>
          <Button
            size="small"
            variant="info"
            href="https://turborepo.dev"
            target="_blank"
          >
            Turborepo Docs
          </Button>
        </div>
      </div>

      <Callout label="Component Architecture" variant="note">
        This app uses components exported directly from{" "}
        <code className="px-1 py-0.5 bg-background-tertiary">@repo/ui</code>,
        powered by the official{" "}
        <code className="px-1 py-0.5 bg-background-tertiary">
          @freecodecamp/ui
        </code>{" "}
        library. The package serves as our design system foundation and
        extension layer.
      </Callout>
    </>
  );
}
