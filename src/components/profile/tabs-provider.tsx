"use client";

// REVIEWED

import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useCallback } from "react";

import { Tabs } from "@/components/ui/tabs";

const VALID_TABS = [
  "info",
  "activity",
  "achievements",
  "notifications",
  "settings",
] as const;

export const ProfileTabsProvider = function ProfileTabsProvider({
  children,
}: PropsWithChildren) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const tabCurrent = VALID_TABS.find((tab) => tab === tabParam) || "info";

  const doTabChange = useCallback((value: string) => {
    const newURL = new URL(window.location.href);
    if (value === "info") newURL.searchParams.delete("tab");
    else newURL.searchParams.set("tab", value);

    window.history.replaceState(null, "", newURL.toString());
  }, []);

  return (
    <Tabs value={tabCurrent} onValueChange={doTabChange} className="space-y-10">
      {children}
    </Tabs>
  );
};
