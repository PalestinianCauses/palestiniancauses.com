"use client";

// REVIEWED

import { DownloadIcon, PlusSquareIcon, ShareIcon } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface BeforePromptEventInstall extends Event {
  prompt(): Promise<void>;
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
}

// Store deferred prompt event globally or outside component state.
// so it persists across re-renders if needed.
let promptDeferred: BeforePromptEventInstall | null = null;

// Helper function to check if app is currently running in standalone mode (PWA installed)
const isRunningPWA = function isRunningPWA() {
  // Check standard `display-mode` media query AND older `navigator.standalone` for iOS
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone ||
    document.referrer.includes("android-app://")
  );
};

// Helper function to detect if device is likely an Apple device.
const isAppleDevice = function isAppleDevice() {
  // Note: User agent checks are not 100/100 fool-proof.
  // Basic: User agent check for iPhone, iPad, iPod.
  const userAgent = window.navigator.userAgent.toLowerCase() || "";
  return /iphone|ipad|ipod/.test(userAgent);
};

const isMobileDevice = function isMobileDevice() {
  const userAgent = window.navigator.userAgent.toLowerCase() || "";

  return /(android|webos|blackberry|windows phone|opera mini)/i.test(userAgent);
};

export const PWAPromptInstall = function PWAPromptInstall() {
  // State to control whether install UI is opened or not.
  const [isOpen, setIsOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // When app is already running as a PWA, no need to show install prompt.
    if (isRunningPWA()) {
      console.log("App is already installed (standalone mode).");
      setIsOpen(false);
      return;
    }

    // Detect if device is iOS or mobile.
    const appleDevice = isAppleDevice();
    const mobileDevice = isMobileDevice();
    setIsIOS(appleDevice);
    setIsMobile(mobileDevice);

    // For iOS devices, it can not use before install prompt.
    // Instead, just show instructional UI if it is iOS and not already a PWA.
    if (appleDevice) {
      console.log(
        "App is detected as an iOS device. Showing manual install instructions UI.",
      );

      setIsOpen(true);
    } else if (mobileDevice) {
      // For non-iOS devices (Android, Desktop w/ Compatible Browsers):
      // Listen for the standard before install prompt event.
      console.log("Listening for before install prompt event.");
      const handleBeforePromptInstall = function handleBeforePromptInstall(
        e: Event,
      ) {
        console.log("Firing before install prompt event.");

        // Prevent default browser prompt from appearing immediately.
        e.preventDefault();

        // Store event so it can be used later to trigger prompt.
        promptDeferred = e as BeforePromptEventInstall;
      };

      setIsOpen(true);
      window.addEventListener("beforeinstallprompt", handleBeforePromptInstall);

      // eslint-disable-next-line consistent-return
      return () => {
        console.log("Cleaning up before install prompt event listener.");
        window.removeEventListener(
          "beforeinstallprompt",
          handleBeforePromptInstall,
        );
      };
    }
  }, []);

  // Function to handle click event on custom install button.
  const handleInstall = async function handleInstall() {
    // When it is an iOS device, this button should not be visible based on render logic.
    // Having a safe guard just in case.
    if (isIOS) {
      console.log(
        "Install button clicked on iOS device. No need to show install prompt. This should ideally be hidden.",
      );

      return;
    }

    // When `promptDeferred` event is not available do not show prompt.
    if (!promptDeferred) {
      console.log(
        "`promptDeferred` is not available, can not show install prompt.",
      );

      return;
    }

    // Hide our custom UI before showing native browser prompt.
    setIsOpen(false);

    // Trigger native browser install prompt using stored event.
    promptDeferred.prompt();

    // Wait for user to respond to native prompt (accept or dismiss).
    const { outcome } = await promptDeferred.userChoice;

    // Log outcome of user's choice.
    console.log(`User response to install prompt: ${outcome}`);

    // Clear deferred prompt variable after it has been used.
    promptDeferred = null;

    // Optional: update state or perform actions based on outcome.
    // e.g. if outcome === 'accepted' installed successfully.
    // else outcome is 'dismissed' show prompt again later.
  };

  if ((!isIOS && !isMobile) || isRunningPWA()) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent side="bottom">
        <SheetHeader className="mb-5 text-left">
          <SheetTitle>
            {/* eslint-disable-next-line no-nested-ternary */}
            Install our app on your {isIOS
              ? "iOS"
              : isMobile
                ? "mobile"
                : null}{" "}
            device.
          </SheetTitle>
          <SheetDescription>
            Get a better experience by installing PalestinianCauses on your
            device.
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <div className="flex flex-col items-start justify-stretch gap-2.5">
            {/* eslint-disable-next-line no-nested-ternary */}
            {isIOS ? (
              <Fragment>
                <Button
                  variant="outline"
                  size="lg"
                  className="pointer-events-none w-full">
                  Click on <ShareIcon className="!h-5 !w-5" /> icon in your
                  browser.
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="pointer-events-none w-full">
                  Then click on <PlusSquareIcon className="!h-5 !w-5" /> add to
                  home page.
                </Button>
              </Fragment>
            ) : isMobile ? (
              <Fragment>
                <Button
                  variant="default"
                  size="lg"
                  onClick={() => handleInstall()}
                  className="w-full">
                  <DownloadIcon className="!h-5 !w-5" /> Install
                  PalestinianCauses
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setIsOpen(false)}
                  className="w-full">
                  I will do it later
                </Button>
              </Fragment>
            ) : null}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
