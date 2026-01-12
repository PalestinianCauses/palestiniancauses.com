// REVIEWED - 04

"use client";

import { isObject } from "@/lib/types/guards";
import { Room, User } from "@/payload-types";

import { UserAvatar } from "../globals/user-avatar";

export const HeaderAvatar = function HeaderAvatar({
  user,
  photograph,
}: { user: number | User } & Pick<Room["information"], "photograph">) {
  if (!isObject(user)) return null;

  return (
    <UserAvatar
      user={{ ...user, avatar: photograph }}
      size="user-avatar"
      className="z-10 w-36 md:w-48 lg:w-60"
      fallbackClassName="text-7xl font-light lg:text-9xl"
    />
  );
};
