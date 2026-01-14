"use client";

// REVIEWED - 03

import {
  ActivityIcon,
  AwardIcon,
  BellIcon,
  InfoIcon,
  LucideIcon,
  MessagesSquareIcon,
  Package2Icon,
  PencilLineIcon,
  Settings2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils/styles";

import { buttonVariants } from "../ui/button";
import { TabsList, TabsTrigger } from "../ui/tabs";

const iconMap: Record<string, LucideIcon> = {
  "info": InfoIcon,
  "activity": ActivityIcon,
  "achievements": AwardIcon,
  "notifications": BellIcon,
  "settings": Settings2Icon,
  "comments": MessagesSquareIcon,
  "diary-entries": PencilLineIcon,
  "orders": Package2Icon,
};

const navigationItems = [
  { key: "info", label: "Info" },
  { key: "activity", label: "Activity" },
  { key: "achievements", label: "Achievements" },
  { key: "notifications", label: "Notifications" },
  { key: "settings", label: "Settings" },
];

type NavigationItem = {
  key: string;
  label: string;
};

export const ProfileNavigation = function ProfileNavigation({
  items = navigationItems,
}: {
  items?: NavigationItem[];
}) {
  return (
    <TabsList
      className="h-auto w-full justify-start bg-transparent p-0"
      asChild>
      <nav className="flex flex-col gap-2.5 border-b border-input/50 md:flex-row md:flex-wrap">
        {items.map((item) => {
          const Icon = iconMap[item.key];

          return (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full border border-transparent text-muted-foreground data-[state_=_active]:border-b-foreground data-[state_=_active]:text-foreground md:w-max",
              )}>
              {Icon ? <Icon /> : null}
              {item.label}
            </TabsTrigger>
          );
        })}
      </nav>
    </TabsList>
  );
};
