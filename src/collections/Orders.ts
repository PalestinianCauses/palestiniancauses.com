// REVIEWED - 06

import { CollectionConfig } from "payload";

import { hasPermissionAccess, isSelf } from "@/access/global";
import { hasPermission } from "@/lib/permissions";
import {
  createWhatsAppMessage,
  getContactMethod,
} from "@/lib/utils/notifications";
// import { createEmailNotification } from "@/lib/utils/notifications"; // Uncomment when email adapter is configured
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
          const roomOwnerId =
            typeof doc.roomOwner === "number"
              ? doc.roomOwner
              : doc.roomOwner?.id;
          if (!roomOwnerId) return;

          const roomOwner = await req.payload.findByID({
            collection: "users",
            id: roomOwnerId,
            depth: 1,
          });

          if (!roomOwner || typeof roomOwner === "number") return;

          // Get room owner's contacts
          const roomResponse = await req.payload.find({
            collection: "rooms",
            where: { user: { equals: roomOwnerId } },
            depth: 2,
            limit: 1,
          });

          let contacts: RoomsContact[] | undefined;
          if (roomResponse.docs.length > 0) {
            const room = roomResponse.docs[0];
            if (room.contact && Array.isArray(room.contact)) {
              contacts = room.contact as RoomsContact[];
            }
          }

          // Prepare notification data
          let itemName = "Unknown Item";
          if (doc.items && doc.items.length > 0) {
            const firstItem = doc.items[0];
            if (firstItem.itemType === "service") {
              itemName =
                typeof firstItem.service === "object" && firstItem.service
                  ? firstItem.service.name
                  : "Unknown Service";
            } else if (firstItem.itemType === "package") {
              itemName =
                typeof firstItem.package === "object" && firstItem.package
                  ? firstItem.package.name
                  : "Unknown Package";
            }
          }

          const notificationData = {
            customerName: doc.customerName,
            customerEmail: doc.customerEmail,
            customerPhone: doc.customerPhone || undefined,
            customerMessage: doc.customerMessage || undefined,
            itemName,
            itemType: doc.orderType as "service" | "package",
            itemPrice: doc.total > 0 ? doc.total : null,
          };

          // Send email notification
          // Note: Email adapter must be configured in payload.config.ts
          // For now, email sending is disabled until an email adapter is configured
          // Uncomment the following code once email adapter is set up:
          /*
          if (req.payload.email && typeof req.payload.email.sendEmail === 'function') {
            const emailData = createEmailNotification(
              notificationData,
              roomOwner as User,
            );
            await req.payload.email.sendEmail({
              to: emailData.to,
              subject: emailData.subject,
              html: emailData.html,
            });
          }
          */

          // WhatsApp notification is prepared but not sent automatically
          // The URL can be accessed via the order data if needed
          // TODO: Store WhatsApp URL in order metadata when needed
          if (contacts) {
            const whatsappNumber = getContactMethod(contacts, "whatsapp");
            if (whatsappNumber) {
              createWhatsAppMessage(notificationData);
              // WhatsApp URL can be generated here when needed:
              // getWhatsAppUrl(whatsappNumber, whatsappMessage);
            }
          }
        } catch {
          // Don't fail the order creation if notification fails
          // Error handling is intentionally silent to not interrupt order creation
        }
      },
    ],
  },
};
