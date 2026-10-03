import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./modal";
import { Button } from "./button";

const ModalWrapper = ({
  size,
  variant,
}: {
  size?: "medium" | "large" | "xLarge";
  variant?: "default" | "danger";
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)} variant={variant === "danger" ? "danger" : "primary"}>
        Open Modal ({variant ?? "default"})
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} size={size} variant={variant}>
        <Modal.Header showCloseButton>
          <span className="font-bold text-lg">Example Modal Title</span>
        </Modal.Header>
        <Modal.Body>
          <p className="my-2">
            This modal is rendered using the freeCodeCamp UI component library.
          </p>
          <p className="my-2">
            It includes accessible focus trapping, keyboard dismiss, and responsive layout.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-2 justify-end">
            <Button size="small" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              size="small"
              variant={variant === "danger" ? "danger" : "info"}
              onClick={() => setOpen(false)}
            >
              Confirm
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => <ModalWrapper />,
};

export const Danger: StoryObj = {
  render: () => <ModalWrapper variant="danger" />,
};

export const Large: StoryObj = {
  render: () => <ModalWrapper size="large" />,
};
