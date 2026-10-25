"use client";

import React, { useState } from "react";
import { Button, Panel, Modal } from "@repo/ui";

/**
 * Interactive modal showcase section.
 *
 * Where used:
 * - Rendered in the component demonstration list on the landing page (`apps/web/app/page.tsx`).
 *
 * How used:
 * - Maintains local state for opening/closing standard and danger confirmation modals.
 * - Showcases accessible Headless UI dialogs via `@repo/ui` with focus trapping, backdrop dismiss, and custom headers/footers.
 */
export function ModalShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">3. Interactive Modals</h2>
      <Panel variant="info">
        <div className="p-5 space-y-4">
          <p>
            Accessible dialogs built with Headless UI primitives, keyboard
            trapping, and backdrop dismiss.
          </p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Standard Modal
            </Button>
            <Button variant="danger" onClick={() => setIsDangerModalOpen(true)}>
              Open Danger Confirmation
            </Button>
          </div>
        </div>
      </Panel>

      {/* Standard Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header showCloseButton>
          <span className="font-bold text-lg">freeCodeCamp UI Modal</span>
        </Modal.Header>
        <Modal.Body>
          <p className="my-2">
            This modal dialog is rendered through the monorepo adapter{" "}
            <code>@repo/ui</code>.
          </p>
          <p className="my-2">
            It traps focus, supports the Escape key, and offers customizable
            header and footer slots.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Button size="small" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="info"
              onClick={() => setIsModalOpen(false)}
            >
              Got It
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Danger Modal */}
      <Modal
        open={isDangerModalOpen}
        variant="danger"
        onClose={() => setIsDangerModalOpen(false)}
      >
        <Modal.Header showCloseButton>
          <span className="font-bold text-lg text-foreground-danger">
            Reset Progress?
          </span>
        </Modal.Header>
        <Modal.Body>
          <p className="my-2">
            Are you sure you want to reset your code for this project? This
            action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex justify-end gap-2">
            <Button size="small" onClick={() => setIsDangerModalOpen(false)}>
              Cancel
            </Button>
            <Button
              size="small"
              variant="danger"
              onClick={() => setIsDangerModalOpen(false)}
            >
              Yes, Reset Code
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
