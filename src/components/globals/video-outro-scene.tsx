"use client";

// REVIEWED - 02

import { AnimatePresence, Variants } from "motion/react";
import { useEffect, useMemo, useState } from "react";

import { cn, toHEX } from "@/lib/utils/styles";

import { MotionDiv } from "./motion";

const sequenceDefault = [
  {
    word: "Support",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "Five",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "Individuals",
    textColor: "text-primary",
    bgColor: "--background",
  },
  {
    word: "United",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "By",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "One",
    textColor: "text-primary-foreground",
    bgColor: "--primary",
  },
  {
    word: "Mission.",
    textColor: "text-primary",
    bgColor: "--background",
  },
];

export const VideoOutroScene = function VideoOutroScene({
  sequence = sequenceDefault,
  duration = 500,
  loop = true,
  containerClassName = "",
  bgClassName = "",
  textClassName = "",
}) {
  const variants: Variants = useMemo(
    () => ({
      initial: { scale: 0.96, y: 8 },
      animate: {
        scale: 1,
        y: 0,
        transition: { duration: duration / 2 / 1000, ease: "easeOut" },
      },
      exit: {
        scale: 0.98,
        y: -8,
        transition: { duration: duration / 2 / 1000, ease: "easeIn" },
      },
    }),
    [duration],
  );

  const [indexCurrent, setIndexCurrent] = useState(0);

  const hasSequence = sequence && sequence.length > 0;
  const itemCurrent = hasSequence ? sequence[indexCurrent] : null;

  const [colors, setColors] = useState({ current: "" });

  useEffect(() => {
    if (!hasSequence || (sequence.length <= 1 && !loop)) return;

    const interval = setInterval(() => {
      setIndexCurrent((indexPrevious) => {
        const indexNext = indexPrevious + 1;
        if (indexNext >= sequence.length) return loop ? 0 : indexPrevious;

        return indexNext;
      });
    }, duration);

    /* eslint-disable-next-line consistent-return */
    return () => clearInterval(interval);
  }, [hasSequence, sequence.length, duration, loop]);

  useEffect(() => {
    if (!itemCurrent) return;

    setColors({
      current: toHEX(
        getComputedStyle(document.documentElement).getPropertyValue(
          itemCurrent.bgColor,
        ),
      ),
    });
  }, [setColors, sequence, itemCurrent]);

  if (!itemCurrent || !colors.current) return null;

  return (
    <div
      className={cn(
        "relative z-50 h-max w-full bg-background",
        containerClassName,
      )}>
      <AnimatePresence mode="wait">
        <MotionDiv
          key={indexCurrent}
          style={{ backgroundColor: colors.current }}
          className={cn(
            "flex h-full w-full items-center justify-center py-24 lg:py-32 xl:py-48",
            bgClassName,
          )}>
          <MotionDiv
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={cn(
              "text-center text-6xl font-medium !leading-none tracking-tighter sm:text-7xl lg:text-8xl xl:text-9xl",
              itemCurrent.textColor,
              textClassName,
            )}>
            {itemCurrent.word}
          </MotionDiv>
        </MotionDiv>
      </AnimatePresence>
    </div>
  );
};
