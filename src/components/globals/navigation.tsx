"use client";

// REVIEWED - 12

import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { HumansButFromGazaPageLink } from "@/lib/utils/strings";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { NavigationLink } from "./navigation-link";

export const navigation = [
  {
    label: "A Human But From Gaza",
    href: "/a-human-but-from-gaza",
    coming: false,
  },
  {
    label: "Humans But From Gaza",
    href: HumansButFromGazaPageLink,
    coming: false,
  },
  {
    label: "About Us",
    href: "/about-us",
    coming: false,
  },
  {
    label: "Support Us",
    href: "/support",
    coming: false,
  },
  {
    label: "Palestinian-Causes' Rooms",
    href: "/rooms",
    coming: true,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    coming: true,
  },
];

export const Navigation = function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <nav aria-label="Main Navigation">
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="fixed right-0 top-0 z-50">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-expanded={open}
              aria-label="Open navigation menu"
              aria-controls="navigation-menu"
              className="!h-10 !w-10 lg:!h-12 lg:!w-12">
              <Menu
                aria-hidden="true"
                className="!h-5 !w-5 stroke-[1.5] lg:!h-7 lg:!w-7"
              />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent
          id="navigation-menu"
          side="left"
          aria-label="Navigation Menu"
          className="flex w-full flex-col gap-0 p-0 sm:max-w-md lg:max-w-xl">
          <SheetHeader className="flex-shrink-0">
            <SheetTitle className="p-5">
              <Link href="/" onClick={() => setOpen(false)}>
                PalestinianCauses.
              </Link>
            </SheetTitle>
          </SheetHeader>
          <Separator className="flex-shrink-0" />
          <div className="no-scrollbar flex-1 overflow-y-auto">
            <ul className="divide-y divide-muted">
              {navigation.map(({ label, href, coming }) => (
                <li
                  key={href}
                  className="flex w-full items-center justify-start">
                  <NavigationLink
                    href={href}
                    coming={coming}
                    onClick={() => setOpen(false)}>
                    {label}
                  </NavigationLink>
                </li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
