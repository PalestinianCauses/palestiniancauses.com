// REVIEWED - 01

import { getPayload } from "payload";

import { ServiceCategory } from "@/payload-types";

import config from "../payload.config";

const categories: Omit<ServiceCategory, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Consulting & Strategy",
    slug: "consulting-and-strategy",
    description:
      "A versatile category for advisory services. This can include technical consultations, content strategy sessions, or fitness assessments and planning.",
    status: "active",
    color: "red",
    system: true,
    order: 0,
  },
  {
    name: "Web & Software Development",
    slug: "web-and-software-development",
    description:
      "For all services related to creating, building, and engineering digital solutions, from websites and applications to custom software.",
    status: "active",
    color: "orange",
    system: true,
    order: 1,
  },
  {
    name: "Writing & Translation",
    slug: "writing-and-translation",
    description:
      "For services focused on crafting and adapting messages, including content creation, copy-writing, editing, proof-reading, and localization.",
    status: "active",
    color: "amber",
    system: true,
    order: 2,
  },
  {
    name: "Health & Fitness Coaching",
    slug: "health-and-fitness-coaching",
    description:
      "For personalized guidance and programming related to physical fitness, nutrition, and overall well-being.",
    status: "active",
    color: "yellow",
    system: true,
    order: 3,
  },

  {
    name: "Design & User Experience",
    slug: "design-and-user-experience",
    description:
      "For all visual and interactive design work, including UI/UX design, graphic design, and branding.",
    status: "active",
    color: "green",
    system: false,
    order: 4,
  },
  {
    name: "Technical Speaking & Training",
    slug: "technical-speaking-and-training",
    description:
      "For all services centered on education and knowledge sharing. This includes delivering technical conference talks, leading hands-on developer workshops, and providing bespoke corporate training sessions on modern web technologies.",
    status: "active",
    color: "teal",
    system: false,
    order: 5,
  },
];

const doSeedingCategories = async function doSeedingCategories() {
  const payload = await getPayload({ config });

  try {
    console.log("🚀 Starting seeding service categories...");

    const existingCategories = await payload.find({
      collection: "service-categories",
      limit: 1,
    });

    if (existingCategories.docs.length > 0) {
      console.log("❌ Categories exist, skipping seeding.");
      return;
    }

    const categoriesPromises = categories.map((category) =>
      payload.create({
        collection: "service-categories",
        data: category,
      }),
    );

    await Promise.all(categoriesPromises);
    console.log("🎉 Categories created successfully");
  } catch (error) {
    console.error("❌ Seeding categories failed:", error);
    console.error(
      error && typeof error === "object" && "data" in error && error?.data,
    );

    process.exit(1);
  }
};

doSeedingCategories();
