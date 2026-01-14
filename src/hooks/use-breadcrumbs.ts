"use client";

// REVIEWED - 03

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
  "thank-you": "Thank You",

  "humans-but-from-gaza": "Humans But From Gaza",
  "share": "Share",

  // PalestinianCauses User Pages
  "users": "Users",
  "user": "User",
  "profile": "Profile",
  "activity": "Activity",
  "achievements": "Achievements",
  "notifications": "Notifications",
  "settings": "Settings",

  "comments": "Comments",
  "diary-entries": "Diary Entries",
  "orders": "Orders",

  // PalestinianCauses Rooms Features
  "rooms": "Rooms",

  "comment": "Comments",

  "g": "Gym Rat in Gaza",
  "crypto": "Crypto",

  "instagram": "Instagram",

  "verify-email": "Verify Email",
  "forgot-password": "Forgot Password",
  "reset-password": "Reset Password",
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
  isLastSegment: boolean,
): string | null => {
  // Handle numeric segments (IDs) - check if they're under user routes
  // For user/[id]/... routes, we want to show user's name even if it's not last segment
  if (/^\d+$/.test(segment) && !isLastSegment) {
    const parentSegment = arraySegments[index - 1];
    // For user/[id] routes, extract name from document title
    if (parentSegment === "user" || parentSegment === "users") {
      if (documentTitle) {
        // Extract name from "Shawqi's Profile" -> "Shawqi"
        const match = documentTitle.match(/^(.+?)'s Profile$/);
        if (match) return match[1];

        // if title doesn't match pattern, try to extract just name part
        return documentTitle;
      }

      return `User ${segment}`;
    }

    // For other routes, skip numeric segments that aren't last one
    return null;
  }

  // Skip token segments (long alphanumeric strings that are likely tokens)
  // These are typically used in routes like /reset-password/[token] or /verify-email/[token]
  const parentSegment = arraySegments[index - 1];

  if (
    isLastSegment &&
    (parentSegment === "verify-email" ||
      parentSegment === "forgot-password" ||
      parentSegment === "reset-password") &&
    segment.length > 20 &&
    /^[a-zA-Z0-9_-]+$/.test(segment)
  )
    return null; // Skip token segments

  // Use pre-defined segments if available
  if (segments[segment]) return segments[segment];

  // Handle numeric segments (IDs) - only for last segment
  if (/^\d+$/.test(segment) && isLastSegment) {
    // eslint-disable-next-line no-shadow
    const parentSegment = arraySegments[index - 1];

    if (parentSegment === "humans-but-from-gaza")
      // Extract just title, not full document title which might have extra info
      return documentTitle || `Diary no. ${segment}`;

    if (parentSegment === "comment")
      return documentTitle || `Comment no. ${segment}`;

    // For user/[id], extract name from document title if available
    if (parentSegment === "user" || parentSegment === "users") {
      if (documentTitle) {
        // Extract name from "Shawqi's Profile" -> "Shawqi"
        const match = documentTitle.match(/^(.+?)'s Profile$/);
        if (match) return match[1];

        // Or just return title if it doesn't match pattern
        return documentTitle;
      }

      return `User ${segment}`;
    }

    return documentTitle || `Page no. ${segment}`;
  }

  // Handle slug-based routes (non-numeric segments that might be slugs)
  // For rooms/[slug], use document title but clean it
  if (isLastSegment && arraySegments[index - 1] === "rooms") {
    if (documentTitle)
      // Remove " | [title]" pattern (e.g., "Shawqi Hatem | Software Engineer" -> "Shawqi Hatem")
      return documentTitle.replace(/\s*\|\s*.*$/, "");

    // Fall-back: format slug
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  // For non-numeric segments that are not last one, use formatted segment name
  if (!isLastSegment)
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  // For last segment, use document title if available, but clean it up
  // Only use document title if segment is not a pre-defined segment
  // (to avoid overriding child route names like "Activity", "Settings", etc.)
  if (documentTitle && isLastSegment && !segments[segment]) {
    // Check if document title matches parent segment label (to avoid duplication)
    const parentSegmentLabel =
      parentSegment && segments[parentSegment] ? segments[parentSegment] : null;
    if (parentSegmentLabel && documentTitle === parentSegmentLabel)
      // Document title matches parent, skip this segment to avoid duplication
      return null;

    // Remove common suffixes/prefixes that might duplicate parent segments
    let cleanTitle = documentTitle;

    // Remove " | [anything]" pattern (e.g., "Shawqi Hatem | Software Engineer" -> "Shawqi Hatem")
    cleanTitle = cleanTitle.replace(/\s*\|\s*.*$/, "");

    // For room titles, we might want to keep full name
    // But for user profiles, extract just name
    if (arraySegments[arraySegments.length - 2] === "user") {
      const match = cleanTitle.match(/^(.+?)'s Profile$/);
      // eslint-disable-next-line prefer-destructuring
      if (match) cleanTitle = match[1];
    }

    return cleanTitle;
  }

  // Fall-back: format segment name
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

      const label = getSegment(
        segment,
        index,
        routesSegments,
        documentTitle,
        isRouteLast,
      );

      if (label)
        breadcrumbs.push({
          href,
          label: truncateText(label, 32),
          isPageCurrent: isRouteLast,
        });
    });

    return breadcrumbs;
  }, [pathname, documentTitle]);
};
