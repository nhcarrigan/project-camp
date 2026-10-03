"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Button,
  Modal,
  Panel,
  Alert,
  Callout,
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@repo/ui";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background-primary text-foreground-primary p-6 sm:p-12 font-sans max-w-5xl mx-auto space-y-10">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-foreground-secondary gap-4">
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
      </header>

      {/* Intro Callout */}
      <Callout label="Component Architecture" variant="note">
        This app uses components exported directly from{" "}
        <code className="px-1 py-0.5 bg-background-tertiary">@repo/ui</code>,
        powered by the official{" "}
        <code className="px-1 py-0.5 bg-background-tertiary">@freecodecamp/ui</code>{" "}
        library. The package serves as our design system foundation and extension
        layer.
      </Callout>

      {/* Button Section */}
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

      {/* Alerts & Callouts Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">2. Alerts & Notifications</h2>
        <div className="space-y-3">
          <Alert variant="info">
            <strong>Info:</strong> Check out the latest curriculum updates in your dashboard.
          </Alert>
          <Alert variant="success">
            <strong>Success:</strong> Your solution passed all automated unit tests!
          </Alert>
          <Alert variant="warning">
            <strong>Warning:</strong> Please make sure to save your work before switching challenges.
          </Alert>
          <Alert variant="danger">
            <strong>Danger:</strong> Syntax error detected on line 42 of your script.
          </Alert>
        </div>
      </section>

      {/* Modal Dialog Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">3. Interactive Modals</h2>
        <Panel variant="info">
          <div className="p-5 space-y-4">
            <p>
              Accessible dialogs built with Headless UI primitives, keyboard trapping,
              and backdrop dismiss.
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
              It traps focus, supports the Escape key, and offers customizable header and footer slots.
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

      {/* Forms Section */}
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
              <HelpBlock>Your unique username across freeCodeCamp modules.</HelpBlock>
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

      {/* Tabs Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold">5. Tabs Navigation</h2>
        <Tabs defaultValue="html">
          <TabsList>
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="js">JavaScript</TabsTrigger>
          </TabsList>
          <TabsContent value="html">
            <div className="p-4 border border-t-0 border-foreground-secondary">
              <h4 className="font-bold mb-1">HTML Structure</h4>
              <p className="text-sm">Semantic elements defining the content of your web page.</p>
            </div>
          </TabsContent>
          <TabsContent value="css">
            <div className="p-4 border border-t-0 border-foreground-secondary">
              <h4 className="font-bold mb-1">CSS Stylesheet</h4>
              <p className="text-sm">freeCodeCamp base styles and responsive styling rules.</p>
            </div>
          </TabsContent>
          <TabsContent value="js">
            <div className="p-4 border border-t-0 border-foreground-secondary">
              <h4 className="font-bold mb-1">JavaScript Logic</h4>
              <p className="text-sm">Interactive components and client-side application state.</p>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
