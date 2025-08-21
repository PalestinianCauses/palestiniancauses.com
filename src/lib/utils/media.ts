// REVIEWED

import type { Media } from "@/payload-types";

export const isMediaObject = function isMediaObject(
  value: number | Media | null | undefined,
): value is Media {
  return (
    value !== null &&
    value !== undefined &&
    typeof value === "object" &&
    "id" in value &&
    "alt" in value &&
    "url" in value
  );
};

export const isMediaId = function isMediaId(
  value: number | Media | null | undefined,
): value is number {
  return typeof value === "number";
};

export const getMediaURL = function getMediaURL(
  media: number | Media | null | undefined,
): string | null {
  if (isMediaObject(media)) return media.url || null;
  return null;
};

export const getMediaAltText = function getMediaAltText(
  media: number | Media | null | undefined,
): string | null {
  if (isMediaObject(media)) return media.alt;
  return null;
};

export const getMediaSizeURL = function getMediaSizeURL(
  media: number | Media | null | undefined,
  sizeKey: keyof NonNullable<Media["sizes"]>,
): string | null {
  if (isMediaObject(media) && media.sizes && media.sizes[sizeKey]) {
    const size = media.sizes[sizeKey];
    if (size) return size.url || null;
  }

  return null;
};
