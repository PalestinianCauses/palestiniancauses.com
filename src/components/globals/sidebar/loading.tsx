// REVIEWED

import { ChevronsUpDownIcon } from "lucide-react";
import { Fragment } from "react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/styles";

import { SuspenseAvatar } from "../suspense-avatar";

export const SidebarLoading = function SidebarLoading() {
  return (
    <Fragment>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              disabled
              size="lg"
              className={cn(
                "h-auto disabled:opacity-100 data-[state_=_open]:bg-sidebar-accent data-[state_=_open]:text-sidebar-accent-foreground group-data-[collapsible_=_icon]:!size-[calc(var(--sidebar-width-icon)_-_1rem)]",
              )}>
              <SuspenseAvatar
                className={cn(
                  "flex aspect-square size-12 items-center justify-center border border-input bg-sidebar text-sidebar-primary-foreground group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)]",
                )}
                isLoading
                isLoadingProps={{
                  className:
                    "relative aspect-square size-12 group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1rem)]",
                  children: (
                    <Skeleton className="absolute inset-0 h-full w-full" />
                  ),
                }}
                avatarImageProps={{}}
                avatarFallbackProps={{}}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <Skeleton className="mb-1.5 h-5 w-full" />
                <Skeleton className="h-4 w-3/5" />
              </div>
              <ChevronsUpDownIcon className="ml-auto text-muted-foreground" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1.5">
            {[...Array(5)].map((_, index) => (
              <SidebarMenuSkeleton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                showSkeletonIcon
                skeletonIconClassName="size-6 aspect-square group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1.75rem)]"
                skeletonClassName="h-5"
                className="h-full px-1.5 py-0.5 group-data-[collapsible_=_icon]:!py-0"
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu className="gap-1.5">
            {[...Array(5)].map((_, index) => (
              <SidebarMenuSkeleton
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                showSkeletonIcon
                skeletonIconClassName="size-6 aspect-square group-data-[collapsible_=_icon]:size-[calc(var(--sidebar-width-icon)_-_1.75rem)]"
                skeletonClassName="h-5"
                className="h-full px-1.5 py-0.5 group-data-[collapsible_=_icon]:!py-0"
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Fragment>
  );
};
