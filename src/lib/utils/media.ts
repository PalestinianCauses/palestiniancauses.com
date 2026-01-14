// REVIEWED - 02

import type { MediaPublic } from "@/payload-types";

import { isDefined, isString } from "../types/guards";

export const isMediaObject = function isMediaObject(
  value: number | MediaPublic | null | undefined,
): value is MediaPublic & Required<Pick<MediaPublic, "url" | "sizes">> {
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
  T extends keyof Required<NonNullable<MediaPublic["sizes"]>>,
>(
  value: number | MediaPublic | null | undefined,
  sizeKey: T,
): value is MediaPublic &
  Required<Pick<MediaPublic, "url" | "sizes">> & {
    sizes: {
      [K in T]-?: Required<NonNullable<MediaPublic["sizes"]>>[K] &
        Required<Pick<Required<NonNullable<MediaPublic["sizes"]>>[K], "url">>;
    } & Omit<NonNullable<MediaPublic["sizes"]>, T>;
  } {
  return (
    isMediaObject(value) &&
    isDefined(value.sizes[sizeKey]) &&
    isString(value.sizes[sizeKey].url)
  );
};

export const isMediaId = function isMediaId(
  value: number | MediaPublic | null | undefined,
): value is number {
  return typeof value === "number";
};

export const getMediaURL = function getMediaURL(
  media: number | MediaPublic | null | undefined,
): string | null {
  if (!isMediaObject(media)) return null;
  return media.url || null;
};

export const getMediaAltText = function getMediaAltText(
  media: number | MediaPublic | null | undefined,
): string | null {
  if (!isMediaObject(media)) return null;
  return media.alt;
};

export const getMediaSizeURL = function getMediaSizeURL(
  media: number | MediaPublic | null | undefined,
  sizeKey: keyof NonNullable<MediaPublic["sizes"]>,
): string | null {
  if (isMediaPlusSizeObjects(media, sizeKey)) {
    const size = media.sizes[sizeKey];
    if (size) return size.url || null;
  }

  return null;
};
