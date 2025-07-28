"use client";

// REVIEWED

import { ChevronsUpDownIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/use-user";

import { SafeHydrate } from "../safe-hydrate";

export const SidebarUser = function SidebarUser() {
  const pathname = usePathname();
  const { isLoading, data: user } = useUser();

  return (
    <SafeHydrate
      isLoading={isLoading}
      isLoadingComponent={
        <Skeleton className="h-10 w-full group-data-[state_=_collapsed]:aspect-square group-data-[state_=_collapsed]:h-auto" />
      }>
      {(() => {
        if (!user)
          return (
            <SidebarMenu>
              <SidebarMenuItem className="group-data-[collapsible_=_icon]:flex group-data-[collapsible_=_icon]:justify-center">
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/signin")}
                  className="relative overflow-visible text-muted-foreground hover:bg-sidebar hover:text-sidebar-primary active:bg-sidebar active:font-medium active:text-sidebar-primary data-[active_=_true]:bg-sidebar data-[active_=_true]:text-sidebar-primary data-[active_=_true]:after:absolute data-[active_=_true]:after:-left-2 data-[active_=_true]:after:top-0 data-[active_=_true]:after:h-full data-[active_=_true]:after:w-px data-[active_=_true]:after:bg-sidebar-primary group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_2rem)] group-data-[collapsible_=_icon]:!p-0 group-data-[collapsible_=_icon]:data-[active_=_true]:after:-left-4">
                  <Link href="/signin">
                    <div className="flex aspect-square size-5 items-center justify-center group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_2rem)]">
                      <LogInIcon className="!size-5 stroke-[1.5]" />
                    </div>
                    <span>Sign in</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          );

        return (
          <SidebarMenu>
            <SidebarMenuItem className="group-data-[collapsible_=_icon]:flex group-data-[collapsible_=_icon]:justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="h-auto data-[state_=_open]:bg-sidebar-accent data-[state_=_open]:text-sidebar-accent-foreground group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_1.5rem)]">
                    <Avatar className="flex aspect-square size-10 items-center justify-center border border-input bg-sidebar text-sidebar-primary-foreground group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1.5rem)]">
                      <AvatarFallback className="bg-muted/50 text-lg text-sidebar-primary">
                        {user.firstName ? user.firstName.charAt(0) : "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-sidebar-primary">
                        {user.firstName || "Anonymous"}
                      </span>
                      <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                    <ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        );
      })()}
    </SafeHydrate>
  );
};
