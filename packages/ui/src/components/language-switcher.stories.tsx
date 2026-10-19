import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "storybook/test";
import {
  LanguageSwitcher,
  type LanguageSwitcherProps,
} from "./language-switcher";

function Example(props: LanguageSwitcherProps) {
  const [value, setValue] = useState(props.value);
  return <LanguageSwitcher {...props} value={value} onChange={setValue} />;
}
const meta = {
  title: "Navigation/LanguageSwitcher",
  component: LanguageSwitcher,
  args: {
    value: "en",
    onChange: () => {},
    languages: [
      { code: "en", label: "English" },
      { code: "es", label: "Español" },
      { code: "ar", label: "العربية" },
    ],
  },
  render: (args) => <Example {...args} />,
  decorators: [
    (Story) => (
      <div className="relative min-h-[340px] p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LanguageSwitcher>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
export const Open: Story = {
  play: async ({ canvasElement }) => {
    await userEvent.click(
      within(canvasElement).getByRole("button", { name: "Change language" }),
    );
  },
};
export const LongLabels: Story = {
  args: {
    languages: [
      {
        code: "en",
        label: "English with a deliberately long regional language label",
      },
      { code: "pt-BR", label: "Português brasileiro" },
    ],
  },
  play: Open.play,
};

export const SelectLanguage: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Change language" });
    await userEvent.click(trigger);
    await userEvent.click(canvas.getByRole("button", { name: "Español" }));
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveFocus();
    await userEvent.click(trigger);
    await expect(
      canvas.getByRole("button", { name: "Español" }),
    ).toHaveAttribute("aria-current", "true");
  },
};
