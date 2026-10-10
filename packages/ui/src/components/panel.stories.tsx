import type { Meta, StoryObj } from "@storybook/react";
import { Panel } from "./panel";

const meta: Meta<typeof Panel> = {
  title: "Components/Panel",
  component: Panel,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "info", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: (
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">Panel Header</h3>
        <p>This is a primary panel from freeCodeCamp UI.</p>
      </div>
    ),
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: (
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">Informational Panel</h3>
        <p>This panel uses the info theme variant.</p>
      </div>
    ),
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: (
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">Danger Panel</h3>
        <p>This panel highlights critical or dangerous content.</p>
      </div>
    ),
  },
};
