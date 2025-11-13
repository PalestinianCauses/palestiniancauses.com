// REVIEWED - 07

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import { isDefined, isNumber, isObject, isString } from "@/lib/types/guards";
import { OptionsOrderTemplateEmail } from "@/lib/utils/email-templates";
import {
  createOrderNotificationEmail,
  createWhatsAppMessage,
  getContactMethod,
  getWhatsAppURL,
} from "@/lib/utils/notifications";
import { RoomsContact, User } from "@/payload-types";

export const Orders: CollectionConfig = {
  slug: "orders",
  access: {
    create: hasPermissionAccess({ resource: "orders", action: "create" }),
    read: ({ req }) =>
      hasPermissionAccess({ resource: "orders", action: "read" })({ req }) ||
      isSelf("user")({ req }) ||
      isSelf("roomOwner")({ req }),
    update: hasPermissionAccess({ resource: "orders", action: "update" }),
    delete: hasPermissionAccess({ resource: "orders", action: "delete" }),
  },
  admin: {
    hidden: ({ user }) =>
      !hasPermission(user as unknown as User, {
        resource: "orders.admin",
        action: "read",
      }),
    group: "Database",
    defaultColumns: [
      "id",
      "user",
      "roomOwner",
      "orderType",
      "customerName",
      "total",
      "status",
      "createdAt",
    ],
    useAsTitle: "id",
  },
  fields: [
    {
      admin: { readOnly: true, position: "sidebar" },
      name: "user",
      label: "Customer (User Account)",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      name: "roomOwner",
      label: "Room Owner",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: false,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      name: "orderType",
      label: "Order Type",
      type: "select",
      options: [
        { label: "Service", value: "service" },
        { label: "Package", value: "package" },
        { label: "Product", value: "product" },
      ],
      defaultValue: "product",
      required: true,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.orderType !== "product",
        readOnly: true,
      },
      name: "customerName",
      label: "Customer Name",
      type: "text",
      defaultValue: "N/A",
      required: true,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.orderType !== "product",
        readOnly: true,
      },
      name: "customerEmail",
      label: "Customer Email",
      type: "email",
      defaultValue: "N/A",
      required: true,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.orderType !== "product",
        readOnly: true,
      },
      name: "customerPhone",
      label: "Customer Phone",
      type: "text",
      required: false,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.orderType !== "product",
        readOnly: true,
      },
      name: "customerMessage",
      label: "Customer Message",
      type: "textarea",
      required: false,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.orderType === "product",
        readOnly: true,
        position: "sidebar",
      },
      name: "productOrderType",
      label: "Product Order Type (Free/Paid)",
      type: "select",
      options: [
        { label: "Free", value: "free" },
        { label: "Paid", value: "paid" },
      ],
      defaultValue: "free",
      required: false,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      name: "total",
      label: "Total",
      type: "number",
      min: 0,
      defaultValue: 0,
      required: true,
    },
    {
      admin: {
        condition: (_, dataSibling) =>
          dataSibling.orderType === "product" && dataSibling.type !== "free",
        readOnly: true,
        position: "sidebar",
      },
      name: "productOrderStatus",
      label: "Product Order Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
        { label: "Failed", value: "failed" },
        { label: "Refunded", value: "refunded" },
        { label: "N/A", value: "not-applicable" },
      ],
      defaultValue: "pending",
      required: false,
    },
    {
      admin: { readOnly: true, position: "sidebar" },
      name: "orderStatus",
      label: "Order Status",
      type: "select",
      options: [
        { label: "New", value: "new" },
        { label: "In Progress", value: "in-progress" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "N/A", value: "not-applicable" },
      ],
      defaultValue: "not-applicable",
      required: true,
    },
    {
      admin: { readOnly: true },
      name: "items",
      label: "Items",
      type: "array",
      required: true,
      fields: [
        {
          admin: { readOnly: true },
          name: "itemType",
          label: "Item Type",
          type: "select",
          options: [
            { label: "Service", value: "service" },
            { label: "Package", value: "package" },
            { label: "Product", value: "product" },
          ],
          defaultValue: "product",
          required: true,
        },
        {
          admin: {
            condition: (_, dataSibling) => dataSibling.itemType === "service",
            readOnly: true,
          },
          name: "service",
          label: "Service",
          type: "relationship",
          relationTo: "rooms-services",
          hasMany: false,
          required: false,
        },
        {
          admin: {
            condition: (_, dataSibling) => dataSibling.itemType === "package",
            readOnly: true,
          },
          name: "package",
          label: "Package",
          type: "relationship",
          relationTo: "rooms-packages",
          hasMany: false,
          required: false,
        },
        {
          admin: {
            condition: (_, dataSibling) => dataSibling.itemType === "product",
            readOnly: true,
          },
          name: "product",
          label: "Product",
          type: "relationship",
          relationTo: "products",
          hasMany: false,
          required: false,
        },
        {
          admin: { readOnly: true },
          name: "quantity",
          label: "Quantity",
          type: "number",
          min: 1,
          defaultValue: 1,
        },
        {
          admin: { readOnly: true },
          name: "price",
          label: "Price",
          type: "number",
          min: 0,
          defaultValue: 0,
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req, operation }) => {
        // Only send notifications for new orders
        if (operation !== "create") return;

        try {
          // Get room owner
          const roomOwnerId = isNumber(doc.roomOwner)
            ? doc.roomOwner
            : doc.roomOwner.id;

          if (!roomOwnerId) return;

          const roomOwner = await req.payload.findByID({
            collection: "users",
            id: roomOwnerId,
            depth: 1,
          });

          // Get room owner's contacts
          const roomResponse = await req.payload.find({
            collection: "rooms",
            where: { user: { equals: roomOwner.id } },
            limit: 1,
            depth: 2,
          });

          const contacts: RoomsContact[] = [];

          if (roomResponse.docs.length !== 0) {
            const room = roomResponse.docs[0];

            if (isDefined(room.contact))
              room.contact.forEach((contact) => {
                if (isNumber(contact)) return;
                contacts.push(contact);
              });
          }

          // Process all items in order
          if (!isDefined(doc.items) || doc.items.length === 0) return;

          const ownerEmail = isString(roomOwner.email) ? roomOwner.email : null;
          if (!ownerEmail) return;

          // Process each item and send notifications
          const itemsValid = doc.items.filter(isObject);
          const notificationPromises = itemsValid.map(
            async (
              item: NonNullable<(typeof doc.items)[number]>,
            ): Promise<OptionsOrderTemplateEmail | null> => {
              let itemName = "Anonymous Item";
              let itemType: OptionsOrderTemplateEmail["itemType"] = "product";
              let itemPrice: OptionsOrderTemplateEmail["itemPrice"] = null;

              // Extract item details based on type
              if (
                "itemType" in item &&
                item.itemType === "service" &&
                "service" in item &&
                isObject(item.service) &&
                "name" in item.service
              ) {
                itemName = String(item.service.name) || "Anonymous Service";
                itemType = "service";
                itemPrice =
                  "price" in item && isNumber(item.price) ? item.price : null;
              } else if (
                "itemType" in item &&
                item.itemType === "package" &&
                "package" in item &&
                isObject(item.package) &&
                "name" in item.package
              ) {
                itemName = String(item.package.name) || "Anonymous Package";
                itemType = "package";
                itemPrice =
                  "price" in item && isNumber(item.price) ? item.price : null;
              } else if ("itemType" in item && item.itemType === "product")
                // Products are not supported for email notifications
                return null;
              // Skip items without valid data
              else return null;

              const notificationData = {
                itemName,
                itemType,
                itemPrice,
                customerName: doc.customerName,
                customerEmail: doc.customerEmail,
                customerPhone: doc.customerPhone || undefined,
                customerMessage: doc.customerMessage || undefined,
              };

              // Send email notification for this item
              if (req.payload.sendEmail) {
                const notificationEmail = createOrderNotificationEmail(
                  notificationData,
                  roomOwner,
                );

                if (notificationEmail)
                  await req.payload.sendEmail({
                    to: notificationEmail.to,
                    subject: notificationEmail.subject,
                    html: notificationEmail.html,
                  });
              }

              // Generate WhatsApp message for this item
              if (contacts.length !== 0) {
                const whatsAppNumber = getContactMethod(contacts, "whatsapp");
                if (whatsAppNumber) {
                  const whatsAppMessage =
                    createWhatsAppMessage(notificationData);
                  if (whatsAppMessage) {
                    // WhatsApp URL generated (can be stored in order meta data if needed)
                    const whatsAppURL = getWhatsAppURL(
                      whatsAppNumber,
                      whatsAppMessage,
                    );

                    console.log(`WhatsApp URL for ${itemName}:`, whatsAppURL);
                  }
                }
              }

              return notificationData;
            },
          );

          // Wait for all notifications to be sent
          await Promise.all(notificationPromises);
        } catch {
          // Don't fail order creation if notification fails
          // Error handling is intentionally silent to not interrupt order creation
        }
      },
    ],
  },
};
