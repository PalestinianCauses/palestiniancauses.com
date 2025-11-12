// REVIEWED

import { RoomsContact, User } from "@/payload-types";

import { isDefined, isNumber, isObject } from "../types/guards";

import {
  createOrderTemplateEmail,
  createNotificationEmail as doCreateNotificationEmail,
  NotificationEmail,
  OptionsOrderTemplateEmail,
} from "./email-templates";

// Re-export for convenience
export type { NotificationEmail };

export const getContactMethod = (
  contacts: RoomsContact[] | undefined,
  method: "email" | "whatsapp",
): string | null => {
  if (!contacts || contacts.length === 0) return null;

  const contact = contacts.find(
    (c) => isObject(c) && c.type === method && c.status === "active",
  );

  if (!isDefined(contact) || isNumber(contact)) return null;
  return contact.value;
};

/**
 * Create an order notification email
 * @deprecated Use createOrderTemplateEmail and createNotificationEmail directly
 */
export const createOrderNotificationEmail = (
  orderData: OptionsOrderTemplateEmail,
  roomOwner: User,
): NotificationEmail | null => {
  if (orderData.itemType === "product") return null;

  const itemTypeLabel =
    orderData.itemType === "service" ? "Service" : "Package";
  const subject = `New ${itemTypeLabel} Order: ${orderData.itemName}`;

  const html = createOrderTemplateEmail({
    itemName: orderData.itemName,
    itemType: orderData.itemType,
    itemPrice: orderData.itemPrice,
    customerName: orderData.customerName,
    customerEmail: orderData.customerEmail,
    customerPhone: orderData.customerPhone,
    customerMessage: orderData.customerMessage,
  });

  const ownerEmail =
    typeof roomOwner.email === "string" ? roomOwner.email : null;

  return doCreateNotificationEmail(html, {
    to: ownerEmail || "hello@palestiniancauses.com",
    subject,
  });
};

export const createWhatsAppMessage = (
  orderData: OptionsOrderTemplateEmail,
): string | null => {
  if (orderData.itemType === "product") return null;

  const itemTypeLabel =
    orderData.itemType === "service" ? "Service" : "Package";

  let message = `*New ${itemTypeLabel} Order*\n\n`;
  message += `*${itemTypeLabel}:* ${orderData.itemName}\n`;

  if (orderData.itemPrice) message += `*Price:* ${orderData.itemPrice}\n`;

  message += `*Customer Name:* ${orderData.customerName}\n`;
  message += `*Customer Email:* ${orderData.customerEmail}\n`;

  if (orderData.customerPhone)
    message += `*Customer Phone:* ${orderData.customerPhone}\n`;

  if (orderData.customerMessage)
    message += `\n*Customer Message:*\n${orderData.customerMessage}`;

  return encodeURIComponent(message);
};

export const getWhatsAppURL = (
  phoneNumber: string,
  message: string,
): string => {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${message}`;
};
