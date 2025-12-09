// REVIEWED - 01

import { createTemplateEmail } from "./email-templates";

export interface DownloadingURL {
  title: string;
  url: string;
  isFile?: boolean;
  fileSize?: number | null;
}

export const createProductDownloadingURLsEmail = (
  productTitle: string,
  downloadingURLs: DownloadingURL[],
): string => {
  const URLFields = downloadingURLs.map((link) => ({
    label: link.title,
    value: link.url,
    type: "link" as const,
  }));

  return createTemplateEmail({
    title: "Your Purchase is Confirmed!",
    titleSub: `Your download link(s) for "${productTitle}" is/are ready`,
    fields: [
      {
        label: "Product",
        value: productTitle,
        type: "text",
      },
      ...URLFields,
    ],
    footer:
      "We appreciate your valued support of PalestinianCauses! Please find your download link(s) above. Should you have any questions or require further assistance, our team is here to help—simply reach out to us at hello@palestiniancauses.com.<br>Thank you for choosing to make a difference.",
  });
};
