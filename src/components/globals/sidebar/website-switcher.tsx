"use client";

// REVIEWED - 01

import { ChevronsUpDownIcon, Plus } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
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

export const WebsiteSwitcher = function WebsiteSwitcher() {
  const { isMobile } = useSidebar();

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
            <DropdownMenuLabel className="px-2.5 text-xs text-muted-foreground">
              Rooms
            </DropdownMenuLabel>
            {[{ name: "Shawqi's Room" }, { name: "Gym Rat's Room" }].map(
              (room) => (
                <DropdownMenuItem
                  key={room.name}
                  className="gap-2.5 px-2.5 leading-none">
                  <div className="flex size-8 items-center justify-center rounded-none border border-input text-base font-medium text-sidebar-primary">
                    {room.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-medium text-sidebar-primary">
                    {room.name}
                  </p>
                </DropdownMenuItem>
              ),
            )}
            <DropdownMenuSeparator />
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
