"use client";

// REVIEWED - 01

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Room } from "@/payload-types";

export const useRoomActive = function useRoomActive(
  rooms: Room[] | null | undefined,
) {
  const pathname = usePathname();
  const isRoom = pathname.includes("rooms");
  const roomSlug = pathname.split("/")[2];

  const [roomActive, setRoomActive] = useState<Pick<
    Room,
    "id" | "name" | "slug" | "information"
  > | null>(null);

  useEffect(() => {
    if (isRoom) {
      const room = rooms
        ? rooms.find((element) => element.slug === roomSlug)
        : null;

      if (room) {
        const roomActiveStateData = {
          id: room.id,
          name: room.name,
          slug: room.slug,
          information: room.information,
        };

        setRoomActive(roomActiveStateData);
      }
    } else setRoomActive(null);
  }, [pathname, rooms, isRoom, roomSlug]);

  return { roomActive, setRoomActive };
};
