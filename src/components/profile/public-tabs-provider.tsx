"use client";

// REVIEWED

import { useSearchParams } from "next/navigation";
import { PropsWithChildren, useCallback } from "react";

import { Tabs } from "@/components/ui/tabs";
import { User } from "@/payload-types";

const getTabsValid = (user: User) => {
  const tabs = ["comments", "diary-entries"];

  if (user.privacySettings.showOrders) tabs.push("orders");
  if (user.privacySettings.showAchievements) tabs.push("achievements");
  if (user.privacySettings.showActivity) tabs.push("activity");

  return tabs;
};

export const PublicProfileTabsProvider = function PublicProfileTabsProvider({
  user,
  children,
}: { user: User } & PropsWithChildren) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const tabsValid = getTabsValid(user);
  const tabCurrent =
    tabsValid.find((tab) => tab === tabParam) || "diary-entries";

  const doTabChange = useCallback((value: string) => {
    const newURL = new URL(window.location.href);
    if (value === "diary-entries") newURL.searchParams.delete("tab");
    else newURL.searchParams.set("tab", value);

    window.history.replaceState(null, "", newURL.toString());
  }, []);

  return (
    <Tabs value={tabCurrent} onValueChange={doTabChange} className="space-y-10">
      {children}
    </Tabs>
  );
};
