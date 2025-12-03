"use client";

// REVIEWED - 01

import {
  ActivityIcon,
  AwardIcon,
  BellIcon,
  InfoIcon,
  Settings2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/styles";

import { Button } from "../ui/button";

const navigationItems = [
  {
    key: "info",
    href: "/profile",
    label: "Info",
    icon: InfoIcon,
  },
  {
    key: "activity",
    href: "/profile/activity",
    label: "Activity",
    icon: ActivityIcon,
  },
  {
    key: "achievements",
    href: "/profile/achievements",
    label: "Achievements",
    icon: AwardIcon,
  },
  {
    key: "notifications",
    href: "/profile/notifications",
    label: "Notifications",
    icon: BellIcon,
  },
  {
    key: "settings",
    href: "/profile/settings",
    label: "Settings",
    icon: Settings2Icon,
  },
];

export const ProfileNavigation = function ProfileNavigation({
  items = navigationItems,
}: {
  items?: typeof navigationItems;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2.5 border-b border-input/50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Button
            key={item.key}
            variant="ghost"
            asChild
            className={cn("border border-transparent text-muted-foreground", {
              "border-b-foreground text-foreground": isActive,
            })}>
            <Link href={item.href}>
              <Icon />
              {item.label}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
};
