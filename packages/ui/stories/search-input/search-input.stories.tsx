import { expect, within } from "@storybook/test";
import type { Meta, StoryObj } from "@storybook/react";
import { SearchInput } from "../../src/search-input";

const meta = {
  title: "Navigation/SearchInput",
  component: SearchInput,
  args: { label: "Search projects", placeholder: "Search projects" },
  decorators: [
    (Story) => (
      <div className="camp-example-component">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchInput>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Empty: Story = {};
export const Populated: Story = { args: { defaultValue: "Accessibility" } };
export const Disabled: Story = { args: { disabled: true } };

export const CustomStyling: Story = {
  args: { className: "text-xl", wrapperClassName: "max-w-sm" },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("searchbox", {
      name: "Search projects",
    });
    await expect(input).toHaveClass("text-xl");
    await expect(input.parentElement).toHaveClass("max-w-sm");
  },
};
