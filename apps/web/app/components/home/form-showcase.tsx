"use client";

import React from "react";
import {
  Button,
  Panel,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from "@repo/ui";

/**
 * Form inputs showcase section.
 *
 * Where used:
 * - Rendered in the component demonstration list on the landing page (`apps/web/app/page.tsx`).
 *
 * How used:
 * - Demonstrates form layout elements from `@repo/ui` (`FormGroup`, `ControlLabel`, `FormControl`, and `HelpBlock`).
 * - Shows text inputs, email inputs, and multi-line textarea elements with accompanying field descriptions.
 */
export function FormShowcase() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">4. Forms & Inputs</h2>
      <Panel variant="primary">
        <div className="p-5 max-w-lg space-y-4">
          <FormGroup>
            <ControlLabel htmlFor="username">Camper Username</ControlLabel>
            <FormControl
              id="username"
              type="text"
              placeholder="e.g. camperbot"
            />
            <HelpBlock>
              Your unique username across freeCodeCamp modules.
            </HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="email">Email address</ControlLabel>
            <FormControl
              id="email"
              type="email"
              placeholder="developer@example.com"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="bio">About You</ControlLabel>
            <FormControl
              id="bio"
              componentClass="textarea"
              rows={3}
              placeholder="Share your coding journey..."
            />
          </FormGroup>

          <Button variant="primary">Save Profile</Button>
        </div>
      </Panel>
    </section>
  );
}
