"use client";

// REVIEWED

import { useMemo } from "react";

import type { NavigationItem } from "@/components/room/navigation-sticky";
import { isDefined } from "@/lib/types/guards";
import { Room } from "@/payload-types";

export interface UseRoomNavigationOptions {
  room: Room | null;
  visibleSections?: string[];
}

export const useRoomNavigation = function useRoomNavigation(
  options: UseRoomNavigationOptions,
): NavigationItem[] {
  const { room, visibleSections } = options;

  return useMemo(() => {
    if (!room || !isDefined(room.links)) return [];

    const sections: NavigationItem[] = [];

    room.links.forEach((link) => {
      sections.push({
        id: link.label,
        label: link.label,
        href: link.href,
      });
    });

    if (visibleSections && visibleSections.length !== 0)
      return sections.filter((section) => visibleSections.includes(section.id));

    return sections;
  }, [room, visibleSections]);
};
