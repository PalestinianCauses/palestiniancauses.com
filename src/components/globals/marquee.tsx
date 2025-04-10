"use client";

// REVIEWED

import { PropsWithChildren, useEffect, useRef, useState } from "react";

import { motions } from "@/lib/motion";

import { MotionDiv } from "./motion";

export const MarqueeItem = function MarqueeItem({
  delay = 0,
  children,
}: PropsWithChildren<{ delay?: number }>) {
  return (
    <MotionDiv
      initial={motions.fadeInLeft.initial}
      animate={motions.fadeInLeft.whileInView}
      transition={motions.transition({ delay })}
      className="inline-block">
      {children}
    </MotionDiv>
  );
};

export const InfiniteMarquee = function InfiniteMarquee({
  direction = "left",
  speed = 50,
  children,
}: PropsWithChildren<{
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
  const marqueeVariants = {
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
    <div className="relative w-full overflow-hidden">
      {contentWidth > 0 && (
        <MotionDiv
          ref={marqueeRef}
          variants={marqueeVariants}
          initial={{ x: direction === "left" ? 0 : -contentWidth }}
          animate="animate"
          className="flex w-max">
          {children}
          {children}
        </MotionDiv>
      )}

      {contentWidth === 0 && (
        <div ref={marqueeRef} className="invisible flex w-max">
          {children}
          {children}
        </div>
      )}
    </div>
  );
};
