"use client";

// REVIEWED - 03

import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDownIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

import { getRoomsList } from "@/actions/room";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getMediaAltText, getMediaSizeURL } from "@/lib/utils/media";

export const WebsiteSwitcher = function WebsiteSwitcher() {
  const { isLoading, data: rooms } = useQuery({
    queryKey: ["rooms-list"],
    queryFn: async () => {
      const response = await getRoomsList();

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data.docs;
    },
  });

  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              // h-auto group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_1rem)]
              className="h-auto data-[state_=_open]:bg-sidebar-accent data-[state_=_open]:text-sidebar-accent-foreground group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_1rem)]">
              {/* size-12 group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)] border border-input */}
              <Avatar className="flex aspect-square size-12 items-center justify-center border border-input bg-sidebar text-sidebar-primary-foreground group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)]">
                <AvatarImage
                  src="/logo-primary.png"
                  className="size-8 group-data-[collapsible_=_icon]:size-10"
                />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-primary">
                  PalestinianCauses.
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Website
                </span>
              </div>
              <ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={2}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {isLoading ? (
              <Skeleton className="mb-2.5 h-10 w-full" />
            ) : rooms ? (
              <Fragment>
                <DropdownMenuLabel className="px-2.5 text-xs text-muted-foreground">
                  Rooms
                </DropdownMenuLabel>
                {rooms.map((room) => (
                  <DropdownMenuItem
                    key={room.id}
                    asChild
                    onClick={() => setOpenMobile(false)}
                    className="gap-2.5 px-2.5 leading-none">
                    <Link href={`/rooms/${room.slug}`}>
                      {(() => {
                        const alt = getMediaAltText(
                          room.information.photograph,
                        );

                        const photograph = getMediaSizeURL(
                          room.information.photograph,
                          "room-photograph",
                        );

                        return (
                          <Avatar className="size-8 border border-input">
                            <AvatarImage
                              src={photograph || undefined}
                              alt={alt || "Room's Photograph"}
                            />

                            <AvatarFallback className="bg-background text-base font-medium text-sidebar-primary">
                              {room.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        );
                      })()}
                      <p className="truncate font-medium text-sidebar-primary">
                        {room.name}
                      </p>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </Fragment>
            ) : null}
            <DropdownMenuItem className="gap-2.5 px-2.5">
              <div className="flex size-8 items-center justify-center rounded-none border border-input bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-sm font-medium leading-none text-muted-foreground">
                Acquire Room Ownership
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
