import type { Meta, StoryObj } from "@storybook/react";
import { UserMenu } from "../../src/user-menu";

const meta = {
  title: "Navigation/UserMenu",
  component: UserMenu,
  args: { signInHref: "#sign-in" },
  decorators: [
    (Story) => (
      <div className="camp-example-component">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserMenu>;
export default meta;
type Story = StoryObj<typeof meta>;
export const SignedOut: Story = {};
export const SignedIn: Story = {
  args: {
    user: {
      name: "Camper",
      profileHref: "#profile",
      imageUrl: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="#3b3b4f"/><text x="20" y="27" text-anchor="middle" fill="#f5f6f7" font-family="sans-serif" font-size="22">C</text></svg>')}`,
    },
  },
};
export const MissingImage: Story = {
  args: { user: { name: "Camper", profileHref: "#profile" } },
};
export const BrokenImage: Story = {
  args: {
    user: {
      name: "Camper",
      profileHref: "#profile",
      imageUrl: "data:image/png;base64,invalid",
    },
  },
};
