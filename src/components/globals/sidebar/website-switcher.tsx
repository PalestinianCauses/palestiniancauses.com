"use client";

// REVIEWED - 04

import { useQuery } from "@tanstack/react-query";
import {
  ChevronsUpDownIcon,
  GitCompareArrowsIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

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
import { useRoomActive } from "@/hooks/use-active-room";
import { getMediaAltText, getMediaSizeURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";

export const WebsiteSwitcher = function WebsiteSwitcher() {
  const { isMobile, setOpenMobile } = useSidebar();

  const { isLoading: isRoomsLoading, data: rooms } = useQuery({
    queryKey: ["rooms-list"],
    queryFn: async () => {
      const response = await getRoomsList();

      if (!response.data || response.data.docs.length === 0 || response.error)
        return null;

      return response.data.docs;
    },
  });

  const { roomActive } = useRoomActive(rooms);
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="h-auto data-[state_=_open]:bg-sidebar-accent data-[state_=_open]:text-sidebar-accent-foreground group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_1rem)]">
              {isRoomsLoading || !isAvatarLoaded ? (
                <Skeleton className="aspect-square size-12 group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)]" />
              ) : (
                <Avatar className="flex aspect-square size-12 items-center justify-center border border-input bg-sidebar text-sidebar-primary-foreground group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)]">
                  {roomActive ? (
                    <AvatarImage
                      onLoad={() => setIsAvatarLoaded(true)}
                      src={
                        getMediaSizeURL(
                          roomActive.information.photograph,
                          "room-photograph",
                        ) || undefined
                      }
                      className={cn("object-cover", {
                        "opacity-0": isRoomsLoading || !isAvatarLoaded,
                      })}
                    />
                  ) : (
                    <AvatarImage
                      onLoad={() => setIsAvatarLoaded(true)}
                      src="/logo-primary.png"
                      className={cn(
                        "size-8 object-cover group-data-[collapsible_=_icon]:size-10",
                        { "opacity-0": isRoomsLoading || !isAvatarLoaded },
                      )}
                    />
                  )}

                  <AvatarFallback className="bg-background text-xl font-medium text-sidebar-primary lg:text-2xl xl:text-3xl">
                    {roomActive ? roomActive.name.charAt(0).toUpperCase() : "P"}
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-sidebar-primary">
                  {roomActive ? roomActive.name : "PalestinianCauses"}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  {roomActive ? "Room" : "Website"}
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
            {isRoomsLoading ? (
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
                    <Link
                      href={`/rooms/${room.slug}`}
                      className={cn({
                        "bg-sidebar-accent": roomActive
                          ? roomActive.id === room.id
                          : false,
                      })}>
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
            {roomActive ? (
              <DropdownMenuItem
                asChild
                onClick={() => setOpenMobile(false)}
                className="gap-2.5 px-2.5 leading-none">
                <Link href="/">
                  <div className="flex size-8 items-center justify-center rounded-none border border-input bg-transparent">
                    <GitCompareArrowsIcon className="size-4 stroke-[1.5]" />
                  </div>
                  <p className="text-sm font-medium leading-none text-sidebar-primary">
                    Home
                  </p>
                </Link>
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem className="gap-2.5 px-2.5">
              <div className="flex size-8 items-center justify-center rounded-none border border-input bg-transparent">
                <PlusIcon className="size-4 stroke-[1.5]" />
              </div>
              <p className="text-sm font-medium leading-none text-muted-foreground">
                Acquire Room Ownership
              </p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
