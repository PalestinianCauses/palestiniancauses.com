"use client";

// REVIEWED - 01

import { useState } from "react";

import { isObject } from "@/lib/types/guards";
import { getMediaAltText, getMediaURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";
import { BlogsRoom } from "@/payload-types";

import { SuspenseAvatar } from "../globals/suspense-avatar";
import { Skeleton } from "../ui/skeleton";

export const BlogRoomHeaderAvatar = function BlogRoomHeaderAvatar({
  room,
}: {
  room: BlogsRoom;
}) {
  const [isAvatarLoading, setIsAvatarLoading] = useState(
    Boolean(isObject(room.roomOwner) ? room.roomOwner.avatar : undefined),
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className={cn(
          "aspect-video h-auto w-full border bg-gradient-to-br md:aspect-[3/1]",
          {
            "border-red-500/50 from-red-500/50 via-red-700/50 to-red-900/50":
              room.color === "red",
            "border-yellow-500/50 from-yellow-500/50 via-yellow-700/50 to-yellow-900/50":
              room.color === "yellow",
            "border-green-500/50 from-green-500/50 via-green-700/50 to-green-900/50":
              room.color === "green",
            "border-teal-500/50 from-teal-500/50 via-teal-700/50 to-teal-900/50":
              room.color === "teal",
            "border-blue-500/50 from-blue-500/50 via-blue-700/50 to-blue-900/50":
              room.color === "blue",
          },
        )}
      />

      <SuspenseAvatar
        className={cn(
          "z-10 h-24 w-24 -translate-y-[50%] border md:h-36 md:w-36",
          {
            "border-red-500/75": room.color === "red",
            "border-yellow-500/75": room.color === "yellow",
            "border-green-500/75": room.color === "green",
            "border-teal-500/75": room.color === "teal",
            "border-blue-500/75": room.color === "blue",
          },
        )}
        isLoading={isAvatarLoading}
        isLoadingProps={{
          className: "relative aspect-square w-full",
          children: (
            <Skeleton
              className={cn("absolute inset-0 h-full w-full", {
                "bg-red-700/50": room.color === "red",
                "bg-yellow-700/50": room.color === "yellow",
                "bg-green-700/50": room.color === "green",
                "bg-teal-700/50": room.color === "teal",
                "bg-blue-700/50": room.color === "blue",
              })}
            />
          ),
        }}
        avatarImageProps={{
          src:
            getMediaURL(
              isObject(room.roomOwner) ? room.roomOwner.avatar : undefined,
            ) || undefined,
          alt:
            getMediaAltText(
              isObject(room.roomOwner) ? room.roomOwner.avatar : undefined,
            ) || "Blog Owner's Avatar",
          className: "object-cover object-center",
          onLoad: () => setIsAvatarLoading(false),
          onError: () => setIsAvatarLoading(false),
        }}
        avatarFallbackProps={{
          children: isObject(room.roomOwner)
            ? room.roomOwner.firstName?.charAt(0).toUpperCase()
            : "A",
          className: cn("text-5xl font-light backdrop-blur-md md:text-7xl", {
            "bg-red-700/50": room.color === "red",
            "bg-yellow-700/50": room.color === "yellow",
            "bg-green-700/50": room.color === "green",
            "bg-teal-700/50": room.color === "teal",
            "bg-blue-700/50": room.color === "blue",
          }),
          style: { fontFamily: "Gilroy" },
        }}
      />
    </div>
  );
};
