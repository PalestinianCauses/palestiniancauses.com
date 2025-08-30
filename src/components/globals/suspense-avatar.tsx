"use client";

// REVIEWED

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  HTMLAttributes,
} from "react";

import { cn } from "@/lib/utils/styles";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export const SuspenseAvatar = forwardRef<
  ElementRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    isLoading?: boolean;
    isLoadingProps: HTMLAttributes<HTMLDivElement>;
    avatarImageProps: ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;
    avatarFallbackProps?: ComponentPropsWithoutRef<
      typeof AvatarPrimitive.Fallback
    >;
  }
>(
  (
    {
      isLoading,
      isLoadingProps,
      avatarImageProps,
      avatarFallbackProps,
      ...props
    },
    ref,
  ) => (
    <Avatar ref={ref} {...props}>
      {isLoading ? <div {...isLoadingProps} /> : null}

      <AvatarImage
        {...avatarImageProps}
        className={cn(avatarImageProps.className, { "opacity-0": isLoading })}
      />

      {avatarFallbackProps && avatarFallbackProps.children ? (
        <AvatarFallback {...avatarFallbackProps} />
      ) : null}
    </Avatar>
  ),
);
