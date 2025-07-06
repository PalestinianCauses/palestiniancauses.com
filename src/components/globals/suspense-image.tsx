"use client";

// REVIEWED - 01

import Image, { ImageProps } from "next/image";
import { ReactNode, useState } from "react";

import { cn } from "@/lib/utils/styles";

export const SuspenseImage = function SuspenseImage({
  isLoadingElement,
  containerClassName,
  className,
  onLoad,
  ...props
}: ImageProps & {
  isLoadingElement?: ReactNode;
  containerClassName?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden",
        containerClassName,
      )}>
      {isLoading && isLoadingElement}
      <Image
        {...props}
        className={cn(
          "transition-opacity duration-300 ease-in-out",
          { "pointer-events-none opacity-0": isLoading },
          className,
        )}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) onLoad(e);
        }}
      />
    </div>
  );
};
