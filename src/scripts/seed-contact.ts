// REVIEWED

import { payload } from "@/lib/payload";
import { RoomsContact } from "@/payload-types";

const contacts: Omit<
  RoomsContact,
  "id" | "user" | "createdAt" | "updatedAt"
>[] = [
  {
    type: "email",
    value: "shawqi@palestiniancauses.com",
    status: "active",
    order: 0,
  },
  {
    type: "whatsapp",
    value: "+972598182008",
    status: "active",
    primary: true,
    order: 1,
  },
  {
    type: "twitter",
    value: "shawqicauses",
    status: "active",
    order: 2,
  },
  {
    type: "instagram",
    value: "shawqicauses",
    status: "active",
    order: 3,
  },
  {
    type: "github",
    value: "shawqicauses",
    status: "active",
    order: 4,
  },
];

const doSeedingContact = async function doSeedingContact() {
  console.log("🚀 Starting seeding contact...");

  try {
    const existingContact = await payload.find({
      collection: "rooms-contact",
      limit: 1,
    });

    if (existingContact.docs.length > 0) {
      console.log("❌ Contact already exists, skipping seeding.");
      process.exit(1);
    }

    const user = await payload.findByID({
      collection: "users",
      id: 1,
    });

    const contactPromises = contacts.map((contact) =>
      payload.create({
        collection: "rooms-contact",
        data: { ...contact, user: user.id },
      }),
    );

    await Promise.all(contactPromises);
    console.log("🎉 Contact created successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding contact failed:", error);
    console.error(
      error && typeof error === "object" && "data" in error && error?.data,
    );

    process.exit(1);
  }
};

doSeedingContact();
