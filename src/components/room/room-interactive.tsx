"use client";

// REVIEWED

import { Fragment } from "react";

import { useRoomNavigation } from "@/hooks/use-room-navigation";
import { Room } from "@/payload-types";

import { NavigationSticky } from "./navigation-sticky";
import { ShareButton } from "./share-button";

interface RoomInteractiveProps {
  room: Room;
  roomOwner: string;
}

export const RoomInteractive = function RoomInteractive({
  room,
  roomOwner,
}: RoomInteractiveProps) {
  const navigationItems = useRoomNavigation({ room });

  return (
    <Fragment>
      <NavigationSticky items={navigationItems} />
      <div className="fixed bottom-5 left-5 z-40">
        <ShareButton title={`${roomOwner}'s Room`} />
      </div>
    </Fragment>
  );
};
