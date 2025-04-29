"use client";

// REVIEWED - 04

import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";

export const BackButton = function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/" || pathname === "/instagram") return null;

  return (
    <Button
      variant="outline"
      className="fixed left-2.5 top-2.5 z-50"
      onClick={router.back}>
      <ArrowLeftIcon />
      <span>Go Back</span>
    </Button>
  );
};
