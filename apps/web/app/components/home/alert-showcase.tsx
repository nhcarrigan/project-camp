"use client";

import React from "react";
import { Alert } from "@repo/ui";

/**
 * Alert showcase section for the component preview page.
 *
 * Where used:
 * - Rendered in the component demonstration list on the landing page (`apps/web/app/page.tsx`).
 *
 * How used:
 * - Demonstrates the four visual alert variants (`info`, `success`, `warning`, `danger`) provided by `@repo/ui`.
 * - Shows inline styling with strong labels and explanatory text.
 */
export function AlertShowcase() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">2. Alerts & Notifications</h2>
      <div className="space-y-3">
        <Alert variant="info">
          <strong>Info:</strong> Check out the latest curriculum updates in your
          dashboard.
        </Alert>
        <Alert variant="success">
          <strong>Success:</strong> Your solution passed all automated unit
          tests!
        </Alert>
        <Alert variant="warning">
          <strong>Warning:</strong> Please make sure to save your work before
          switching challenges.
        </Alert>
        <Alert variant="danger">
          <strong>Danger:</strong> Syntax error detected on line 42 of your
          script.
        </Alert>
      </div>
    </section>
  );
}
