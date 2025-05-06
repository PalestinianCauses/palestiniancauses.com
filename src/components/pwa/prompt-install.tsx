"use client";

// REVIEWED - 02

import {
  EllipsisVerticalIcon,
  MenuIcon,
  PlusIcon,
  PlusSquareIcon,
  ShareIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

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
let promptEvent: BeforePromptEventInstall | null = null;

// Helper function to check if app is currently running in standalone mode (PWA installed)
const isRunningPWA = function isRunningPWA() {
  // Check standard `display-mode` media query AND older `navigator.standalone` for iOS
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone ||
    document.referrer.includes("android-app://")
  );
};

const isAppleMobile = function isAppleMobile() {
  const userAgent = window.navigator.userAgent.toLowerCase() || "";
  return /iphone|ipad|ipod/.test(userAgent);
};

const isMobile = function isMobile() {
  const userAgent = window.navigator.userAgent.toLowerCase() || "";
  return /(android|blackberry|windows phone)/i.test(userAgent);
};

const isMobileBrowserSupported = function isMobileBrowserSupported() {
  const userAgent = window.navigator.userAgent.toLowerCase() || "";
  return /(chrome|firefox|samsungbrowser)/i.test(userAgent);
};

const isMobileUCBrowser = function isMobileUCBrowser() {
  const userAgent = window.navigator.userAgent.toLowerCase() || "";
  return /(ucbrowser)/i.test(userAgent);
};

const isMobileBrowserSamsung = function isMobileBrowserSamsung() {
  const userAgent = window.navigator.userAgent.toLowerCase() || "";
  return /samsungbrowser/i.test(userAgent);
};

