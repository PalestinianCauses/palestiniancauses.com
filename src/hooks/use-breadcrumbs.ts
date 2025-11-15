"use client";

// REVIEWED - 01

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface UseBreadcrumbs {
  href: string;
  label: string;
  isPageCurrent: boolean;
}

const segments: Record<string, string> = {
  // PalestinianCauses Main Pages
  "": "Home",
  "about-us": "About Us",
  "contact-us": "Contact Us",
  "support-us": "Support Us",
  "support": "Support Us",

  "signin": "Sign In",
  "signup": "Sign Up",

  "acceptable-use-policy": "Acceptable Use Policy",
  "cookie-policy": "Cookie Policy",
  "privacy-policy": "Privacy Policy",
  "returns-policy": "Returns Policy",
  "terms-of-service": "Terms of Service",

  // PalestinianCauses Main Projects
  "book": "A Human But From Gaza",
  "a-human-but-from-gaza": "A Human But From Gaza",

  "humans-but-from-gaza": "Humans But From Gaza",
  "share": "Share",

  // PalestinianCauses Rooms Features
  "rooms": "Rooms",

  "comment": "Comments",

  "g": "Gym Rat in Gaza",
  "crypto": "Crypto",

  "instagram": "Instagram",
};

const truncateText = (text: string, maximumLength: number = 32): string => {
  if (text.length <= maximumLength) return text;
  return `${text.slice(0, maximumLength - 3)}...`;
};

const getSegment = (
  segment: string,
  index: number,
  arraySegments: string[],
  documentTitle: string,
): string => {
  if (segments[segment]) return segments[segment];

  if (/^\d+$/.test(segment)) {
    const parentSegment = arraySegments[index - 1];

    if (parentSegment === "humans-but-from-gaza")
      return documentTitle || `Diary no. ${segment}`;

    if (parentSegment === "comment")
      return documentTitle || `Comment no. ${segment}`;

    return documentTitle || `Page no. ${segment}`;
  }

  if (documentTitle) return documentTitle;

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const useBreadcrumbs = (): UseBreadcrumbs[] => {
  const pathname = usePathname();
  const [documentTitle, setDocumentTitle] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateTitle = () => {
        const title = document.title.replace(
          " | PalestinianCauses Digital Agency",
          "",
        );
        setDocumentTitle(title);
      };

      updateTitle();

      const observer = new MutationObserver(() => {
        updateTitle();
      });

      observer.observe(document.querySelector("title") || document.head, {
        subtree: true,
        childList: true,
      });

      return () => observer.disconnect();
    }

    return () => {};
  }, [pathname]);

  return useMemo(() => {
    const routesSegments = pathname
      .replace(/^\//, "")
      .split("/")
      .filter(Boolean);

    const breadcrumbs: UseBreadcrumbs[] = [
      {
        href: "/",
        label: "Home",
        isPageCurrent: pathname === "/",
      },
    ];

    let href = "";

    routesSegments.forEach((segment, index) => {
      href += `/${segment}`;
      const isRouteLast = index === routesSegments.length - 1;

      const label = getSegment(segment, index, routesSegments, documentTitle);

      breadcrumbs.push({
        href,
        label: truncateText(label, 32),
        isPageCurrent: isRouteLast,
      });
    });

    return breadcrumbs;
  }, [pathname, documentTitle]);
};
