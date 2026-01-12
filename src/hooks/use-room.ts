"use client";

// REVIEWED - 04

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Room } from "@/payload-types";

export const useRoom = function useRoom(roomList: Room[]) {
  const pathname = usePathname();
  const [roomActive, setRoomActive] = useState<Room | null>(null);

  const isRoom = pathname.includes("rooms");
  const roomSlug = pathname.split("/")[2];

  useEffect(() => {
    if (isRoom) {
      const room = roomList
        ? roomList.find((roomElement) => roomElement.slug === roomSlug)
        : null;

      if (room) setRoomActive(room);
    } else setRoomActive(null);
  }, [isRoom, roomList, roomSlug]);

  return {
    isRoom,
    roomActive,
    roomList,
  };
};
