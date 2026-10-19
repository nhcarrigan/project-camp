import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import { NavigationMenu } from "./navigation-menu";

const meta = {
  title: "Navigation/NavigationMenu",
  component: NavigationMenu,
  args: {
    items: [
      { id: "projects", label: "Explore projects", href: "#projects" },
      { id: "guide", label: "Contribution guide", href: "#guide" },
    ],
  },
  decorators: [
    (Story) => (
      <div className="relative min-h-[340px] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Closed: Story = {};
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Menu" });
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByRole("list")).toBeVisible();
  },
};
export const LongList: Story = {
  args: {
    items: Array.from({ length: 20 }, (_, i) => ({
      id: `project-${i}`,
      label: `Open source project ${i + 1}`,
      href: `#project-${i}`,
    })),
  },
  play: Open.play,
};
export const DisabledAction: Story = {
  args: {
    items: [
      {
        id: "disabled",
        label: "Unavailable action",
        onSelect: () => {},
        disabled: true,
      },
    ],
  },
  play: Open.play,
};

export const Dismissal: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Menu" });
    await userEvent.click(trigger);
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveFocus();
    await userEvent.click(trigger);
    await userEvent.click(canvasElement);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    await userEvent.click(
      canvas.getByRole("link", { name: "Explore projects" }),
    );
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveFocus();
  },
};

export const ViewportPlacement: Story = {
  args: LongList.args,
  decorators: [
    (Story) => (
      <div style={{ position: "fixed", right: 8, top: "65vh" }}>
        <Story />
      </div>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Menu" }));
    const panel = canvas.getByRole("list").parentElement!;
    const bounds = panel.getBoundingClientRect();
    const viewport = canvasElement.ownerDocument.defaultView!;
    await expect(bounds.left).toBeGreaterThanOrEqual(0);
    await expect(bounds.right).toBeLessThanOrEqual(viewport.innerWidth);
    await expect(bounds.top).toBeGreaterThanOrEqual(0);
    await expect(bounds.bottom).toBeLessThanOrEqual(viewport.innerHeight);
  },
};
