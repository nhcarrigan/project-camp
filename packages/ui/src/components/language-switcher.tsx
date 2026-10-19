"use client";

import { Globe } from "lucide-react";
import { listItemStyles } from "./component-styles";
import { Disclosure } from "./disclosure";

export type LanguageOption = { code: string; label: string };
export type LanguageSwitcherProps = {
  languages: LanguageOption[];
  value: string;
  onChange: (code: string) => void;
  label?: string;
};

export function LanguageSwitcher({
  languages,
  value,
  onChange,
  label = "Change language",
}: LanguageSwitcherProps) {
  return (
    <Disclosure
      label={label}
      trigger={
        <Globe
          size={24}
          strokeWidth={1.5}
          aria-hidden="true"
          focusable="false"
        />
      }
      className="camp-language"
    >
      <ul className="list-none m-0 p-0">
        {languages.map(({ code, label: languageLabel }) => (
          <li key={code}>
            <button
              type="button"
              className={listItemStyles}
              lang={code}
              aria-current={value === code ? "true" : undefined}
              onClick={() => onChange(code)}
            >
              <span>{languageLabel}</span>
              {value === code && <span aria-hidden="true">✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </Disclosure>
  );
}
