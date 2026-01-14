// REVIEWED - 03

import { Easing } from "motion/react";

export const motions = {
  transition: ({
    ease,
    duration,
    delay,
  }: {
    ease?: Easing;
    duration?: "slow" | "medium" | "fast";
    delay?: number;
  }) => ({
    ease: ease || "linear",
    duration:
      (duration === "slow" && 1) ||
      (duration === "medium" && 0.5) ||
      (duration === "fast" && 0.25) ||
      0.5,
    delay: delay || 0,
  }),

  fadeIn: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
  },

  fadeInLeft: {
    initial: { opacity: 0, x: 20 },
    whileInView: { opacity: 1, x: 0 },
  },

  hoverScaleX: {
    initial: { scaleX: 0 },
    variants: { hover: { scaleX: 1 } },
  },
};
