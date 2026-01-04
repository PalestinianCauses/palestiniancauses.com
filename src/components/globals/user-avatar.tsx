"use client";

// REVIEWED

import { HTMLAttributes, useState } from "react";

import {
  getMediaAltText,
  getMediaSizeURL,
  getMediaURL,
} from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";
import { Media, User } from "@/payload-types";

import { Skeleton } from "../ui/skeleton";

import { SuspenseAvatar } from "./suspense-avatar";

export const UserAvatar = function UserAvatar({
  user,
  size = "user-avatar",
  className,
  isLoadingClassName,
  imageClassName,
  fallbackClassName,
}: {
  user: User;
  size?: keyof NonNullable<Media["sizes"]>;
  className?: HTMLAttributes<HTMLElement>["className"];
  isLoadingClassName?: HTMLAttributes<HTMLElement>["className"];
  imageClassName?: HTMLAttributes<HTMLElement>["className"];
  fallbackClassName?: HTMLAttributes<HTMLElement>["className"];
}) {
  const [isAvatarLoading, setIsAvatarLoading] = useState(Boolean(user?.avatar));

  return (
    <SuspenseAvatar
      className={cn(
        "aspect-square h-auto w-full border border-input",
        className,
      )}
      isLoading={isAvatarLoading}
      isLoadingProps={{
        className: cn("relative aspect-square w-full", isLoadingClassName),
        children: <Skeleton className="absolute inset-0 h-full w-full" />,
      }}
      avatarImageProps={{
        src: size
          ? getMediaSizeURL(user?.avatar, size) || undefined
          : getMediaURL(user?.avatar) || undefined,
        alt: getMediaAltText(user?.avatar) || "User's Avatar",
        className: cn("object-cover object-center", imageClassName),
        onLoad: () => setIsAvatarLoading(false),
        onError: () => setIsAvatarLoading(false),
      }}
      avatarFallbackProps={{
        children: user.firstName?.charAt(0).toUpperCase() || "A",
        className: cn(
          "text-xl text-foreground bg-background",
          fallbackClassName,
        ),
      }}
    />
  );
};
