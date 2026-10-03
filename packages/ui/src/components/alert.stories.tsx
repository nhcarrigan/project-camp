import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./alert";
import { Callout } from "@freecodecamp/ui";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "success", "warning", "danger"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: "info",
    children: "This is an informative alert message.",
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    children: "Your changes have been saved successfully!",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Please review the requirements before proceeding.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "An error occurred while processing your request.",
  },
};

export const CalloutExample: StoryObj = {
  render: () => (
    <Callout label="Note" variant="note">
      This is a Callout component used to emphasize an important snippet of information within a page.
    </Callout>
  ),
};