export const PWAPromptInstall = function PWAPromptInstall() {
  /*
  Cases:
  - iOS iPhone or iPad mobile device: showing installing instructions from browser.
  - not iOS but mobile device: showing installing prompt from browser.
  - samsung browser but mobile device: showing browser changing instructions.
  - not browser supported but mobile device: showing browser changing instructions. 
  - not mobile device: not showing anything.
  */

  const [isOpen, setIsOpen] = useState(false);
  const [promptType, setPromptType] = useState<
    | "pwa-application"
    | "apple-mobile"
    | "not-mobile"
    | "not-mobile-browser-supported"
    | "mobile-browser-samsung"
    | "mobile-able-to-auto-install"
  >("apple-mobile");

  useEffect(() => {
    // 1. if application is running as PWA do not do or show anything.
    if (isRunningPWA()) return;

    if (isMobileUCBrowser()) {
      setPromptType("not-mobile-browser-supported");
      setIsOpen(true);
      return;
    }

    // 3. detecting device type and browser type.
    if (isAppleMobile()) {
      setPromptType("apple-mobile");
      setIsOpen(true);
      return;
    }

    if (!isMobile()) {
      setPromptType("not-mobile");
      return;
    }

    if (!isMobileBrowserSupported()) {
      setPromptType("not-mobile-browser-supported");
      setIsOpen(true);
      return;
    }

    if (isMobileBrowserSamsung()) {
      setPromptType("mobile-browser-samsung");
      setIsOpen(true);
      return;
    }

    setPromptType("mobile-able-to-auto-install");
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (promptType !== "mobile-able-to-auto-install") return;

    const handleBeforePromptInstall = function handleBeforePromptInstall(
      event: Event,
    ) {
      console.log("Firing before install prompt event.");

      event.preventDefault();

      promptEvent = event as BeforePromptEventInstall;

      setTimeout(() => {
        setIsOpen(true);
      }, 1000);
    };

    window.addEventListener("beforeinstallprompt", handleBeforePromptInstall);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforePromptInstall,
      );
    };
  }, [promptType]);

  const handleInstall = async function handleInstall() {
    if (promptType !== "mobile-able-to-auto-install") return;

    // When `promptEvent` is not available do not show prompt.
    if (!promptEvent) return;

    setIsOpen(false);

    promptEvent.prompt();
    const { outcome } = await promptEvent.userChoice;

    console.log(`User responded to install prompt with: ${outcome}`);

    promptEvent = null;
  };

  switch (promptType) {
    case "apple-mobile":
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom">
            <SheetHeader className="mb-8 space-y-2 text-left">
              <SheetTitle>
                Add PalestinianCauses to your iOS Home Screen!
              </SheetTitle>
              <SheetDescription>
                For a smoother experience, install PalestinianCauses directly on
                your iPhone or iPad. Here&apos;s how:
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="flex flex-col gap-2.5 sm:flex-col sm:justify-start sm:space-x-0 md:gap-4">
              <span className="flex w-full items-center justify-start gap-2.5">
                Tap <ShareIcon className="!h-6 w-6 shrink-0 stroke-[1.5]" />{" "}
                icon in your browser.
              </span>
              <span className="w-full">Scroll down and select:</span>{" "}
              <Button
                variant="outline"
                className="pointer-events-none w-full flex-col justify-start gap-2 whitespace-break-spaces px-8 py-3.5 text-left md:w-max md:gap-1.5 md:px-6 md:py-2.5">
                <span className="flex w-full items-center justify-start gap-2.5">
                  <PlusSquareIcon className="!h-6 !w-6 shrink-0 stroke-[1.5]" />{" "}
                  Add to Home Screen.
                </span>
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    case "not-mobile-browser-supported":
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom">
            <SheetHeader className="mb-8 space-y-2 text-left">
              <SheetTitle>Browser Not Supported</SheetTitle>
              <SheetDescription>
                For best experience, please use Chrome, Firefox, or Safari to
                install PalestinianCauses app.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="flex flex-col gap-2.5 sm:flex-col md:flex-row md:gap-0.5">
              <Button
                variant="outline"
                className="w-full gap-2 whitespace-break-spaces px-8 py-3.5 md:w-max md:gap-1.5 md:px-6 md:py-2.5"
                onClick={() => setIsOpen(false)}>
                Continue Browsing
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    case "mobile-browser-samsung":
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom">
            <SheetHeader className="mb-8 space-y-2 text-left">
              <SheetTitle>
                Install PalestinianCauses on your Samsung Device!
              </SheetTitle>
              <SheetDescription>
                Enjoy a more integrated experience by installing
                PalestinianCauses as an app.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="flex flex-col gap-2.5 sm:flex-col sm:justify-start sm:space-x-0 md:gap-4">
              <span className="flex w-full items-center justify-start gap-2.5">
                Find <EllipsisVerticalIcon className="!h-6 !w-6 shrink-0" /> or{" "}
                <MenuIcon className="!h-6 !w-6 shrink-0" /> icon in your
                browser.
              </span>
              <span className="flex w-full items-center justify-start gap-2.5">
                Tap <PlusIcon className="!h-6 !w-6 shrink-0" /> Add page to.
              </span>
              <span>Choose Home screen or Install as web app.</span>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    case "mobile-able-to-auto-install":
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="bottom">
            <SheetHeader className="mb-8 space-y-2 text-left">
              <SheetTitle>Install PalestinianCauses Now!</SheetTitle>
              <SheetDescription>
                Get quick access and a better experience with the
                PalestinianCauses app.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter className="flex flex-col gap-2.5 sm:flex-col md:flex-row md:gap-0.5">
              <Button
                variant="default"
                className="w-full gap-2 whitespace-break-spaces px-8 py-3.5 md:w-max md:gap-1.5 md:px-6 md:py-2.5"
                onClick={() => handleInstall()}>
                Install PalestinianCauses
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 whitespace-break-spaces px-8 py-3.5 md:w-max md:gap-1.5 md:px-6 md:py-2.5"
                onClick={() => setIsOpen(false)}>
                Continue Browsing
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      );
    default:
      return null;
  }
};
