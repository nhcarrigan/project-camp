import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { expect, userEvent, within } from "@storybook/test";
import { Header, type HeaderProps } from "../../src/header";
import { LanguageSwitcher } from "../../src/language-switcher";
import { SearchInput } from "../../src/search-input";
import { UserMenu } from "../../src/user-menu";

function Example(props: HeaderProps & { signedIn?: boolean }) {
  const [language, setLanguage] = useState("en");
  return (
    <div className="min-h-screen bg-light text-navy">
      <Header
        {...props}
        search={
          props.search === null ? null : (
            <SearchInput
              label="Search projects"
              placeholder="Search projects"
            />
          )
        }
        languageSwitcher={
          <LanguageSwitcher
            value={language}
            onChange={setLanguage}
            languages={[
              { code: "en", label: "English" },
              { code: "es", label: "Español" },
            ]}
          />
        }
        userControl={
          <UserMenu
            signInHref="#sign-in"
            user={
              props.signedIn
                ? { name: "Camper", profileHref: "#profile" }
                : undefined
            }
          />
        }
      />
      <main id="main-content" tabIndex={-1} className="p-6">
        <h1>Explore projects</h1>
        <p>Selected language: {language}</p>
        <a href="#projects">Browse projects</a>
      </main>
    </div>
  );
}

const meta = {
  title: "Layout/Header",
  component: Header,
  args: {
    items: [
      { id: "projects", label: "Explore projects", href: "#projects" },
      { id: "guide", label: "Contribution guide", href: "#guide" },
    ],
  },
  parameters: { layout: "fullscreen", viewport: { defaultViewport: "reset" } },
  render: (args) => <Example {...args} />,
} satisfies Meta<typeof Header>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "desktop",
      viewports: {
        desktop: {
          name: "Desktop",
          styles: { width: "1440px", height: "900px" },
          type: "desktop",
        },
      },
    },
  },
};
export const SignedOut: Story = {};
export const SignedIn: Story = {
  render: (args) => <Example {...args} signedIn />,
};
export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole("button", { name: "Menu" });
    await userEvent.click(trigger);
    await expect(
      canvas.getByRole("searchbox", { name: "Search projects" }),
    ).toBeVisible();
    await expect(
      canvas.getByRole("link", { name: "Contribution guide" }),
    ).toBeVisible();
    const search = canvas.getByRole("searchbox", { name: "Search projects" });
    await userEvent.type(search, "help");
    await expect(search).toHaveValue("help");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger).toHaveFocus();
  },
};
export const WithoutSearch: Story = { args: { search: null } };
