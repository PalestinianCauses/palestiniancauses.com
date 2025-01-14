"use client";

// REVIEWED - 06
import { Fragment, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const polygon =
  "polygon(73% 51%, 91% 11%, 100% 46%, 97% 82%, 92% 84%, 75% 64%, 55% 47%, 46% 49%, 45% 62%, 50% 87%, 21% 64%, 0% 100%, 5% 51%, 21% 63%, 58% 0%, 73% 51%)";

export const HeroBackgroundPattern = function HeroBackgroundPattern() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });

      observer.disconnect();
    };
  }, []);

  const getPatternColors = () => {
    switch (activeSection) {
      case "hero":
        return "var(--secondary)";
      case "about":
        return "var(--secondary)";
      case "sneak-peak":
        return "var(--secondary)";
      case "early-reviews":
        return "var(--secondary)";
      case "pricing":
        return "var(--secondary)";
      case "footer":
        return "var(--secondary)";
      case "sneak-peak-01":
        return "var(--secondary)";
      case "sneak-peak-02":
        return "var(--secondary)";
      case "thanks":
        return "var(--secondary)";
      default:
        return "var(--secondary)";
    }
  };

  return (
    <Fragment>
      <svg
        aria-hidden="true"
        className="fixed inset-0 -z-10 size-full stroke-foreground/10 [mask-image:radial-gradient(100%_100%_at_top_right,_white,_transparent)]">
        <defs>
          <pattern
            id="hero-background-pattern"
            x="50%"
            y={-1}
            width={200}
            height={200}
            patternUnits="userSpaceOnUse">
            <path fill="none" d="M.5 200V.5H200" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-border/20">
          <path
            strokeWidth={0}
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
          />
        </svg>
        <rect
          fill="url(#hero-background-pattern)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
      <div
        aria-hidden="true"
        className="fixed left-[calc(50%_-_4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%_-_18rem)] lg:left-48 lg:top-[calc(50%_-_30rem)] xl:left-[calc(50%_-_24rem)]">
        <div
          className={cn(
            "aspect-[1108/632] w-[69.25rem] transition-all duration-500 ease-in-out",
          )}
          style={{
            background: `rgb(${getPatternColors()})`,
            clipPath: polygon,
          }}
        />
        <div
          className={cn(
            "absolute left-0 top-0 aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-background/10 via-background/90 to-background/50 transition-all duration-500 ease-in-out",
          )}
          style={{ clipPath: polygon }}
        />
      </div>
    </Fragment>
  );
};
