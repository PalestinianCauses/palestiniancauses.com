// REVIEWED - 01

import * as React from "react";

const MOBILE_BREAKPOINT = 1024;

export const useIsMobile = function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const queryMatch = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const onChange = function onChange() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    queryMatch.addEventListener("change", onChange);

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    return function cleanup() {
      queryMatch.removeEventListener("change", onChange);
    };
  }, []);

  return !!isMobile;
};
