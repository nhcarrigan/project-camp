"use client";

import { FormControl, ControlLabel } from "@freecodecamp/ui";
import { cn } from "./lib/utils";
import { useId, type ComponentProps } from "react";
import { Icon } from "./icons";

export type SearchInputProps = Omit<ComponentProps<"input">, "type"> & {
  label: string;
  wrapperClassName?: string;
};

export function SearchInput({
  label,
  id,
  className,
  wrapperClassName,
  ...props
}: SearchInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div
      className={cn(
        "camp-ui camp-search flex items-center gap-2.5 min-w-0 px-2.5 text-light bg-search [&>svg]:shrink-0 has-[input:disabled]:opacity-65 forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]",
        wrapperClassName,
      )}
      role="search"
    >
      <ControlLabel srOnly htmlFor={inputId}>
        {label}
      </ControlLabel>
      <Icon name="search" />
      <FormControl
        {...props}
        id={inputId}
        type="search"
        className={cn(
          "w-full min-w-0 min-h-11 px-0 py-1 border-0 rounded-none font-sans text-base leading-[1.4] text-inherit bg-transparent placeholder:text-muted placeholder:opacity-100",
          className,
        )}
      />
    </div>
  );
}
