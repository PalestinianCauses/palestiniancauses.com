"use client";

// REVIEWED

import { Mic2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";

export const Announcement = function Announcement() {
  const pathname = usePathname();

  if (pathname === "/humans-but-from-gaza/share") return null;

  return (
    <Button
      variant="outline"
      className="fixed bottom-2 left-2 right-2 z-50 h-auto flex-col gap-4 rounded-md border-0 bg-background/50 p-3 pt-5 text-foreground ring-1 ring-inset ring-foreground/15 backdrop-blur-md hover:bg-background/75 sm:bottom-10 sm:left-1/2 sm:right-[initial] sm:-translate-x-1/2 sm:flex-row sm:rounded-full sm:pl-5 sm:pt-3"
      asChild>
      <Link href="/humans-but-from-gaza/share">
        <div className="flex items-center gap-4">
          <Mic2Icon className="!h-5 !w-5 stroke-foreground" />
          Share The Truth With PalestinianCauses.
        </div>
        <Button
          variant="secondary"
          className="w-full sm:w-max sm:rounded-full"
          asChild>
          <span>Announcing Humans But From Gaza.</span>
        </Button>
      </Link>
    </Button>
  );
};
