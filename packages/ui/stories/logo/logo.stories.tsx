import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "../../src/logo";

const meta = {
  title: "Navigation/Logo",
  component: Logo,
  decorators: [
    (Story) => (
      <div className="camp-example-logo">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Large: Story = { args: { width: 420, height: 48 } };
