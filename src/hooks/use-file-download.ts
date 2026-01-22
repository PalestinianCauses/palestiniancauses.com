"use client";

// REVIEWED

import { useCallback, useRef, useState } from "react";

import { messages } from "@/lib/messages";
import {
  downloadingFileWithProgress,
  ProgressDownload,
} from "@/lib/utils/file-download";

export interface UseFileDownloadingOptions {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  onSuccess?: (fileName: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  onError?: (fileName: string, error: Error) => void;
}

export const useFileDownload = (options?: UseFileDownloadingOptions) => {
  const [downloads, setDownloads] = useState<Map<string, ProgressDownload>>(
    new Map(),
  );

  const [isDownloading, setIsDownloading] = useState(false);
  const abortControllersRef = useRef<Map<string, AbortController>>(new Map());

  const updateProgress = useCallback(
    (fileKey: string, progress: ProgressDownload) => {
      setDownloads((previous) => {
        const newMap = new Map(previous);
        newMap.set(fileKey, progress);

        return newMap;
      });
    },
    [],
  );

  const download = useCallback(
    async (url: string, fileName: string): Promise<void> => {
      const fileKey = `${url}-${fileName}`;

      const existingController = abortControllersRef.current.get(fileKey);
      if (existingController) existingController.abort();

      const controller = new AbortController();
      abortControllersRef.current.set(fileKey, controller);

      try {
        setIsDownloading(true);

        await downloadingFileWithProgress({
          url,
          fileName,
          onProgress: (progress) => {
            updateProgress(fileKey, progress);
          },
        });

        options?.onSuccess?.(fileName);
      } catch (error) {
        const err =
          error instanceof Error
            ? error
            : new Error(messages.actions.product.download.errorMultiple);

        options?.onError?.(fileName, err);

        throw error;
      } finally {
        setIsDownloading(false);
        abortControllersRef.current.delete(fileKey);
      }
    },
    [options, updateProgress],
  );

  const downloadingMultiple = useCallback(
    async (files: Array<{ url: string; fileName: string }>): Promise<void> => {
      setIsDownloading(true);

      try {
        for (let i = 0; i < files.length; i += 1) {
          // eslint-disable-next-line no-await-in-loop
          await download(files[i].url, files[i].fileName);
        }
      } finally {
        setIsDownloading(false);
      }
    },
    [download],
  );

  const cancel = useCallback((url: string, filename: string) => {
    const fileKey = `${url}-${filename}`;
    const controller = abortControllersRef.current.get(fileKey);

    if (controller) {
      controller.abort();
      abortControllersRef.current.delete(fileKey);
    }
  }, []);

  const getProgress = useCallback(
    (url: string, filename: string): ProgressDownload | undefined => {
      const fileKey = `${url}-${filename}`;
      return downloads.get(fileKey);
    },
    [downloads],
  );

  const getEveryProgress = useCallback(
    (): ProgressDownload[] => Array.from(downloads.values()),
    [downloads],
  );

  const clearProgress = useCallback(() => {
    setDownloads(new Map());
  }, []);

  return {
    isDownloading,
    downloads: getEveryProgress(),
    download,
    downloadingMultiple,
    cancel,
    getProgress,
    getEveryProgress,
    clearProgress,
  };
};
