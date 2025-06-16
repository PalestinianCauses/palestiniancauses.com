"use client";

// REVIEWED

import { usePathname } from "next/navigation";
import { useCallback, useLayoutEffect, useRef } from "react";

export const useHashScroll = function useHashScroll(
  durationHighlight: number = 1000,
  classNameHighlight: string = "highlight",
) {
  const pathname = usePathname();
  const elementId = useRef<string | null>(null);
  /* eslint-disable-next-line no-undef */
  const elementTimer = useRef<NodeJS.Timeout | null>(null);

  const doHighlight = useCallback(
    (id: string) => {
      const element = document.getElementById(id);
      if (!element) return;

      if (elementTimer.current) {
        clearTimeout(elementTimer.current);
        elementTimer.current = null;
      }

      if (elementId.current && elementId.current !== id) {
        const previousElement = document.getElementById(elementId.current);
        if (previousElement)
          previousElement.classList.remove(classNameHighlight);
      }

      element.classList.remove(classNameHighlight);
      /* eslint-disable-next-line no-void */
      void element.offsetWidth;
      element.classList.add(classNameHighlight);
      elementId.current = id;

      elementTimer.current = setTimeout(() => {
        element.classList.remove(classNameHighlight);
        if (elementId.current === id) elementId.current = null;
      }, durationHighlight);

      element.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [classNameHighlight, durationHighlight],
  );

  useLayoutEffect(() => {
    const doHashChange = function doHashChange() {
      const { hash } = window.location;
      if (hash) {
        const id = hash.slice(1);
        doHighlight(id);
      } else {
        if (elementId.current) {
          const previousElement = document.getElementById(elementId.current);
          if (previousElement)
            previousElement.classList.remove(classNameHighlight);
          elementId.current = null;
        }

        if (elementTimer.current) {
          clearTimeout(elementTimer.current);
          elementTimer.current = null;
        }
      }
    };

    doHashChange();

    window.addEventListener("hashchange", doHashChange);

    return () => {
      window.removeEventListener("hashchange", doHashChange);
      if (elementTimer.current) {
        clearTimeout(elementTimer.current);
        elementTimer.current = null;
      }
    };
  }, [doHighlight, classNameHighlight, pathname]);

  const jumpToPlusHighlight = useCallback(
    (id: string) => {
      if (window.location.hash === `#${id}`) doHighlight(id);
      else window.location.hash = id;
    },
    [doHighlight],
  );

  return {
    elementId,
    jumpToPlusHighlight,
  };
};
