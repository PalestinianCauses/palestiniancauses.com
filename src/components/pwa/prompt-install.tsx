"use client";

// REVIEWED - 04

import {
  EllipsisVerticalIcon,
  MenuIcon,
  PlusIcon,
  ShareIcon,
  SmartphoneIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useUserAgentInfo } from "@/hooks/use-user-agent-info";

import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

export const PWAPromptInstall = function PWAPromptInstall() {
  const userAgentInfo = useUserAgentInfo();

  const [prompt, setPrompt] = useState<Event | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (userAgentInfo.isRunningOnPWA) return;

    if (!userAgentInfo.isMobile) return;

    if (
      userAgentInfo.isMobileBrowserSupported &&
      userAgentInfo.mobileOS === "android" &&
      userAgentInfo.mobileBrowser === "chrome"
    )
      return;

    setIsOpen(true);
  }, [userAgentInfo]);

  useEffect(() => {
    if (userAgentInfo.isRunningOnPWA) return;

    if (!userAgentInfo.isMobile) return;

    if (
      !userAgentInfo.isMobileBrowserSupported ||
      userAgentInfo.mobileOS !== "android" ||
      userAgentInfo.mobileBrowser !== "chrome"
    )
      return;

    const handleBeforePromptInstall = function handleBeforePromptInstall(
      event: Event,
    ) {
      console.log("Initializing before install prompt event.");

      event.preventDefault();
      setPrompt(event);

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
  }, [userAgentInfo]);

  if (userAgentInfo.isRunningOnPWA || !userAgentInfo.isMobile) return null;

  const handleInstall = async function handleInstall() {
    if (!prompt) return;

    setIsOpen(false);

    if ("prompt" in prompt && typeof prompt.prompt === "function")
      prompt.prompt();

    if (
      "userChoice" in prompt &&
      prompt.userChoice instanceof Promise &&
      "outcome" in (await prompt.userChoice) &&
      typeof (await prompt.userChoice).outcome === "string"
    ) {
      const { outcome } = await prompt.userChoice;
      console.log(`User responded to install prompt with: ${outcome}`);
    }

    setPrompt(null);
  };

  if (!userAgentInfo.isMobileBrowserSupported)
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom">
          <SheetHeader className="mb-8 text-left">
            <SheetTitle>Browser Not Supported 🙁</SheetTitle>
            <SheetDescription>
              Looks like your current browser does not fully support app
              installation. For the best experience, try Chrome, FireFox, or
              Safari!
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex-col sm:flex-col sm:justify-start">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}>
              Continue Browsing
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  if (userAgentInfo.mobileOS === "ios")
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom">
          <SheetHeader className="mb-8 text-left">
            <SheetTitle>
              Add PalestinianCauses to your iOS Home Screen! 🚀
            </SheetTitle>
            <SheetDescription>
              Enjoy a full-screen, native app-like experience on your iPhone or
              iPad in seconds! Here is how:
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex-col sm:flex-col sm:justify-start">
            <ul className="mb-8 flex flex-col gap-5">
              <li className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2.5 text-base font-medium tracking-normal">
                  <span className="font-mono text-sm font-normal text-muted-foreground">
                    1.
                  </span>
                  Tap the <ShareIcon className="h-5 w-5 stroke-[1.5]" /> icon.
                </h3>
                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  It is usually at the top or bottom of your screen.
                </p>
              </li>
              <li className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2.5 text-base font-medium tracking-normal">
                  <span className="font-mono text-sm font-normal text-muted-foreground">
                    2.
                  </span>
                  Tap <PlusIcon className="h-5 w-5 stroke-[1.5]" /> &quot;Add to
                  Home Screen&quot;.
                </h3>
                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  You might need to scroll down to find it.
                </p>
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}>
              Continue Browsing
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  if (userAgentInfo.mobileBrowser === "chrome")
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom">
          <SheetHeader className="mb-8 text-left">
            <SheetTitle>Install the PalestinianCauses App! 📲</SheetTitle>
            <SheetDescription>
              Get a full-screen, native app-like experience and stay updated on
              the go!
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex-col gap-2.5 sm:flex-col sm:justify-start">
            <Button
              variant="default"
              className="w-full"
              onClick={() => handleInstall()}>
              Install App
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}>
              Continue Browsing
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  if (userAgentInfo.mobileBrowser === "firefox")
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom">
          <SheetHeader className="mb-8 text-left">
            <SheetTitle>
              Add PalestinianCauses to your Home Screen! 🦊
            </SheetTitle>
            <SheetDescription>
              Enjoy a fast, native app-like experience directly from your home
              screen.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex-col sm:flex-col sm:justify-start">
            <ul className="mb-8 flex flex-col gap-5">
              <li className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2.5 text-base font-medium tracking-normal">
                  <span className="font-mono text-sm font-normal text-muted-foreground">
                    1.
                  </span>
                  Tap the{" "}
                  <EllipsisVerticalIcon className="h-5 w-5 stroke-[1.5]" />{" "}
                  icon.
                </h3>
                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  It is usually in the top right corner.
                </p>
              </li>
              <li className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2.5 text-base font-medium tracking-normal">
                  <span className="font-mono text-sm font-normal text-muted-foreground">
                    2.
                  </span>
                  Tap <SmartphoneIcon className="h-5 w-5 stroke-[1.5]" />{" "}
                  &quot;Install app&quot;.
                </h3>
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}>
              Continue Browsing
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );

  if (userAgentInfo.mobileBrowser === "samsungbrowser")
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom">
          <SheetHeader className="mb-8 text-left">
            <SheetTitle>
              Add PalestinianCauses to your Samsung Home Screen! 📱
            </SheetTitle>
            <SheetDescription>
              Get quick access and a full-screen, native app-like experience on
              your Samsung device.
            </SheetDescription>
          </SheetHeader>
          <SheetFooter className="flex-col sm:flex-col sm:justify-start">
            <ul className="mb-8 flex flex-col gap-5">
              <li className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2.5 text-base font-medium tracking-normal">
                  <span className="font-mono text-sm font-normal text-muted-foreground">
                    1.
                  </span>
                  Tap the{" "}
                  <EllipsisVerticalIcon className="h-5 w-5 stroke-[1.5]" /> or{" "}
                  <MenuIcon className="h-5 w-5 stroke-[1.5]" /> icon.
                </h3>
                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  It is usually at the top or bottom of your screen.
                </p>
              </li>
              <li className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2.5 text-base font-medium tracking-normal">
                  <span className="font-mono text-sm font-normal text-muted-foreground">
                    2.
                  </span>
                  Tap <PlusIcon className="h-5 w-5 stroke-[1.5]" /> &quot;Add
                  page to&quot;.
                </h3>
              </li>
              <li className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2.5 text-base font-medium tracking-normal">
                  <span className="font-mono text-sm font-normal text-muted-foreground">
                    3.
                  </span>
                  Select &quot;Install as web app&quot;.
                </h3>

                <p className="text-sm font-normal leading-relaxed text-muted-foreground">
                  In case you do not see it, or installation fails, choose
                  &ldquo;Add to Home screen&ldquo; instead.
                </p>
              </li>
            </ul>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsOpen(false)}>
              Continue Browsing
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
};
