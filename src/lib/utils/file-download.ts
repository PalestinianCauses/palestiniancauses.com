// REVIEWED

export interface ProgressDownload {
  status: "downloading" | "completed" | "error";
  fileName: string;
  bytesTotal: number;
  bytesReceived: number;
  progress: number;
}

export interface OptionsDownload {
  url: string;
  fileName: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  onProgress?: (progress: ProgressDownload) => void;
}

const getExtensionFromMimeType = (mimeType: string): string => {
  const mimeMap: Record<string, string> = {
    "application/zip": ".zip",
    "application/pdf": ".pdf",
    "application/epub+zip": ".epub",
    "image/webp": ".webp",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
  };

  return (
    mimeMap[mimeType.toLowerCase()] ||
    mimeMap[mimeType.split(";")[0].toLowerCase()] ||
    ""
  );
};

const getExtensionFromURL = (url: string): string => {
  try {
    const { pathname } = new URL(url);
    const match = pathname.match(/\.([a-z0-9]+)$/i);
    return match ? `.${match[1]}` : "";
  } catch {
    return "";
  }
};

const ensureFileExtension = (
  fileName: string,
  mimeType: string,
  url: string,
): string => {
  const extension =
    getExtensionFromMimeType(mimeType) || getExtensionFromURL(url);

  if (extension && !fileName.toLowerCase().endsWith(extension.toLowerCase()))
    return `${fileName}${extension}`;

  return fileName;
};

export const downloadingFileWithProgress = async (
  options: OptionsDownload,
): Promise<void> => {
  const { url, fileName, onProgress } = options;

  onProgress?.({
    status: "downloading",
    fileName,
    bytesTotal: 0,
    bytesReceived: 0,
    progress: 0,
  });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "*/*" },
    });

    if (!response.ok)
      throw new Error(
        `We couldn't download the file using our platform's download method. Please check your connection and try again, or use the individual file links below to download via your browser.`,
      );

    const contentLength = response.headers.get("content-length");
    const contentType =
      response.headers.get("content-type") || "application/octet-stream";

    const bytesTotal = contentLength ? parseInt(contentLength, 10) : 0;

    if (!response.body)
      throw new Error(
        "We couldn't download the file using our platform's download method. Your browser may not support this feature. Please use the individual file links below to download via your browser instead.",
      );

    const reader = response.body.getReader();
    const chunks: ArrayBufferView<ArrayBuffer>[] = [];
    let bytesReceived = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // eslint-disable-next-line no-await-in-loop
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);

      bytesReceived += value.length;

      const progress = bytesTotal > 0 ? (bytesReceived / bytesTotal) * 100 : 0;

      onProgress?.({
        status: "downloading",
        fileName,
        bytesTotal,
        bytesReceived,
        progress: Math.min(progress, 100),
      });
    }

    const blob = new Blob(chunks, { type: contentType });
    const URLBlob = URL.createObjectURL(blob);

    const fileNameFinal = ensureFileExtension(fileName, contentType, url);

    const link = document.createElement("a");
    link.href = URLBlob;
    link.download = fileNameFinal;
    link.style.display = "none";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(URLBlob), 100);

    onProgress?.({
      status: "completed",
      fileName,
      bytesTotal,
      bytesReceived,
      progress: 100,
    });
  } catch (error) {
    onProgress?.({
      status: "error",
      fileName,
      bytesTotal: 0,
      bytesReceived: 0,
      progress: 0,
    });

    throw error;
  }
};
