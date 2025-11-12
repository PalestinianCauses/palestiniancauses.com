// REVIEWED
/**
 * Generic email template builder using Tailwind CSS-inspired design system
 * Note: Email clients don't support Tailwind CSS, so we use inline styles
 * that match Tailwind's design tokens and utility classes
 *
 */

import { Order } from "@/payload-types";

import { isDefined } from "../types/guards";

export type EmailTemplateData = Record<string, unknown>;

export interface EmailTemplateOptions {
  title: string;
  titleSub?: string;
  fields?: Array<{
    label: string;
    value: string | number | null | undefined;
    type?: "text" | "email" | "phone" | "price" | "message";
  }>;
  footer?: string;
  colorPrimary?: string;
  colorBackground?: string;
}

export const createTemplateEmail = (options: EmailTemplateOptions): string => {
  const { title, titleSub, fields = [], footer } = options;

  const rowsField = fields
    .filter((field) => isDefined(field.value))
    .map((field) => {
      let valueFormatted = String(field.value);

      // Format based on type
      if (field.type === "email" && field.value)
        valueFormatted = `<a href="mailto:${field.value}" style="color: #000000; text-decoration: none;">${field.value}</a>`;
      else if (field.type === "phone" && field.value)
        valueFormatted = `<a href="tel:${field.value}" style="color: #000000; text-decoration: none;">${field.value}</a>`;
      else if (field.type === "price" && field.value)
        valueFormatted = `$${field.value}`;
      else if (field.type === "message" && field.value)
        valueFormatted = field.value.toString().replace(/\n/g, "<br>");

      return `
      <tr>
        <td style="padding: 0.75rem 0; border-bottom: 0.0625rem solid #000000;">
            <div style="font-size: 0.75rem; font-weight: 600; color: #000000; margin-bottom: 0.25rem;">
                ${field.label}
            </div>
            <div style="font-size: 1rem; line-height: 1.5; color: #000000;">
            ${valueFormatted}
            </div>
        </td>
      </tr>
      `;
    })
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width = device-width, initial-scale = 1.0">
        <meta http-equiv="X-UA-Compatible" content="IE = edge">
        <title>${title}</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, Roboto, Arial, sans-serif; line-height: 1.6; padding: 0; margin: 0; color: #000000; background-color: #ffffff;">
        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #ffffff;">
            <tr>
                <td style="padding: 2.5rem 1.25rem;">
                    <table role="presentation" style="max-width: 37.5rem; background-color: #ffffff; border: 0.0625rem solid #000000; margin: 0 auto; box-shadow: 0 0.0625rem 0.25rem 0 rgba(0, 0, 0, 0.2);">
                        <!-- Header -->
                        <tr>
                            <td style="background-color: #000000; padding: 2rem 2rem 1.5rem;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; line-height: 1.2;">${title}</h1>
                                ${
                                  titleSub
                                    ? `<p style="font-size: 1rem; line-height: 1.5; color: #ffffff; margin: 0.5rem 0 0;">${titleSub}</p>`
                                    : ""
                                }
                            </td>
                        </tr>
                        <!-- Content -->
                        <tr>
                            <td style="padding: 2rem;">
                                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                ${
                                  rowsField ||
                                  `<tr><td style="padding: 0.75rem 0;"><p style="font-size: 0.875rem; color: #000000; margin: 0;">No additional information available.</p></td></tr>`
                                }
                                </table>
                            </td>
                        </tr>
                        <!-- Footer -->
                        ${
                          footer
                            ? `<tr><td style="background-color: #f8f8f8; padding: 1.5rem 2rem; border-top: 0.0625rem solid #000000; border-radius: 0 0 0.5rem 0.5rem;"><p style="font-size: 0.875rem; color: #a8a8a8; line-height: 1.5; margin: 0;">${footer}</p></td></tr>`
                            : ""
                        }
                    </table>
                    <!-- Email Footer -->
                    <table role="presentation" style="max-width: 37.5rem; margin: 1.5rem auto 0;">
                        <tr>
                            <td style="text-align: center; padding: 1rem 1.25rem;">
                                <p style="font-size: 0.75rem; line-height: 1.5; color: #a8a8a8;">
                                    This is an automated notification from PalestinianCauses. Please do not reply to this email.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
  </html>
  `;
};

export const createOrderTemplateEmail = (data: {
  itemName: string;
  itemType: Order["orderType"];
  itemPrice: Order["total"] | null;
  customerName: Order["customerName"];
  customerEmail: Order["customerEmail"];
  customerPhone?: Order["customerPhone"];
  customerMessage?: Order["customerMessage"];
}): string => {
  const itemTypeLabel =
    //   eslint-disable-next-line no-nested-ternary
    data.itemType === "service"
      ? "Service"
      : data.itemType === "package"
        ? "Package"
        : "Product";

  return createTemplateEmail({
    title: `New ${itemTypeLabel} Order`,
    titleSub: `You have received a new order for "${data.itemName}"`,
    fields: [
      { label: `${itemTypeLabel} Name`, value: data.itemName, type: "text" },
      ...(data.itemPrice
        ? [{ label: "Price", value: data.itemPrice, type: "price" as const }]
        : []),
      { label: "Customer Name", value: data.customerName, type: "text" },
      { label: "Customer Email", value: data.customerEmail, type: "email" },
      ...(data.customerPhone
        ? [
            {
              label: "Customer Phone",
              value: data.customerPhone,
              type: "phone" as const,
            },
          ]
        : []),
      ...(data.customerMessage
        ? [
            {
              label: "Customer Message",
              value: data.customerMessage,
              type: "message" as const,
            },
          ]
        : []),
    ],
    footer: `Please contact ${data.customerName} at ${data.customerEmail}${
      data.customerPhone ? ` or ${data.customerPhone}` : ""
    } to follow up on this order.`,
  });
};

export interface NotificationEmail {
  to: string;
  subject: string;
  html: string;
}

export const createNotificationEmail = (
  template: string,
  options: {
    to: string;
    subject: string;
  },
): NotificationEmail => ({
  to: options.to,
  subject: options.subject,
  html: template,
});
