"use client";

import React from "react";
import { Button, Panel } from "@repo/ui";

/**
 * Button showcase section for the component preview page.
 *
 * Where used:
 * - Rendered in the component demonstration list on the landing page (`apps/web/app/page.tsx`).
 *
 * How used:
 * - Showcases available `@repo/ui` Button variants (`primary`, `danger`, `info`, and disabled).
 * - Demonstrates button sizing options (`small`, `medium`, `large`).
 * - Illustrates full-width block-level button actions.
 */
export function ButtonShowcase() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">1. Buttons</h2>
      <Panel variant="primary">
        <div className="p-5 space-y-6">
          <div>
            <h3 className="font-semibold text-md mb-2">Variants</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button variant="primary">Primary Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button variant="info">Info Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-md mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Button size="small">Small</Button>
              <Button size="medium">Medium (Default)</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-md mb-2">Full Width Block</h3>
            <Button block variant="primary">
              Full-Width Action Button
            </Button>
          </div>
        </div>
      </Panel>
    </section>
  );
}
