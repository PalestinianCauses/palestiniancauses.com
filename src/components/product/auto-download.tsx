"use client";

// REVIEWED

import { DownloadIcon, InfoIcon, Loader2Icon } from "lucide-react";
import { Fragment } from "react";
import { toast } from "sonner";

import { useFileDownload } from "@/hooks/use-file-download";
import { messages } from "@/lib/messages";
import { DownloadingURL } from "@/lib/utils/email-templates-product";
import { ProgressDownload } from "@/lib/utils/file-download";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";

interface AutoDownloadProps {
  downloadingURLs: DownloadingURL[];
}

export const AutoDownload = function AutoDownload({
  downloadingURLs,
}: AutoDownloadProps) {
  const downloadableFiles = downloadingURLs.filter(
    (link) => link.isFile === true,
  );

  const {
    isDownloading,
    downloadingMultiple,
    getEveryProgress,
    clearProgress,
  } = useFileDownload({
    onSuccess: (fileName) => {
      toast.success(messages.actions.product.download.success(fileName));
    },
    onError: (fileName) => {
      toast.error(messages.actions.product.download.error(fileName));
    },
  });

  const doDownloadingMultiple = async () => {
    if (isDownloading) return;

    clearProgress();

    const files = downloadableFiles.map((file) => ({
      url: file.url,
      fileName: file.title || "download",
    }));

    try {
      await downloadingMultiple(files);

      toast.success(
        messages.actions.product.download.successMultiple(
          downloadableFiles.length,
        ),
      );
    } catch {
      // Error handling is done in the hook's onError call-back
    }
  };

  if (downloadingURLs.length === 0 || downloadableFiles.length === 0)
    return null;

  const fileCount = downloadableFiles.length;
  const fileText = fileCount === 1 ? "file" : "files";

  const progressEntries = getEveryProgress();

  const everyCompleted =
    progressEntries.length > 0 &&
    progressEntries.every((p) => p.status === "completed");

  const getProgressStatus = (status: ProgressDownload["status"]): string => {
    switch (status) {
      case "completed":
        return "✓ Complete";
      case "error":
        return "✗ Failed";
      default:
        return `${Math.round(progressEntries.find((p) => p.status === status)?.progress || 0)}%`;
    }
  };

  return (
    <Card className="w-full border-blue-900/10 bg-blue-900/10">
      <CardHeader className="p-5">
        <CardTitle className="flex items-center gap-2.5 capitalize">
          <InfoIcon className="size-5 text-blue-500" />
          Download your {fileText}
        </CardTitle>
        <CardDescription>
          Your {fileText} {fileCount === 1 ? "is" : "are"} ready to download.
          Choose how you&apos;d like to download{" "}
          {fileCount === 1 ? "it" : "them"} below.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 p-5 pt-0">
        <div className="space-y-2.5 border border-blue-500/10 bg-background/90 p-2.5">
          <div className="space-y-2.5">
            <div className="flex flex-col items-start justify-start gap-2.5 sm:flex-row sm:items-center">
              <span className="bg-blue-500 px-2.5 py-0.5 text-xs font-bold uppercase tracking-widest text-blue-900">
                Recommended
              </span>
              <h3 className="text-base font-semibold leading-relaxed text-foreground">
                Download All Files at Once (Managed by Our Platform)
              </h3>
            </div>
            <p className="text-base font-normal leading-relaxed text-muted-foreground">
              Download all your files with one click. Our platform will manage
              the downloads and show you the progress for each file right here
              on this page. No new tabs will open—everything happens on this
              page.
            </p>
          </div>

          {progressEntries.length !== 0 && (
            <div className="space-y-2.5 px-2.5 py-2.5">
              {progressEntries.map((progress) => (
                <div key={progress.fileName} className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2.5 text-base leading-relaxed">
                    <span className="truncate font-medium text-foreground">
                      {progress.fileName}
                    </span>
                    <span className="shrink-0 text-muted-foreground">
                      {getProgressStatus(progress.status)}
                    </span>
                  </div>
                  {progress.status === "downloading" && (
                    <Progress
                      value={progress.progress}
                      className="h-1.5 rounded-none"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <Button
            disabled={isDownloading}
            onClick={doDownloadingMultiple}
            className="w-full bg-blue-700 capitalize text-blue-100 hover:bg-blue-900">
            {isDownloading ? (
              <Fragment>
                <Loader2Icon className="animate-spin" />
                Downloading {fileText}...
              </Fragment>
            ) : (
              <Fragment>
                <DownloadIcon />
                Download All {fileText}
              </Fragment>
            )}
          </Button>
        </div>

        {everyCompleted && (
          <div className="border border-blue-500/10 bg-background/90 p-2.5 text-center text-base font-medium leading-relaxed text-foreground">
            ✓ All files have been downloaded successfully!
          </div>
        )}

        <p className="text-base font-normal leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">
            Prefer to download files individually?
          </span>{" "}
          Use the individual file links in the section below. Each link will
          open the file in a new browser tab. Depending on the file type and
          your browser settings, it may preview the file (like images or PDFs)
          or download it automatically. In case it previews, you can download it
          manually from the preview page.
        </p>
      </CardContent>
    </Card>
  );
};
