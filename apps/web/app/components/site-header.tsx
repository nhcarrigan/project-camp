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
