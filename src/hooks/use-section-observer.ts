"use client";

// REVIEWED

import { useEffect, useState } from "react";

export interface SectionObserverOptions {
  rootMargin?: string;
  threshold?: number;
  sectionIds?: string[];
}

export const useSectionObserver = function useSectionObserver(
  options: SectionObserverOptions = {},
) {
  const {
    rootMargin = "-20% 0rem -75% 0rem",
    threshold = 0,
    sectionIds,
  } = options;
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const ids =
      sectionIds ||
      Array.from(document.querySelectorAll("section[id]")).map(
        (section) => section.id,
      );

    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      {
        rootMargin,
        threshold,
      },
    );

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // eslint-disable-next-line consistent-return
    return () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [rootMargin, threshold, sectionIds]);

  return { activeSection };
};
