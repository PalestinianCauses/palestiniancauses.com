"use client";

// REVIEWED

import { useCallback, useEffect, useState } from "react";

export interface UseScrollToTopOptions {
  threshold?: number;
  smooth?: boolean;
}

export const useScrollToTop = function useScrollToTop(
  options: UseScrollToTopOptions = {},
) {
  const { threshold = 400, smooth = true } = options;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > threshold) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    if (smooth) window.scrollTo({ behavior: "smooth", top: 0 });
    else window.scrollTo(0, 0);
  }, [smooth]);

  return { isVisible, scrollToTop };
};
