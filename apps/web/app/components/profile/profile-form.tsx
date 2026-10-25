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
 * Interactive profile form component.
 *
 * Where used:
 * - Rendered in the main body of the camper profile view (`apps/web/app/profile/page.tsx`).
 *
 * How used:
 * - Collects camper username, GitHub username, bio, and skills list.
 * - Handles client-side form submission state and surfaces a success alert upon saving.
 */
export function ProfileForm() {
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <>
      {saved && (
        <Alert variant="success">
          Profile preferences updated successfully!
        </Alert>
      )}

      <Panel variant="primary">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <FormGroup>
            <ControlLabel htmlFor="profile-username">
              Camper Username
            </ControlLabel>
            <FormControl
              id="profile-username"
              type="text"
              placeholder="e.g. camperbot"
              defaultValue="camperbot"
            />
            <HelpBlock>
              Your unique username across freeCodeCamp modules.
            </HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="profile-github">
              GitHub Username
            </ControlLabel>
            <FormControl
              id="profile-github"
              type="text"
              placeholder="e.g. octocat"
            />
            <HelpBlock>
              Used to link project contributions and activity.
            </HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="profile-bio">About You</ControlLabel>
            <FormControl
              id="profile-bio"
              componentClass="textarea"
              rows={4}
              placeholder="Tell other campers about your experience and what you want to build..."
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel htmlFor="profile-skills">
              Skills & Technologies
            </ControlLabel>
            <FormControl
              id="profile-skills"
              type="text"
              placeholder="e.g. TypeScript, React, Fastify, Docker"
            />
            <HelpBlock>
              Comma-separated list of technologies you work with.
            </HelpBlock>
          </FormGroup>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="primary" type="submit">
              Save Profile
            </Button>
          </div>
        </form>
      </Panel>
    </>
  );
}
