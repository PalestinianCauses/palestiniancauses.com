"use client";

// REVIEWED

import { ArrowLeftIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "../ui/button";

interface BackButtonProps {
  pathsExcluded?: string[];
  className?: string;
}

export const BackButton = function BackButton({
  pathsExcluded = ["/", "/instagram"],
  className = "fixed left-2.5 top-2.5 z-50",
}: BackButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleGoBack = useCallback(() => {
    if (canGoBack) router.back();
    else router.push("/");
  }, [router, canGoBack]);

  if (pathsExcluded.includes(pathname)) return null;

  return (
    <Button
      variant="outline"
      className={className}
      onClick={handleGoBack}
      aria-label="Go back">
      <ArrowLeftIcon className="mr-2 h-4 w-4" />
      <span>Go Back</span>
    </Button>
  );
};
