// REVIEWED - 08

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
      admin: { position: "sidebar" },
      name: "user",
      label: "Customer (User Account)",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
    },
    {
      admin: { position: "sidebar" },
      name: "roomOwner",
      label: "Room Owner",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: false,
    },
    {
      admin: { position: "sidebar" },
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
      },
      name: "customerPhone",
      label: "Customer Phone",
      type: "text",
      required: false,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.orderType !== "product",
      },
      name: "customerMessage",
      label: "Customer Message",
      type: "textarea",
      required: false,
    },
    {
      admin: {
        condition: (_, dataSibling) => dataSibling.orderType === "product",

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
      admin: { position: "sidebar" },
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
      admin: { position: "sidebar" },
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
      admin: {},
      name: "items",
      label: "Items",
      type: "array",
      required: true,
      fields: [
        {
          admin: {},
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
          },
          name: "product",
          label: "Product",
          type: "relationship",
          relationTo: "products",
          hasMany: false,
          required: false,
        },
        {
          admin: {},
          name: "quantity",
          label: "Quantity",
          type: "number",
          min: 1,
          defaultValue: 1,
        },
        {
          admin: {},
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

          console.log("Room Owner ID:", roomOwnerId);

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

          console.log("Room Response:", roomResponse);

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
                "service" in item
              ) {
                // Service might be a number (ID) or an object (populated)
                let serviceId: number | null = null;
                let serviceData: { name?: string } | null = null;

                if (isNumber(item.service)) serviceId = item.service;
                else if (isObject(item.service))
                  serviceData = { name: item.service.name };

                // if we only have an ID, fetch service
                if (serviceId && !serviceData) {
                  try {
                    const serviceFetched = await req.payload.findByID({
                      collection: "rooms-services",
                      id: serviceId,
                      depth: 0,
                    });

                    if (isObject(serviceFetched))
                      serviceData = { name: serviceFetched.name };
                  } catch {
                    // if fetch fails, continue with what we have
                  }
                }

                if (serviceData && "name" in serviceData) {
                  itemName = String(serviceData.name) || "Anonymous Service";
                  itemType = "service";
                  itemPrice = null;
                }
                // Skip if we can't get service data
                else return null;
              } else if (
                "itemType" in item &&
                item.itemType === "package" &&
                "package" in item
              ) {
                // Package might be a number (ID) or an object (populated)
                let packageId: number | null = null;
                let packageData: {
                  name?: string;
                  price?: number | null;
                } | null = null;

                if (isNumber(item.package)) packageId = item.package;
                else if (isObject(item.package)) {
                  packageData = {
                    name: item.package.name,
                    price: item.package.price,
                  };
                }

                // if we only have an ID, fetch package
                if (packageId && !packageData) {
                  try {
                    const packageFetched = await req.payload.findByID({
                      collection: "rooms-packages",
                      id: packageId,
                      depth: 0,
                    });

                    if (isObject(packageFetched))
                      packageData = {
                        name: packageFetched.name,
                        price: packageFetched.price,
                      };
                  } catch {
                    // if fetch fails, continue with what we have
                  }
                }

                if (packageData && "name" in packageData) {
                  itemName = String(packageData.name) || "Anonymous Package";
                  itemType = "package";
                  itemPrice =
                    "price" in item && isNumber(item.price)
                      ? item.price
                      : packageData.price || null;
                }
                // Skip if we can't get package data
                else return null;
              } else if ("itemType" in item && item.itemType === "product") {
                // Products are not supported for email notifications
                return null;
              }
              // Skip items without valid data
              else return null;

              const notificationData = {
                itemName,
                itemType,
                itemPrice: itemPrice && itemPrice > 0 ? itemPrice : null,
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
        } catch (error) {
          console.error("Error sending notifications:", error);
          // Don't fail order creation if notification fails
          // Error handling is intentionally silent to not interrupt order creation
        }
      },
    ],
  },
};
