// REVIEWED

export const motions = {
  transition: ({
    ease,
    duration,
    delay,
  }: {
    ease?: string;
    duration?: "slow" | "medium" | "fast";
    delay?: number;
  }) => ({
    ease: ease || "easeIn",
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

  hoverScaleX: {
    initial: { scaleX: 0 },
    variants: { hover: { scaleX: 1 } },
  },
};
