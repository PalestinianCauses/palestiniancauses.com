"use client";

// REVIEWED - 13
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

import { DynamicBreadcrumb } from "@/components/globals/dynamic-breadcrumb";
import { SafeHydrate } from "@/components/globals/safe-hydrate";
import { SidebarMainMenu } from "@/components/globals/sidebar/menu";
import { SidebarUser } from "@/components/globals/sidebar/user";
import { WebsiteSwitcher } from "@/components/globals/sidebar/website-switcher";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useActivity } from "@/hooks/use-activity";
import { getQueryClient } from "@/lib/query";

export const QueryProvider = function QueryProvider({
  children,
}: PropsWithChildren) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const ActivityProvider = function ActivityProvider() {
  const {
    isFetching,
    user,
    isInActivityWarning,
    isInActivityCountDown,
    staySignedIn,
    signOutDueToInActivity,
  } = useActivity();

  if (isFetching || !user) return null;

  return (
    <AlertDialog open={isInActivityWarning}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Your session is about to expire in {isInActivityCountDown} seconds!
          </AlertDialogTitle>
          <AlertDialogDescription>
            We noticed you&apos;ve been in-active for a while. To keep your
            session secure, we&apos;ll need to know if you&apos;d like to stay
            signed in. What would you prefer?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => signOutDueToInActivity()}>
            No, sign me out
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => staySignedIn()}>
            Yes, keep me signed in
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const SidebarMainProvider = function SidebarMainProvider({
  children,
}: PropsWithChildren) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <WebsiteSwitcher />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMainMenu />
        </SidebarContent>
        <SidebarFooter>
          <SidebarUser />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex shrink-0 items-center justify-start border-b border-input py-4 transition-all duration-100 ease-in-out">
          <div className="flex flex-col items-start justify-start gap-4 px-4 xs:flex-row xs:items-center">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="hidden data-[orientation_=_vertical]:h-5 xs:block"
            />
            <SafeHydrate>
              <DynamicBreadcrumb />
            </SafeHydrate>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};
