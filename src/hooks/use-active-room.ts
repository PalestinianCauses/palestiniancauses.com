"use client";

// REVIEWED

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Room } from "@/payload-types";

export const useActiveRoom = function useActiveRoom(
  rooms: Room[] | null | undefined,
) {
  const pathname = usePathname();
  const isRoom = pathname.includes("rooms");
  const roomSlug = pathname.split("/")[2];

  const [activeRoom, setActiveRoom] = useState<Pick<
    Room,
    "id" | "name" | "slug" | "information"
  > | null>(null);

  useEffect(() => {
    if (isRoom) {
      const room = rooms
        ? rooms.find((element) => element.slug === roomSlug)
        : null;

      if (room) {
        const activeRoomStateData = {
          id: room.id,
          name: room.name,
          slug: room.slug,
          information: room.information,
        };

        setActiveRoom(activeRoomStateData);
      }
    } else setActiveRoom(null);
  }, [pathname, rooms, isRoom, roomSlug]);

  return {
    activeRoom,
  };
};
