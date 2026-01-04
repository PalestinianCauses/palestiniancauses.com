"use client";

// REVIEWED - 02

import { isObject } from "@/lib/types/guards";
import { cn } from "@/lib/utils/styles";
import { BlogsRoom } from "@/payload-types";

import { UserAvatar } from "../globals/user-avatar";

export const BlogRoomHeaderAvatar = function BlogRoomHeaderAvatar({
  room,
}: {
  room: BlogsRoom;
}) {
  if (!isObject(room.roomOwner)) return null;

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

      <UserAvatar
        user={room.roomOwner}
        size="user-avatar"
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
        isLoadingClassName={cn({
          "[&_div]:bg-red-700/50": room.color === "red",
          "[&_div]:bg-yellow-700/50": room.color === "yellow",
          "[&_div]:bg-green-700/50": room.color === "green",
          "[&_div]:bg-teal-700/50": room.color === "teal",
          "[&_div]:bg-blue-700/50": room.color === "blue",
        })}
        fallbackClassName={cn(
          "!font-[Gilroy] text-5xl font-light md:text-7xl",
          {
            "bg-red-900": room.color === "red",
            "bg-yellow-900": room.color === "yellow",
            "bg-green-900": room.color === "green",
            "bg-teal-900": room.color === "teal",
            "bg-blue-900": room.color === "blue",
          },
        )}
      />
    </div>
  );
};
