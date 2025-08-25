"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getRoomLinks, getRoomList } from "@/actions/room";
import { Room } from "@/payload-types";

export const useRoom = function useRoom() {
  const pathname = usePathname();
  const [roomActive, setRoomActive] = useState<Room | null>(null);

  const isRoom = pathname.includes("rooms");
  const roomSlug = pathname.split("/")[2];

  const { isLoading: isRoomListLoading, data: roomList } = useQuery({
    queryKey: ["room-list"],
    queryFn: async () => {
      const response = await getRoomList();

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
  });

  const { isLoading: isRoomLinksLoading, data: roomLinks } = useQuery({
    queryKey: ["room-links"],
    queryFn: async () => {
      if (!roomActive) return null;

      const response = await getRoomLinks(roomActive.id);

      if (!response.data || response.data.length === 0 || response.error)
        return null;

      return response.data;
    },
    enabled: Boolean(roomActive),
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
    isRoomLinksLoading,
    roomActive,
    roomList,
    roomLinks,
  };
};
