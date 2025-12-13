// REVIEWED - 02

"use client";

import { useState } from "react";

import { getMediaAltText, getMediaSizeURL } from "@/lib/utils/media";
import { Room } from "@/payload-types";

import { SuspenseAvatar } from "../globals/suspense-avatar";
import { Skeleton } from "../ui/skeleton";
import { TooltipTrigger } from "../ui/tooltip";

export const HeaderAvatar = function HeaderAvatar({
  name,
  photograph,
}: Pick<Room, "name"> & Pick<Room["information"], "photograph">) {
  const [isLoading, setIsLoading] = useState(Boolean(photograph));

  return (
    <TooltipTrigger asChild>
      <SuspenseAvatar
        className="z-10 h-36 w-36 border border-input md:h-48 md:w-48 lg:h-60 lg:w-60"
        isLoading={isLoading}
        isLoadingProps={{
          className: "w-full aspect-square",
          children: <Skeleton className="h-full w-full" />,
        }}
        avatarImageProps={{
          src: getMediaSizeURL(photograph, "room-photograph") || undefined,
          alt: getMediaAltText(photograph) || "Room's Photograph",
          className: "object-cover object-center",
          onLoad: () => setIsLoading(false),
          onError: () => setIsLoading(false),
        }}
        avatarFallbackProps={{
          className: "text-7xl font-light lg:text-9xl",
          children: name.slice(0, 1).toUpperCase(),
        }}
      />
    </TooltipTrigger>
  );
};
