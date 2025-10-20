// REVIEWED - 03

import { payload } from "@/lib/payload";
import { RoomsPackage, RoomsService } from "@/payload-types";

const services: Omit<RoomsService, "createdAt" | "updatedAt">[] = [
  {
    id: 0,
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
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
  {
    id: 6,
    name: "Technical Strategy & Consultation",
    description:
      "An advisory service for clients in the planning stage. I provide expert guidance on technology stack selection, application architecture, project road-mapping, and scalability to ensure your project is built on a solid foundation for future success.",
    status: "available",
    category: 0,
    skills: [
      { name: "Software Architecture" },
      { name: "Project Planning" },
      { name: "Full-Stack Development" },
    ],
    order: 6,
  },
];

const packages: Omit<RoomsPackage, "createdAt" | "updatedAt">[] = [
  {
    id: 0,
    name: "The Pattern Draft",
    description:
      "This is the essential first step before any code is written. A focused, 90-minute strategy session where we architect the blueprint for your project. We'll define the scope, choose the right technology, and create a clear roadmap to ensure your vision is built on a foundation of pure confidence.",
    audienceIntended:
      "Clients with a new idea who need a professional plan before committing to a whole project.",
    services: [],
    pricingType: "fixed",
    price: 250,
    currency: "USD",
    duration: "1-3 Business Days",
    features: [
      {
        feature:
          "A 90-Minute Deep-Dive Strategy Call to align on your vision and goals.",
      },
      {
        feature:
          "A Comprehensive Project Architecture Document outlining the technical structure.",
      },
      {
        feature:
          "A Clear, Actionable Technology Stack Recommendation tailored to your needs.",
      },
      {
        feature:
          "A High-Level Project Roadmap with estimated timelines and milestones.",
      },
    ],
    status: "available",
    order: 0,
  },
  {
    id: 1,
    name: "The Weaver's Counsel",
    description:
      "On-demand access to my expertise when you need it most. If you're stuck on a technical challenge, need a second opinion during development, or require high-level strategic advice on an ongoing project, you can book my time by the hour to get unstuck and move forward with clarity.",
    audienceIntended:
      "Clients or teams who need immediate, short-term expert help on an existing project.",
    services: [],
    pricingType: "hourly",
    price: 50,
    currency: "USD",
    features: [
      {
        feature:
          "Direct, 1-on-1 Access to my expertise for troubleshooting or strategic advice.",
      },
      {
        feature:
          "Actionable Solutions to your specific development or project challenges.",
      },
      {
        feature: "Detailed Time-Tracking and a summary of the session.",
      },
    ],
    status: "available",
    order: 1,
  },
  {
    id: 2,
    name: "The Foundation Stitch",
    description:
      'The essential starting point for a professional online presence. This package is for creating a strong, beautiful, and blazing-fast static website. It\'s your "digital business card," engineered to establish instant credibility and make a powerful first impression.',
    audienceIntended:
      "Portfolios, consultants, and small businesses needing a high-end informational website.",
    services: [],
    pricingType: "fixed",
    price: 2150,
    currency: "USD",
    duration: "2-3 Weeks",
    features: [
      {
        feature:
          "A Core Suite of up to 5 Custom-Built Pages to establish your online presence.",
      },
      {
        feature:
          "Pixel-Perfect, Responsive Development from your Figma designs.",
      },
      {
        feature:
          "Best-Practice SEO Foundations to ensure you are discoverable.",
      },
      {
        feature: "Elite Performance Optimization for near-instant load times.",
      },
      {
        feature: "Secure Deployment on a world-class global network.",
      },
    ],
    status: "available",
    order: 2,
  },
  {
    id: 3,
    name: "The Digital Stitch",
    description:
      "This is where we weave a living narrative. This package provides you with a dynamic, content-driven website built on a powerful Headless CMS. It gives you the freedom to manage your blog, portfolio, or case studies with total ease, without ever sacrificing performance.",
    audienceIntended:
      "Growing businesses, content creators, and professionals with a dynamic portfolio.",
    services: [],
    pricingType: "project",
    price: 3225,
    currency: "USD",
    duration: "5-6 Weeks",
    features: [
      {
        feature: 'All features from "The Foundation Stitch" package.',
      },
      {
        feature:
          "Empowerment through a Headless CMS (e.g., Payload, Strapi), giving you complete control.",
      },
      {
        feature:
          "Dynamic, Scalable Content Sections for your blog, case studies, or portfolio.",
      },
      {
        feature:
          "A Personalized 1-on-1 Training Session to master your new content workflow.",
      },
    ],
    status: "available",
    order: 3,
  },
  {
    id: 4,
    name: "The Merchant's Motif",
    description:
      "For when your website needs to be a marketplace. This package is specifically designed to build a beautiful, high-performance e-commerce store. I will weave together everything you need to sell your products online, from product pages to a secure checkout experience.",
    audienceIntended:
      "Businesses and individuals who want to sell products or services directly online.",
    services: [],
    pricingType: "project",
    price: 4850,
    currency: "USD",
    duration: "7-8 Weeks",
    features: [
      {
        feature: 'All features from "The Digital Stitch" package.',
      },
      {
        feature:
          "Full E-commerce Functionality including product listings, cart, and inventory.",
      },
      {
        feature: "Secure Payment Gateway Integration (e.g., Stripe, PayPal).",
      },
      {
        feature:
          "An Intuitive Dashboard for managing your orders and customers.",
      },
    ],
    status: "available",
    order: 4,
  },
  {
    id: 5,
    name: "The Logic Thread",
    description:
      'For visionary projects that require more than a beautiful surface. This is where we weave the intricate "logic thread"—the custom back-end, database, and APIs that power a bespoke web application. This is for building the robust, functional engine that runs your online business.',
    audienceIntended:
      "Startups and businesses requiring unique features like user accounts or custom dashboards.",
    services: [],
    pricingType: "project",
    price: 7275,
    currency: "USD",
    duration: "9+ Weeks",
    features: [
      {
        feature:
          "A fully bespoke, full-stack digital solution tailored to your exact needs.",
      },
      {
        feature:
          "Full-Stack Application Architecture designed for security and scale.",
      },
      {
        feature:
          "Bespoke Back-End and API Development to power your unique features.",
      },
      {
        feature:
          "Scalable Database Design to support your application's growth.",
      },
    ],
    status: "available",
    order: 5,
  },
  {
    id: 6,
    name: "The Artisan's Care",
    description:
      "This monthly retainer ensures your digital platform continues to evolve and perform at its peak. It provides you with a dedicated partner for support, new feature development, and proactive strategic guidance, protecting your investment for the long term.",
    audienceIntended:
      "Clients who have completed a project and want a long-term technical partner.",
    services: [],
    pricingType: "fixed",
    price: 420,
    currency: "USD",
    features: [
      {
        feature:
          "Up to 12 Hours of Priority Service per month for development and support.",
      },
      {
        feature: "Proactive Monitoring of your site's health and performance.",
      },
      {
        feature:
          "A Monthly Strategic Check-in Call to plan future improvements.",
      },
    ],
    status: "available",
    order: 6,
  },
];

const doSeedingServicesPlusPackages =
  async function doSeedingServicesPlusPackages() {
    try {
      console.log("🚀 Starting seeding services and packages...");

      const existingServices = await payload.find({
        collection: "rooms-services",
        limit: 1,
      });

      if (existingServices.docs.length > 0) {
        console.log("❌ Services exist, skipping seeding.");
        process.exit(0);
      }

      const servicesPromises = services.map((service) =>
        payload.create({
          collection: "rooms-services",
          data: service,
        }),
      );

      await Promise.all(servicesPromises);
      console.log("🎉 Services created successfully");

      const existingPackages = await payload.find({
        collection: "rooms-packages",
        limit: 1,
      });

      if (existingPackages.docs.length > 0) {
        console.log("❌ Packages exist, skipping seeding.");
        process.exit(0);
      }

      const packagesPromises = packages.map((packageElement) =>
        payload.create({
          collection: "rooms-packages",
          data: packageElement,
        }),
      );

      await Promise.all(packagesPromises);
      console.log("🎉 Packages created successfully");
      process.exit(0);
    } catch (error) {
      console.error("❌ Seeding services and packages failed:", error);
      console.error(
        error && typeof error === "object" && "data" in error && error?.data,
      );

      process.exit(1);
    }
  };

doSeedingServicesPlusPackages();
