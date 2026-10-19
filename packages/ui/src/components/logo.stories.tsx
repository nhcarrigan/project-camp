import type { Meta, StoryObj } from "@storybook/react";
import { Logo } from "./logo";

const meta = {
  title: "Navigation/Logo",
  component: Logo,
  decorators: [
    (Story) => (
      <div className="w-fit p-4 text-light bg-navy">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Logo>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Large: Story = { args: { width: 420, height: 48 } };
