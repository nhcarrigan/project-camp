import type { ReactNode } from "react";
import { Logo } from "./logo";
import { NavigationMenu, type NavigationItem } from "./navigation-menu";

export type HeaderProps = {
  items: NavigationItem[];
  search?: ReactNode;
  languageSwitcher?: ReactNode;
  userControl?: ReactNode;
  logo?: ReactNode;
  homeHref?: string;
  homeLabel?: string;
  menuLabel?: string;
  navigationLabel?: string;
  skipHref?: string;
  skipLabel?: string;
};

/** Composes the standalone navigation components; authentication/i18n stay with the app. */
export function Header({
  items,
  search,
  languageSwitcher,
  userControl,
  logo = <Logo />,
  homeHref = "/",
  homeLabel = "Home",
  menuLabel = "Menu",
  navigationLabel = "Primary navigation",
  skipHref = "#main-content",
  skipLabel = "Skip to content",
}: HeaderProps) {
  return (
    <header className="camp-ui sticky top-0 z-10 bg-navy text-light forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]">
      <a
        href={skipHref}
        className="absolute start-4 top-full z-30 -translate-y-[200vh] px-4 py-3 bg-light text-navy focus:translate-y-0"
      >
        {skipLabel}
      </a>
      <nav
        aria-label={navigationLabel}
        className="camp-header relative grid grid-cols-[minmax(0,1fr)_auto] desktop:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center min-h-[56px] desktop:min-h-[calc(2.75rem+12px)] gap-x-2 px-2 compact:px-4 desktop:gap-x-4"
      >
        <a
          href={homeHref}
          aria-label={homeLabel}
          className="col-start-1 desktop:col-start-2 row-start-1 flex items-center min-w-0 min-h-11 text-inherit [&_svg]:w-[210px] desktop:[&_svg]:w-[260px] [&_svg]:max-w-full [&_svg]:h-auto forced-colors:[&_svg]:fill-[LinkText]"
        >
          {logo}
        </a>
        <div className="camp-header-controls col-start-2 desktop:col-start-3 row-start-1 flex items-center justify-end gap-1 compact:gap-2.5 min-w-0">
          {languageSwitcher}
          <NavigationMenu items={items} label={menuLabel} search={search} />
          {userControl}
        </div>
      </nav>
    </header>
  );
}
