"use client";

// REVIEWED - 03

import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getRoomList } from "@/actions/room";
import { Room } from "@/payload-types";

export const useRoom = function useRoom() {
  const pathname = usePathname();
  const [roomActive, setRoomActive] = useState<Room | null>(null);

  const isRoom = pathname.includes("rooms");
  const roomSlug = pathname.split("/")[2];

  const { isLoading: isRoomListLoading, data: roomList } = useSuspenseQuery({
    queryKey: ["room-list"],
    queryFn: async () => {
      const response = await getRoomList();

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
  });

  useEffect(() => {
    if (isRoom) {
      const room = roomList
        ? roomList.docs.find((roomElement) => roomElement.slug === roomSlug)
        : null;

      if (room) setRoomActive(room);
    } else setRoomActive(null);
  }, [isRoom, roomList, roomSlug]);

  return {
    isRoom,
    isRoomListLoading,
    roomActive,
    roomList,
  };
};
