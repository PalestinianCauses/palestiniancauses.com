// REVIEWED - 02

import { isDefined, isObject } from "@/lib/types/guards";
import { Product } from "@/payload-types";

import { DownloadingURL } from "./email-templates-product";

const generateAbsoluteURL = (url: string): string =>
  url.startsWith("http")
    ? url
    : [
        `${process.env.NEXT_PUBLIC_URL || "https://www.palestiniancauses.com"}`,
        `${url}`,
      ].join("");

export const createProductDownloadingURLs =
  function createProductDownloadingURLs(product: Product): DownloadingURL[] {
    if (
      product.type === "file" &&
      product.files &&
      product.files.length !== 0
    ) {
      return product.files
        .map((fileItem): DownloadingURL | null => {
          if (!isObject(fileItem.file) || !isDefined(fileItem.file.url))
            return null;

          return {
            title: fileItem.title,
            url: generateAbsoluteURL(fileItem.file.url),
            isFile: true,
            fileSize: fileItem.file.filesize || null,
          };
        })
        .filter((item): item is DownloadingURL => isDefined(item));
    }

    if (
      product.type === "external" &&
      product.links &&
      product.links.length !== 0
    ) {
      return product.links.map(
        (link): DownloadingURL => ({
          title: link.title,
          url: generateAbsoluteURL(link.url),
          isFile: link.isFile || false,
          fileSize: link.fileSize || null,
        }),
      );
    }

    return [];
  };
