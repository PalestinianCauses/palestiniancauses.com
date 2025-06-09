"use client";

// REVIEWED

import { useEffect, useState } from "react";

type MobileOS = "ios" | "android";
type MobileBrowser = "chrome" | "firefox" | "samsungbrowser" | "safari";

type UserAgentInfo =
  | { isRunningOnPWA: true }
  | { isRunningOnPWA: false; isMobile: false }
  | {
      isRunningOnPWA: false;
      isMobile: true;
      mobileOS: MobileOS;
      isMobileBrowserSupported: false;
    }
  | {
      isRunningOnPWA: false;
      isMobile: true;
      mobileOS: MobileOS;
      isMobileBrowserSupported: true;
      mobileBrowser: MobileBrowser;
    };

export const useUserAgentInfo = function useUserAgentInfo(): UserAgentInfo {
  const [userAgentInfo, setUserAgentInfo] = useState<UserAgentInfo>({
    isRunningOnPWA: true,
  });

  useEffect(() => {
    if (
      window.matchMedia("(display-mode: standalone)").matches ||
      window.navigator.standalone ||
      document.referrer.includes("android-app://")
    )
      return;

    const userAgent = window.navigator.userAgent.toLowerCase() || "";

    const isIOS = /iphone|ipad|ipod/i.test(userAgent);
    const isAndroid = /android|windows phone/i.test(userAgent);
    const isOS = (isIOS && "ios") || (isAndroid && "android") || null;

    if (!isOS) {
      setUserAgentInfo({ isRunningOnPWA: false, isMobile: false });
      return;
    }

    const browser = userAgent.match(/chrome|firefox|safari|samsungbrowser/i);

    if (
      !browser ||
      // This damn checking is just for TypeScript because I feel too lazy to figure out how to properly type Regular Expressions.
      (browser[0] !== "chrome" &&
        browser[0] !== "firefox" &&
        browser[0] !== "samsungbrowser" &&
        browser[0] !== "safari")
    ) {
      setUserAgentInfo({
        isRunningOnPWA: false,
        isMobile: true,
        mobileOS: isOS,
        isMobileBrowserSupported: false,
      });

      return;
    }

    setUserAgentInfo({
      isRunningOnPWA: false,
      isMobile: true,
      mobileOS: isOS,
      isMobileBrowserSupported: true,
      mobileBrowser: browser[0],
    });
  }, []);

  return userAgentInfo;
};
