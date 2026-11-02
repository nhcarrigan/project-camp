"use client";

import { useState } from "react";
import { Header, SearchInput, UserMenu, LanguageSwitcher } from "@repo/ui";

const navItems = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard" },
  { id: "projects", label: "Projects", href: "/projects" },
  {
    id: "propose-project",
    label: "Propose Project",
    href: "/projects/propose",
  },
  { id: "profile", label: "Profile", href: "/profile" },
];

/**
 * Global site header component.
 *
 * Where used:
 * - Rendered across all web pages in `RootLayout` (`apps/web/app/layout.tsx`).
 *
 * How used:
 * - Provides top-level branding with navigation links to primary routes (`/dashboard`, `/projects`, `/projects/propose`, `/profile`).
 * - Embeds the global project search input, language switcher dropdown, and user authentication menu.
 */
export function SiteHeader() {
  const [language, setLanguage] = useState("en");

  return (
    <Header
      items={navItems}
      homeHref="/"
      homeLabel="Project Camp Home"
      search={
        <SearchInput label="Search projects" placeholder="Search projects..." />
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
      userControl={<UserMenu signInHref="/profile" signInLabel="Sign in" />}
    />
  );
}
