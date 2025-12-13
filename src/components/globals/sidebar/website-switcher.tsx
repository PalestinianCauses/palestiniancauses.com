"use client";

// REVIEWED - 07

import {
  ArrowLeftFromLineIcon,
  ChevronsUpDownIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { Fragment, useState } from "react";

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
import { useRoom } from "@/hooks/use-room";
import { getMediaAltText, getMediaSizeURL } from "@/lib/utils/media";
import { cn } from "@/lib/utils/styles";
import { Room } from "@/payload-types";

import { SuspenseAvatar } from "../suspense-avatar";

const RoomDropdownMenuItem = function RoomDropdownMenuItem({
  room,
}: {
  room: Room;
}) {
  const { setOpenMobile } = useSidebar();

  const { roomActive } = useRoom();

  const [isAvatarLoading, setIsAvatarLoading] = useState(
    Boolean(room.information.photograph),
  );

  return (
    <DropdownMenuItem
      asChild
      onClick={() => setOpenMobile(false)}
      className="gap-2.5 px-2.5 leading-none">
      <Link
        href={`/rooms/${room.slug}`}
        className={cn({
          "bg-sidebar-accent": roomActive ? roomActive.id === room.id : false,
        })}>
        <SuspenseAvatar
          className="border border-input"
          isLoading={isAvatarLoading}
          isLoadingProps={{
            className: "relative aspect-square w-full",
            children: <Skeleton className="absolute inset-0 h-full w-full" />,
          }}
          avatarImageProps={{
            src:
              getMediaSizeURL(room.information.photograph, "room-photograph") ||
              undefined,
            alt:
              getMediaAltText(room.information.photograph) ||
              "Room's Photograph",
            onLoad: () => setIsAvatarLoading(false),
            onError: () => setIsAvatarLoading(false),
          }}
          avatarFallbackProps={{
            children: room.name.charAt(0).toUpperCase(),
            className: "text-xl text-sidebar-primary bg-background",
          }}
        />

        <p className="truncate font-medium text-sidebar-primary">{room.name}</p>
      </Link>
    </DropdownMenuItem>
  );
};

export const WebsiteSwitcher = function WebsiteSwitcher() {
  const { isMobile, setOpenMobile } = useSidebar();

  const { isRoomListLoading, roomList, roomActive } = useRoom();

  const [isAvatarLoading, setIsAvatarLoading] = useState(
    Boolean(roomActive ? roomActive.information.photograph : false),
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              disabled={isRoomListLoading}
              className={cn(
                "h-auto data-[state_=_open]:bg-sidebar-accent data-[state_=_open]:text-sidebar-accent-foreground group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_1rem)]",
                {
                  "disabled:opacity-100": isRoomListLoading,
                },
              )}>
              <SuspenseAvatar
                className={cn(
                  "flex aspect-square size-12 items-center border border-input bg-sidebar text-sidebar-primary-foreground group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)]",
                  {
                    "justify-center": !isRoomListLoading,
                  },
                )}
                isLoading={isRoomListLoading || isAvatarLoading}
                isLoadingProps={{
                  className:
                    "relative size-12 aspect-square group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)]",
                  children: (
                    <Skeleton className="absolute inset-0 h-full w-full" />
                  ),
                }}
                avatarImageProps={{
                  src: roomActive
                    ? getMediaSizeURL(
                        roomActive.information.photograph,
                        "room-photograph",
                      ) || undefined
                    : "/logo-primary.png",
                  alt: roomActive
                    ? getMediaAltText(roomActive.information.photograph) ||
                      "Room's Photograph"
                    : "PalestinianCauses's Logo",
                  onLoad: () => setIsAvatarLoading(false),
                  onError: () => setIsAvatarLoading(false),
                  className: roomActive
                    ? "object-cover object-center"
                    : "size-8 object-cover group-data-[collapsible_=_icon]:size-10",
                }}
                avatarFallbackProps={{
                  children: roomActive
                    ? roomActive.name.charAt(0).toUpperCase()
                    : "P",
                  className:
                    "text-lg font-normal text-sidebar-primary bg-background lg:text-xl xl:text-2xl",
                }}
              />

              <div className="grid flex-1 text-left text-sm leading-tight">
                {isRoomListLoading ? (
                  <Fragment>
                    <Skeleton className="mb-1.5 h-5 w-full" />
                    <Skeleton className="h-4 w-3/5" />
                  </Fragment>
                ) : (
                  <Fragment>
                    <span className="truncate font-semibold text-sidebar-primary">
                      {roomActive ? roomActive.name : "PalestinianCauses"}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {roomActive ? "Room" : "Website"}
                    </span>
                  </Fragment>
                )}
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
            {isRoomListLoading ? (
              <Skeleton className="mb-1 h-10 w-full" />
            ) : roomList ? (
              <Fragment>
                <DropdownMenuLabel className="px-2.5 text-xs text-muted-foreground">
                  Rooms
                </DropdownMenuLabel>
                {roomList.docs.map((room) => (
                  <RoomDropdownMenuItem key={room.id} room={room} />
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
                    <ArrowLeftFromLineIcon className="size-4 stroke-[1.5]" />
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
