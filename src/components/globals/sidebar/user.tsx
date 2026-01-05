"use client";

// REVIEWED - 08

import {
  ActivityIcon,
  AwardIcon,
  BellIcon,
  ChevronsUpDownIcon,
  LayoutIcon,
  LogInIcon,
  LogOutIcon,
  Settings2Icon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
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
import { useAuth } from "@/hooks/use-auth";
import { useNotificationsCountUnRead } from "@/hooks/use-unread-notifications-count";
import { useUser } from "@/hooks/use-user";
import { hasAnyRole } from "@/lib/permissions";
import { cn } from "@/lib/utils/styles";

import { SafeHydrate } from "../safe-hydrate";
import { UserAvatar } from "../user-avatar";

export const SidebarUser = function SidebarUser() {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();
  const { signOut } = useAuth();
  const { isLoading, data: user } = useUser();
  const countUnRead = useNotificationsCountUnRead({ user: user || undefined });

  const canAccessAdminDashboard = hasAnyRole(user || null, [
    "admin-user",
    "system-user",
    "author-user",
  ]);

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
                  onClick={() => setOpenMobile(false)}
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
                    <UserAvatar
                      user={user}
                      size="user-avatar"
                      className="flex aspect-square size-10 items-center justify-start border border-input bg-sidebar text-sidebar-primary-foreground group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1.5rem)]"
                    />
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
                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                  align="end"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={2}>
                  <DropdownMenuGroup>
                    {canAccessAdminDashboard ? (
                      <DropdownMenuItem asChild className="gap-2.5 px-2.5">
                        <Link
                          href="/admin"
                          onClick={() => setOpenMobile(false)}>
                          <LayoutIcon />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem asChild className="gap-2.5 px-2.5">
                      <Link
                        href="/profile"
                        onClick={() => setOpenMobile(false)}>
                        <UserIcon />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="gap-2.5 px-2.5">
                      <Link
                        href="/profile/activity"
                        onClick={() => setOpenMobile(false)}>
                        <ActivityIcon />
                        Activity
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="gap-2.5 px-2.5">
                      <Link
                        href="/profile/achievements"
                        onClick={() => setOpenMobile(false)}>
                        <AwardIcon />
                        Achievements
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="gap-2.5 px-2.5">
                      <Link
                        href="/profile/notifications"
                        onClick={() => setOpenMobile(false)}
                        className="relative">
                        <BellIcon />
                        Notifications
                        {countUnRead !== 0 && (
                          <Badge
                            variant="destructive"
                            className={cn(
                              "absolute -top-1.5 right-1.5 flex h-5 min-w-5 items-center justify-center border border-secondary/10 bg-secondary/10 p-1.5 text-sm font-semibold text-secondary",
                            )}>
                            {countUnRead > 99 ? "99+" : countUnRead}
                          </Badge>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="gap-2.5 px-2.5">
                      <Link
                        href="/profile/settings"
                        onClick={() => setOpenMobile(false)}>
                        <Settings2Icon />
                        Account Settings
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      disabled={signOut.isPending}
                      onClick={() => {
                        setOpenMobile(false);
                        signOut.mutate({});
                      }}
                      className="gap-2.5 px-2.5">
                      <LogOutIcon />
                      {signOut.isPending ? "Signing out..." : "Sign out"}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        );
      })()}
    </SafeHydrate>
  );
};
