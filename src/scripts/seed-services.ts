// REVIEWED - 01

import { getPayload } from "payload";

import { RoomsService } from "@/payload-types";

import config from "../payload.config";

const services: Omit<RoomsService, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "Fully-Stacked Web Application Development",
    description:
      "An end-to-end service for building complex, scalable, and secure web applications from the ground up. I handle everything from the front-end user experience to the back-end logic and database integration, turning your vision into a fully functional digital product.",
    status: "available",
    category: 1,
    skills: [
      { name: "PostgreSQL" },
      { name: "API Integration (REST)" },
      { name: "Node.JS" },
      { name: "Next.JS" },
      { name: "React.JS" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
    order: 0,
  },
  {
    name: "Front-End Development with Next.JS & React.JS",
    description:
      "I bring your user interface designs to life by building fast, interactive, and fully responsive front-ends. This service focuses on creating an exceptional user experience with clean, high-performance code using the most modern technologies.",
    status: "available",
    category: 1,
    skills: [
      { name: "Next.JS" },
      { name: "React.JS" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
    ],
    order: 1,
  },
  {
    name: "Back-End & API Development",
    description:
      "This is for when you need a robust and reliable engine behind your application. I design, build, and deploy robust back-end systems and custom REST APIs that are secure, efficient, and ready to connect with any front-end or third-party service.",
    status: "unavailable",
    category: 1,
    skills: [
      { name: "PostgreSQL" },
      { name: "API Integration (REST)" },
      { name: "Node.JS" },
      { name: "Next.JS" },
      { name: "TypeScript" },
    ],
    order: 2,
  },
  {
    name: "Headless CMS Integration",
    description:
      "I will integrate your Next.JS or React.JS application with a modern headless CMS (like PayLoad CMS, Strapi, or Sanity), giving you the power to manage your website's content easily while maintaining top-tier performance and security.",
    status: "available",
    category: 1,
    skills: [
      { name: "PayLoad CMS" },
      { name: "Strapi" },
      { name: "Sanity" },
      { name: "API Integration (REST)" },
      { name: "Next.JS" },
      { name: "React.JS" },
      { name: "TypeScript" },
    ],
    order: 3,
  },
  {
    name: "Website Performance Optimization",
    description:
      "Is your website slow? I will deeply analyze your application, identify performance bottlenecks, and implement advanced optimization techniques to dramatically improve load times, enhance user experience, and boost your SEO rankings.",
    status: "available",
    category: 1,
    skills: [
      { name: "Web Vitals" },
      { name: "Search Engine Optimization (SEO)" },
    ],
    order: 4,
  },
  {
    name: "Figma to Pixel-Perfect Code",
    description:
      "Provide me with your completed Figma designs, and I will translate them into a clean, responsive, and interactive web application. I ensure every detail is perfectly matched, delivering a final product that is both beautiful and functional.",
    status: "available",
    category: 1,
    skills: [
      { name: "Figma" },
      { name: "Next.JS" },
      { name: "React.JS" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "HTML/CSS" },
    ],
    order: 5,
  },
];

const doSeedingServices = async function doSeedingServices() {
  const payload = await getPayload({ config });

  try {
    console.log("🚀 Starting seeding services...");

    const existingServices = await payload.find({
      collection: "rooms-services",
      limit: 1,
    });

    if (existingServices.docs.length > 0) {
      console.log("❌ Services exist, skipping seeding.");
      return;
    }

    const servicesPromises = services.map((service) =>
      payload.create({
        collection: "rooms-services",
        data: service,
      }),
    );

    await Promise.all(servicesPromises);
    console.log("🎉 Services created successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding services failed:", error);
    console.error(
      error && typeof error === "object" && "data" in error && error?.data,
    );

    process.exit(1);
  }
};

doSeedingServices();
