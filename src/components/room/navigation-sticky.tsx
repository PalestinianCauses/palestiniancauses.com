"use client";

// REVIEWED - 01

import { ChevronUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { HTMLAttributes, useEffect, useState } from "react";

import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import { useSectionObserver } from "@/hooks/use-section-observer";
import { cn } from "@/lib/utils/styles";

import { icons } from "../globals/sidebar/menu";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
}

interface NavigationStickyProps {
  items: NavigationItem[];
}

export const NavigationSticky = function NavigationSticky({
  items,
  className,
}: NavigationStickyProps & HTMLAttributes<HTMLElement>) {
  const { activeSection } = useSectionObserver({
    sectionIds: items.map((item) => item.id),
  });

  const { isVisible: isBackToTopVisible, scrollToTop } = useScrollToTop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    // Close menu when clicking out-side on mobile
    const handleOutSideClick = (event: MouseEvent) => {
      const { target } = event;

      if (
        isOpen &&
        target instanceof HTMLElement &&
        !target.closest("[data-navigation-sticky]") &&
        window.innerWidth < 768
      )
        setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutSideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutSideClick);
    }
  }, [isOpen]);

  if (items.length === 0) return null;

  return (
    <nav
      data-navigation-sticky
      className={cn(
        "fixed bottom-5 right-5 z-40 flex translate-y-2.5 flex-col gap-2.5 transition-all duration-500 ease-in-out",
        isScrolled
          ? "translate-y-0 opacity-100"
          : "pointer-events-none opacity-0",
        className,
      )}>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="h-10 w-10"
                onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? (
                  <X className="!size-5" />
                ) : (
                  <Menu className="!size-5" />
                )}
                <span className="sr-only">
                  {isOpen ? "Close Navigation" : "Open Navigation"}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isOpen ? "Close Navigation" : "Open Navigation"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Navigation Menu */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out lg:block",
          isOpen ? "block" : "hidden",
        )}>
        <ScrollArea className="max-h-[calc(100vh_-_12rem)] w-40 bg-background/75 p-0 shadow-sm ring-1 ring-input backdrop-blur-sm">
          <div className="flex flex-col items-stretch justify-start">
            {items.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = icons[item.label.toLowerCase()];
              return (
                <TooltipProvider key={item.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "h-auto justify-start gap-2.5 border-l-2 border-transparent px-5 py-2.5 text-left capitalize text-muted-foreground",
                          isActive &&
                            "border-foreground bg-foreground/5 text-foreground",
                        )}
                        onClick={() => {
                          // Close menu on mobile after selection
                          if (window.innerWidth < 768) setIsOpen(false);
                        }}
                        asChild>
                        <Link
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            const element = document.getElementById(item.id);
                            if (element)
                              element.scrollIntoView({ behavior: "smooth" });
                          }}>
                          <Icon />
                          {item.label}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="hidden md:block">
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Back to Top Button */}
      {isBackToTopVisible && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="h-10 w-10" onClick={scrollToTop}>
                <ChevronUp className="!size-5" />
                <span className="sr-only">Back to top</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="hidden md:block">
              <p>Back to top</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </nav>
  );
};
