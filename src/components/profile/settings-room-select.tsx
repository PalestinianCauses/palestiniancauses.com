"use client";

// REVIEWED

import { useQuery } from "@tanstack/react-query";

import { getRoomList } from "@/actions/room";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

export const RoomSelect = function RoomSelect({
  value,
  onValueChange,
}: {
  value?: string;
  // eslint-disable-next-line no-shadow, no-unused-vars
  onValueChange: (value: string | undefined) => void;
}) {
  const { isLoading: isRoomListLoading, data: roomList } = useQuery({
    queryKey: ["room-list"],
    queryFn: async () => {
      const response = await getRoomList();

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data;
    },
  });

  if (isRoomListLoading)
    return <Skeleton className="h-10 w-full bg-foreground/5" />;

  const rooms = roomList?.docs || [];

  return (
    <Select
      value={value || "no-room"}
      onValueChange={(v) => onValueChange(v)}
      disabled={isRoomListLoading || rooms.length === 0}>
      <SelectTrigger>
        <SelectValue placeholder="Select a room" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="no-room">No Room Selected</SelectItem>
        {rooms.map((room) => (
          <SelectItem key={room.id} value={room.id.toString()}>
            {room.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
