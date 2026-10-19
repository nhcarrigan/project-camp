"use client";

import type { ReactNode } from "react";
import { Menu } from "lucide-react";
import { listItemStyles } from "./component-styles";
import { Disclosure } from "./disclosure";

export type NavigationItem = { id: string; label: string } & (
  | { href: string; external?: boolean; onSelect?: never; disabled?: never }
  | { href?: never; external?: never; onSelect: () => void; disabled?: boolean }
);

export type NavigationMenuProps = {
  items: NavigationItem[];
  search?: ReactNode;
  label?: string;
  externalLinkLabel?: string;
};

export function NavigationMenu({
  items,
  search,
  label = "Menu",
  externalLinkLabel = "Opens in a new tab",
}: NavigationMenuProps) {
  return (
    <Disclosure
      label={label}
      search={search}
      className="camp-navigation"
      trigger={
        <>
          <span className="hidden compact:inline">{label}</span>
          <span className="block compact:hidden [&_svg]:block">
            <Menu
              size={24}
              strokeWidth={1.5}
              aria-hidden="true"
              focusable="false"
            />
          </span>
        </>
      }
    >
      <ul className="list-none m-0 p-0">
        {items.map((item) => (
          <li key={item.id}>
            {item.href !== undefined ? (
              <a
                className={listItemStyles}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
              >
                {item.label}
                {item.external && (
                  <>
                    <span aria-hidden="true"> ↗</span>
                    <span className="sr-only"> ({externalLinkLabel})</span>
                  </>
                )}
              </a>
            ) : (
              <button
                type="button"
                className={listItemStyles}
                onClick={item.onSelect}
                disabled={item.disabled}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    </Disclosure>
  );
}
