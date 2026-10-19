"use client";

import { HeadlessDisclosure } from "@freecodecamp/ui";
import {
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { controlStyles } from "./component-styles";

type DisclosureProps = {
  label: string;
  trigger: ReactNode;
  children: ReactNode;
  search?: ReactNode;
  className?: string;
};

/** A styled adapter around the disclosure provided by freeCodeCamp's UI library. */
export function Disclosure(props: DisclosureProps) {
  return (
    <HeadlessDisclosure>
      {({ open, close }) => (
        <DisclosureContent {...props} open={open} close={close} />
      )}
    </HeadlessDisclosure>
  );
}

function DisclosureContent({
  label,
  trigger,
  children,
  search,
  className = "",
  open,
  close,
}: DisclosureProps & {
  open: boolean;
  close: (focusTarget?: HTMLElement) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<CSSProperties>({});

  // HeadlessDisclosure supplies state/ARIA; add menu dismissal and viewport placement.
  useLayoutEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        close();
      }
    };
    const ownerDocument = rootRef.current?.ownerDocument;
    const ownerWindow = ownerDocument?.defaultView;
    const position = () => {
      const root = rootRef.current;
      const panel = panelRef.current;
      if (!root || !panel || !ownerWindow) return;
      const triggerBounds = root.getBoundingClientRect();
      const anchorBounds = (
        root.closest(".camp-header") ?? root
      ).getBoundingClientRect();
      const searchBottom =
        root.querySelector(".camp-header-search")?.getBoundingClientRect()
          .bottom ?? 0;
      const anchorBottom = Math.max(anchorBounds.bottom, searchBottom);
      const below = Math.max(0, ownerWindow.innerHeight - anchorBottom - 8);
      const above = Math.max(0, anchorBounds.top - 8);
      const flip = below < Math.min(panel.scrollHeight, 180) && above > below;
      setPanelStyle({
        left: Math.max(
          8,
          Math.min(
            triggerBounds.left,
            ownerWindow.innerWidth - panel.offsetWidth - 8,
          ),
        ),
        top: flip ? undefined : anchorBottom,
        bottom: flip ? ownerWindow.innerHeight - anchorBounds.top : undefined,
        maxHeight: flip ? above : below,
      });
    };
    position();
    const resizeObserver =
      ownerWindow && new ownerWindow.ResizeObserver(position);
    const anchor = rootRef.current?.closest(".camp-header") ?? rootRef.current;
    if (anchor) resizeObserver?.observe(anchor);
    ownerWindow?.addEventListener("resize", position);
    ownerWindow?.addEventListener("scroll", position, true);
    ownerDocument?.addEventListener("pointerdown", dismiss);
    return () => {
      ownerDocument?.removeEventListener("pointerdown", dismiss);
      ownerWindow?.removeEventListener("resize", position);
      ownerWindow?.removeEventListener("scroll", position, true);
      resizeObserver?.disconnect();
    };
  }, [open, close]);

  return (
    <div
      className={`camp-ui camp-disclosure relative w-fit in-[.camp-header]:static ${className}`}
      data-open={open}
      ref={rootRef}
      onBlur={(event) => {
        if (open && !event.currentTarget.contains(event.relatedTarget)) {
          close(
            event.relatedTarget instanceof HTMLElement
              ? event.relatedTarget
              : undefined,
          );
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          close();
        }
      }}
    >
      <HeadlessDisclosure.Button className={controlStyles} aria-label={label}>
        {trigger}
      </HeadlessDisclosure.Button>
      {search && <div className="camp-header-search">{search}</div>}
      <HeadlessDisclosure.Panel
        unmount={false}
        ref={panelRef}
        style={panelStyle}
        className="camp-panel fixed w-64 max-w-[calc(100vw_-_1rem)] overflow-y-auto border border-solid border-muted text-light bg-navy z-20 forced-colors:border-[ButtonText] [&[hidden]]:hidden"
        onClick={(event) => {
          if (
            event.target instanceof Element &&
            event.target.closest("a, button")
          ) {
            close();
          }
        }}
      >
        {children}
      </HeadlessDisclosure.Panel>
    </div>
  );
}
