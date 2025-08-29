// REVIEWED - 01

import type { Media } from "@/payload-types";

import { isDefined, isString } from "../types/guards";

export const isMediaObject = function isMediaObject(
  value: number | Media | null | undefined,
): value is Media & Required<Pick<Media, "url" | "sizes">> {
  return (
    typeof value === "object" &&
    isDefined(value) &&
    "id" in value &&
    "alt" in value &&
    "url" in value &&
    isString(value.url) &&
    "sizes" in value &&
    isDefined(value.sizes)
  );
};

export const isMediaPlusSizeObjects = function isMediaPlusSizeObjects<
  T extends keyof Required<NonNullable<Media["sizes"]>>,
>(
  value: number | Media | null | undefined,
  sizeKey: T,
): value is Media &
  Required<Pick<Media, "url" | "sizes">> & {
    sizes: {
      [K in T]-?: Required<NonNullable<Media["sizes"]>>[K] &
        Required<Pick<Required<NonNullable<Media["sizes"]>>[K], "url">>;
    } & Omit<NonNullable<Media["sizes"]>, T>;
  } {
  return (
    isMediaObject(value) &&
    isDefined(value.sizes[sizeKey]) &&
    isString(value.sizes[sizeKey].url)
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
  if (!isMediaObject(media)) return null;
  return media.url || null;
};

export const getMediaAltText = function getMediaAltText(
  media: number | Media | null | undefined,
): string | null {
  if (!isMediaObject(media)) return null;
  return media.alt;
};

export const getMediaSizeURL = function getMediaSizeURL(
  media: number | Media | null | undefined,
  sizeKey: keyof NonNullable<Media["sizes"]>,
): string | null {
  if (isMediaPlusSizeObjects(media, sizeKey)) {
    const size = media.sizes[sizeKey];
    if (size) return size.url || null;
  }

  return null;
};
