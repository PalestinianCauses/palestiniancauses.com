"use client";

// REVIEWED - 02

import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "../ui/button";

export const BackButton = function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  return (
    <Button
      variant="outline"
      size="lg"
      className="fixed left-5 top-5 z-50"
      onClick={router.back}>
      <ArrowLeftIcon />
      <span>Go Back</span>
    </Button>
  );
};
