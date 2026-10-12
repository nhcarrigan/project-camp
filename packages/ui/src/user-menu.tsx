"use client";

import { Button, Image } from "@freecodecamp/ui";
import { controlStyles } from "./component-styles";
import { useState } from "react";
import { Icon } from "./icons";

export type HeaderUser = {
  name: string;
  profileHref: string;
  imageUrl?: string;
};
export type UserMenuProps = {
  user?: HeaderUser;
  signInHref: string;
  signInLabel?: string;
  profileLabel?: string;
};

// Matches upstream AuthOrProfile: account actions are supplied to NavigationMenu.
export function UserMenu({
  user,
  signInHref,
  signInLabel = "Sign in",
  profileLabel = "Your profile",
}: UserMenuProps) {
  const [failedImage, setFailedImage] = useState<string>();
  if (!user)
    return (
      <Button
        href={signInHref}
        className={controlStyles}
        aria-label={signInLabel}
      >
        <span className="hidden compact:inline">{signInLabel}</span>
        <span className="block compact:hidden [&_svg]:block">
          <Icon name="user" />
        </span>
      </Button>
    );
  return (
    <Button
      href={user.profileHref}
      className="camp-ui inline-flex shrink-0 justify-center items-center size-11 min-w-11 min-h-11 p-px border border-solid border-current rounded-none text-light bg-navy no-underline cursor-pointer forced-colors:border-[ButtonText]"
      aria-label={`${profileLabel}: ${user.name}`}
    >
      {user.imageUrl && failedImage !== user.imageUrl ? (
        <Image
          className="w-full h-full object-cover"
          src={user.imageUrl}
          alt=""
          width={40}
          height={40}
          onError={() => setFailedImage(user.imageUrl)}
        />
      ) : (
        <Icon name="user" />
      )}
    </Button>
  );
}
