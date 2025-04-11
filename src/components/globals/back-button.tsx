"use client";

// REVIEWED - 01

import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { motions } from "@/lib/motion";

import { Button } from "../ui/button";

import { MotionDiv } from "./motion";

export const BackButton = function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  return (
    <MotionDiv
      initial={motions.fadeIn.initial}
      animate={motions.fadeIn.whileInView}
      transition={motions.transition({})}>
      <Button
        variant="outline"
        className="fixed left-5 top-5 z-50"
        onClick={router.back}>
        <ArrowLeftIcon />
        <span>Go Back</span>
      </Button>
    </MotionDiv>
  );
};
