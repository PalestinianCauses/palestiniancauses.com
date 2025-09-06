"use client";

// REVIEWED - 16
import { QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

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
    <SafeHydrate>
      <SidebarProvider defaultOpen>
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
        <SidebarInset className="w-full max-w-full">
          <header className="top-b fixed left-0 right-0 z-40 flex shrink-0 items-center justify-start bg-background py-4 transition-all duration-100 ease-in-out">
            <div className="flex flex-col items-start justify-start gap-4 px-5 lg:px-7 xs:flex-row xs:items-center">
              <SidebarTrigger />
              <Separator
                orientation="vertical"
                className="hidden data-[orientation_=_vertical]:h-5 xs:block"
              />
              <DynamicBreadcrumb />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </SafeHydrate>
  );
};

export const RedirectProvider = function RedirectProvider({
  path,
  children,
}: { path: string } & PropsWithChildren) {
  const router = useRouter();

  useEffect(() => {
    router.push(path);
  }, [router, path]);

  return children;
};
