"use client";

// REVIEWED - 02

import { Variants } from "motion/react";
import {
  HTMLAttributes,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils/styles";

import { MotionDiv } from "./motion";

export const MarqueeItem = function MarqueeItem({
  delay = 0,
  className,
  children,
}: HTMLAttributes<HTMLDivElement> & PropsWithChildren<{ delay?: number }>) {
  return (
    <div className={cn("relative inline-block h-full w-full", className)}>
      {children}
    </div>
  );
};

export const InfiniteMarquee = function InfiniteMarquee({
  direction = "left",
  speed = 50,
  className,
  children,
}: HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    direction?: "left" | "right";
    speed?: number;
  }>) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (marqueeRef.current && marqueeRef.current.scrollWidth)
      setContentWidth(marqueeRef.current.scrollWidth / 2);
  }, [children]);

  const duration = contentWidth / speed;
  const marqueeVariants: Variants = {
    animate: {
      x: direction === "left" ? -contentWidth : 0,
      transition: {
        x: {
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
          duration,
        },
      },
    },
  };

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      {contentWidth > 0 && (
        <MotionDiv
          ref={marqueeRef}
          variants={marqueeVariants}
          initial={{ x: direction === "left" ? 0 : -contentWidth }}
          animate="animate"
          className="flex h-full w-full">
          {children}
          {children}
        </MotionDiv>
      )}

      {contentWidth === 0 && (
        <div ref={marqueeRef} className="invisible flex h-full w-full">
          {children}
          {children}
        </div>
      )}
    </div>
  );
};
