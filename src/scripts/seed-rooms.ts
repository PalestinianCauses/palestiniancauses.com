#!/usr/bin/env node

// REVIEWED - 12

import dotenv from "dotenv";

import {
  PackagesHeadline,
  PackagesHeadlineSub,
  ServicesHeadline,
  ServicesHeadlineSub,
} from "@/collections/Rooms";
import {
  AboutHeadingsPlusParagraphs,
  AboutHeadlineSub,
} from "@/collections/rooms/fields/about";
import {
  EducationHeadline,
  EducationHeadlineSub,
} from "@/collections/rooms/fields/education";
import {
  ExperienceHeadline,
  ExperienceHeadlineSub,
} from "@/collections/rooms/fields/experience";
import {
  QualificationHeadline,
  QualificationHeadlineSub,
} from "@/collections/rooms/fields/qualification";
import {
  HeadlineSkill,
  HeadlineSubSkill,
} from "@/collections/rooms/fields/skill";
import { payload } from "@/lib/payload";
import { Room } from "@/payload-types";

dotenv.config();

const data: Omit<Room, "id" | "createdAt" | "updatedAt"> = {
  user: 1,
  name: "Shawqi",
  slug: "shawqi",
  status: "published",

  information: {
    name: "Shawqi Hatem",
    title: "Full-Stack Next.JS Developer",
    headline: "Deliver Scalable & User-Friendly Web Experiences.",
    status: "working",
  },

  about: {
    "headline-sub": AboutHeadlineSub,
    "headline": "Building Bridges Between the Real and the Digital Worlds.",

    "paragraphs": [
      {
        paragraph:
          "As a Next.JS Full-Stack developer, I design complete web solutions to turn ambitious ideas into scalable, user-focused web apps. My skill set ranges from building robust front-end experiences with React and Next.JS to constructing scalable back-end services using Node.JS. With a background in working with cross-disciplinary teams and managing projects, I have developed the ability to contextualize deliverables and deliver high-quality results in any setting.",
      },
      {
        paragraph:
          "My foundations are technical, but the calling is deeper. I founded PalestinianCauses, a digital-first organization that harnesses technology to amplify true stories and build global solidarity. This project is an inspiring demonstration of the positive social change that well-made digital platforms can bring. It is a point of inspiration and camaraderie for me and the community.",
      },
      {
        paragraph:
          "I take great interest in my projects and beyond. As an instructor, I am genuinely dedicated to helping the development community. I blog technical tips and write up guides and how-tos on various digital platforms, delivering a community-led, democratic way, where we all get together, learn, and share skill sets. I live where the tech, purpose, and community intersect is where I live. I am always searching for challenges that require technical craft and a real-world impact.",
      },
    ],

    "stats": {
      experience: {
        years: 7,
        heading: AboutHeadingsPlusParagraphs.experience.heading,
        description: AboutHeadingsPlusParagraphs.experience.description,
      },
      happyClients: {
        clients: 20,
        heading: AboutHeadingsPlusParagraphs.happyClients.heading,
        description: AboutHeadingsPlusParagraphs.happyClients.description,
      },
      milestonesAchieved: {
        milestones: 30,
        heading: AboutHeadingsPlusParagraphs.milestonesAchieved.heading,
        description: AboutHeadingsPlusParagraphs.milestonesAchieved.description,
      },
    },
  },

  education: {
    "headline-sub": EducationHeadlineSub,
    "headline": EducationHeadline,
    "list": [
      {
        institution: "University College of Applied Science",
        location: "Gaza, Palestine",
        degree: "Cyber Security Engineering",
        status: "dropped-out",
        dateStart: "2021-09-01",
        dateEnd: "2023-10-01",
        description:
          "I have had a path that is supported by an education and led by a passion for growth. I did two years of challenging studies in network security, cryptography, and defensive digital systems there. I was in the third year of my studies when the war in Gaza forced me to stop studying in October 2023. This reality forced me to take an alternate academic trajectory that, in turn, gave me a unique, security-first perspective that I bring to my day job as a developer.",
      },
      {
        institution: "University of Western Cape",
        location: "Cape Town, South Africa",
        degree: "Bachelor of Science in Computer Science",
        status: "in-progress",
        dateStart: "2025-02-01",
        description:
          "I am pursuing further academic pursuits with a focused dedication to the fundamental tenets of computer science, such as sophisticated algorithms, data structures, and software methodologies. This curriculum offers me the opportunity to expand the theory behind my work as a practical full-stack developer, so that I can help our team build even more complex and resilient digital projects.",
      },
    ],
  },

  experience: {
    "headline-sub": ExperienceHeadlineSub,
    "headline": ExperienceHeadline,
    "list": [
      {
        isCurrent: true,
        isRemote: true,
        type: "employment",
        company: "PalestinianCauses",
        location: "Cape Town, South Africa",
        position: "Founder, CEO, and CTO",
        dateStart: "2024-12-01",
        link: "https://palestiniancauses.com",
        description:
          "Launched in July 2024 and went digital-first in December 2024. I also manage the company's strategic direction (vision), CEO-led operations, and tech architecture. As CEO, I am the head of our team, guiding and working on project road maps, like 'A Human But from Gaza' and 'The Truth Museum.' And I lead our mission to amplify authentic narratives and build global solidarity. As CTO, I design and lead the creation of our full-stack digital platforms, using a modern tech stack focused on Next.JS and Node.JS to write resilient, maintainable, and beautiful user interfaces.",
      },
      {
        isCurrent: false,
        isRemote: true,
        type: "employment",
        company: "Act Hub",
        location: "Cape Town, South Africa",
        position: "Front-End and React.JS Instructor",
        dateStart: "2024-08-01",
        dateEnd: "2025-05-01",
        link: "https://actit.ps",
        description:
          "Developed and taught a curriculum to aspiring front-end developers. I taught a group of students the basics of HTML, CSS, and advanced JavaScript, specifically the React.JS ecosystem, and bridged the gap for wild success in the tech industry.",
      },
      {
        isCurrent: true,
        isRemote: false,
        type: "employment",
        company: "MikaByte",
        location: "Cape Town, South Africa",
        position: "Web Developer",
        dateStart: "2024-07-01",
        link: "https://mikabyte.com",
        description:
          "I build and support bespoke websites and web apps for various clients. I interpret business requirements into high-performance digital solutions, focusing on WordPress and the Oxygen website builder. I implement contemporary front-end techniques that deliver the best possible user experience.",
      },
      {
        isCurrent: false,
        isRemote: true,
        type: "employment",
        company: "OMQ",
        location: "Bahrain",
        position: "Front-End Developer",
        dateStart: "2020-11-01",
        dateEnd: "2024-11-01",
        link: "https://omq.solutions",
        description:
          "I've been working for 4 years doing good front-end development for many projects, catering to a worldwide client base from KSA, Bahrain, and India. I have a modern tech stack that mitigates with React.JS, Next.JS, HTML, CSS, and JavaScript to create responsive, adaptive, and dynamic user experiences, application features, and user interfaces to address a wealthy client's needs.",
      },
      {
        isCurrent: false,
        isRemote: false,
        type: "employment",
        company: "Five Pal",
        location: "Gaza, Palestine",
        position: "Front-End Developer",
        dateStart: "2022-09-01",
        dateEnd: "2023-10-01",
        link: "something",
        description:
          "Led all front-end development / built several complex projects, such as dynamic websites and data-driven dashboards. I painted complex UI/UX designs from Figma into pixel-perfect, responsive interfaces. Worked closely with the back-end team and used Git, GitHub, and Postman for version control and API Integration. I was also responsible for working on deployments and server-side setups with PHP/cPanel to ensure the project lifecycle runs smoothly and efficiently from start to finish.",
      },
      {
        isCurrent: false,
        isRemote: true,
        type: "employment",
        company: "ISSG",
        location: "Gaza, Palestine",
        position: "Front-End Developer",
        dateStart: "2023-02-01",
        dateEnd: "2023-10-01",
        link: "something",
        description:
          "I joined a high-throughput development shop as a remote employee (enterprise work on scale with the ability to work fully throughout my four years). This role also helped develop my knack for adapting to change as I was exposed to various technologies. I worked closely with a back-end team with a different stack. I mostly used ASP.NET, greatly expanding my knowledge of full-stack architecture and interpersonal communication across technologies. The fact that I can adapt to anything speaks volumes about my flexibility, resourcefulness, and self-assured approach when facing daunting challenges.",
      },
      {
        isCurrent: false,
        isRemote: false,
        type: "activity",
        organization:
          "The Administrative Control and Transparency Authority of Qatar, The United Nations, and Microsoft",
        location: "Doha, Qatar",
        title: "Winner of International Hackathon",
        position: "Front-End Developer",
        dateStart: "2023-08-01",
        dateEnd: "2023-09-01",
        link: "https://grace.unodc.org/grace/en/youth-empowerment/coding4integrity/qatar-youth-anti-corruption-hackathon-2023.html",
        description:
          'An elite technical competition and my first exposure outside of Gaza. I endured intense pressure, from a challenging online training course to a week-long high-stakes hackathon in Qatar. Despite the special personal and professional setup, our team cooperated to create a project for processing digital signatures and verifications. For our efforts, we were awarded from the hackathon: "Best Introduction Video" and "Best Online Team." It was a fantastic signal that speaks to our understanding of the global playing field, the skill to communicate there, and the results to prove it.',
      },
      {
        isCurrent: false,
        isRemote: false,
        type: "activity",
        organization: "Incubator of Talents & Geniuses, UCAS-TI",
        location: "Gaza, Palestine",
        title: "Winner in 1st place at Pioneers Of The Future Awards",
        position: "College Student",
        dateStart: "2023-02-01",
        dateEnd: "2023-03-01",
        link: "https://ps.linkedin.com/company/ucastiorg",
        description:
          "First place was obtained in this long and challenging all-day contest, in competition with over 150 students from various schools. The event was a grueling test of teamwork and solo ability that included group tasks centered on entrepreneurial vision and one-to-one interviews. I aced all tests, receiving a 99/100 on my final one — play, even under immense pressure, which was my strong suit in the game.",
      },
      {
        isCurrent: false,
        isRemote: false,
        type: "activity",
        organization: "Gaza Sky Geeks",
        location: "Gaza, Palestine",
        title: "Front-End Development Community Leader",
        position: "Community Leader and Mentor",
        dateStart: "2020-01-01",
        dateEnd: "2020-06-01",
        link: "https://www.facebook.com/GazaSkyGeeks/posts/today-were-having-demos-of-young-minds-club-at-south-tech-hub-were-amazed-by-the/2294520533961663",
        description:
          "At 16, I was given my first teaching job, which was quite challenging when I was younger than the other people training and many of my students. I also successfully managed and mentored a community of over 45 dedicated individuals for 90 hours and a Basic Web Development & Technical English syllabus. It was a great test of my skills and leadership to earn my place, gain respect, and effectively impart my knowledge in an environment that asks a lot of all riders.",
      },
    ],
  },

  qualification: {
    "headline-sub": QualificationHeadlineSub,
    "headline": QualificationHeadline,
    "list": [
      {
        title: "React Server Components",
        issuer: "Epic React by Kent C. Dodds",
        dateStart: "2025-06-01",
        dateEnd: "2025-06-01",
        link: "https://epicreact.dev",
      },
      {
        title: "React Performance",
        issuer: "Epic React by Kent C. Dodds",
        dateStart: "2025-06-01",
        dateEnd: "2025-06-01",
        link: "https://epicreact.dev",
      },
      {
        title: "Advanced React Patterns",
        issuer: "Epic React by Kent C. Dodds",
        dateStart: "2025-05-01",
        dateEnd: "2025-05-01",
        link: "https://epicreact.dev",
      },
      {
        title: "The Ultimate React Course 2023: React, Redux & More",
        issuer: "Udemy, by Jonas Schmedtmann",
        dateStart: "2023-06-01",
        dateEnd: "2023-07-01",
        link: "https://udemy.com/course/the-ultimate-react-course",
      },
      {
        title: "Vue - The Complete Guide (incl. Router & Composition API)",
        issuer: "Udemy, by Maximilian Schwarzmüller",
        dateStart: "2022-12-01",
        dateEnd: "2023-02-01",
        link: "https://udemy.com/course/vuejs-2-the-complete-guide",
      },
      {
        title: "Node, Express, MongoDB & More: The complete Boot-camp 2023",
        issuer: "Udemy, by Jonas Schmedtmann",
        dateStart: "2022-08-01",
        dateEnd: "2023-03-01",
        link: "https://udemy.com/course/nodejs-express-mongodb-bootcamp",
      },
      {
        title: "Understanding TypeScript",
        issuer: "Udemy, by Maximilian Schwarzmüller",
        dateStart: "2022-08-01",
        dateEnd: "2023-04-01",
        link: "https://udemy.com/course/understanding-typescript",
      },
      {
        title: "Advanced CSS and Sass: Flex-box, Grid, Animations, and More!",
        issuer: "Udemy, by Jonas Schmedtmann",
        dateStart: "2021-04-01",
        dateEnd: "2021-04-01",
        link: "https://udemy.com/course/advanced-css-and-sass",
      },
      {
        title: "The Complete JavaScript Course 2021: From Zero to Expert",
        issuer: "Udemy, by Jonas Schmedtmann",
        dateStart: "2021-02-01",
        dateEnd: "2021-03-01",
        link: "https://udemy.com/course/the-complete-javascript-course",
      },
      {
        title: "JavaScript Algorithms and Data Structures",
        issuer: "FreeCodeCamp",
        dateStart: "2021-01-01",
        dateEnd: "2021-02-01",
        link: "https://freecodecamp.org/learn/javascript-algorithms-and-data-structures",
      },
      {
        title: "Responsive Web Design",
        issuer: "FreeCodeCamp",
        dateStart: "2020-12-01",
        dateEnd: "2021-01-01",
        link: "https://freecodecamp.org/learn/responsive-web-design",
      },
    ],
  },

  skills: {
    "headline-sub": HeadlineSubSkill,
    "headline": HeadlineSkill,
    "list": [
      {
        category: "Front-End Development",
        skillsCategorized: [
          { name: "React.JS", level: "expert" },
          { name: "Vue.JS", level: "advanced" },
          { name: "TypeScript", level: "advanced" },
          { name: "JavaScript", level: "expert" },
          { name: "Tailwind CSS", level: "expert" },
          { name: "Bootstrap", level: "expert" },
          { name: "CSS 3 & SCSS/Sass", level: "expert" },
          { name: "HTML 5", level: "expert" },
        ],
      },
      {
        category: "Back-End Development",
        skillsCategorized: [
          { name: "Next.JS", level: "expert" },
          { name: "Node.JS", level: "advanced" },
          { name: "Express.JS", level: "advanced" },
          { name: "API Integration (REST)", level: "advanced" },
        ],
      },
      {
        category: "Databases",
        skillsCategorized: [
          { name: "MySQL", level: "intermediate" },
          { name: "MongoDB", level: "intermediate" },
        ],
      },
      {
        category: "Development Tools & DevOps",
        skillsCategorized: [
          { name: "Figma (for Developers)", level: "expert" },
          { name: "Git & GitHub", level: "expert" },
          { name: "Postman", level: "advanced" },
          { name: "WordPress & Oxygen Builder", level: "intermediate" },
          {
            name: "cPanel, Vercel, Netlify & Web Hosting",
            level: "intermediate",
          },
        ],
      },
      {
        category: "Leadership & Management",
        skillsCategorized: [
          { name: "Community Building", level: "advanced" },
          { name: "Leadership", level: "expert" },
          { name: "Mentorship & Teaching", level: "expert" },
          { name: "Instructional Design", level: "advanced" },
          { name: "Project Management", level: "advanced" },
          { name: "Strategic Planning", level: "advanced" },
          { name: "Public Speaking & Pitching", level: "advanced" },
        ],
      },
      {
        category: "Professional & Soft Skills",
        skillsCategorized: [
          { name: "Entrepreneurship", level: "advanced" },
          { name: "Cross-Functional Communication", level: "advanced" },
          { name: "Remote Collaboration", level: "expert" },
          { name: "Problem-Solving", level: "expert" },
          { name: "Adaptability", level: "expert" },
          { name: "Resilience", level: "expert" },
        ],
      },
      {
        category: "Languages",
        skillsCategorized: [
          { name: "Arabic", level: "expert" },
          { name: "English", level: "advanced" },
        ],
      },
    ],
  },

  services: {
    "headline": ServicesHeadline,
    "headline-sub": ServicesHeadlineSub,
  },

  packages: {
    "headline": PackagesHeadline,
    "headline-sub": PackagesHeadlineSub,
  },
};

const doSeedingShawqiRoom = async function doSeedingShawqiRoom() {
  try {
    console.log("🚀 Starting seeding Shawqi's room...");

    try {
      await payload.find({
        collection: "users",
        limit: 1,
      });

      console.log("✅ PayLoad connection successful");
    } catch (error) {
      console.log("❌ PayLoad connection failed:", error);
      process.exit(1);
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    const existingRoom = await payload.find({
      collection: "rooms",
      where: { slug: { equals: "shawqi" } },
      limit: 1,
    });

    if (existingRoom.docs.length !== 0) {
      console.log("❌ Room already exists, skipping seeding.");
      process.exit(0);
    }

    let servicesResponse;
    let packagesResponse;

    try {
      servicesResponse = await payload.find({
        collection: "rooms-services",
        limit: 100,
      });

      console.log(`📊 Found ${servicesResponse.docs.length} services`);
    } catch (error) {
      console.log(
        "❌ Error fetching services. Please run: pnpm run seed:services-plus-packages",
        error,
      );

      process.exit(1);
    }

    try {
      packagesResponse = await payload.find({
        collection: "rooms-packages",
        limit: 100,
      });

      console.log(`📊 Found ${packagesResponse.docs.length} packages`);
    } catch (error) {
      console.log(
        "❌ Error fetching packages. Please run: pnpm run seed:services-plus-packages",
        error,
      );

      process.exit(1);
    }

    if (!servicesResponse.docs.length) {
      console.log(
        "❌ No services found. Please run: pnpm run seed:services-plus-packages",
      );

      process.exit(1);
    }

    if (!packagesResponse.docs.length) {
      console.log(
        "❌ No packages found. Please run: pnpm run seed:services-plus-packages",
      );

      process.exit(1);
    }

    const serviceIds = servicesResponse.docs.map((service) =>
      Number(service.id),
    );

    const packageIds = packagesResponse.docs.map((packageElement) =>
      Number(packageElement.id),
    );

    console.log(
      `📊 Using ${serviceIds.length} services and ${packageIds.length} packages`,
    );

    console.log(`📊 Service IDs: ${serviceIds.join(", ")}`);
    console.log(`📊 Package IDs: ${packageIds.join(", ")}`);

    const roomSeedingData = {
      ...data,
      services: {
        "headline": data.services?.headline || ServicesHeadline,
        "headline-sub": data.services?.["headline-sub"] || ServicesHeadlineSub,
        "list": serviceIds,
      },
      packages: {
        "headline": data.packages?.headline || PackagesHeadline,
        "headline-sub": data.packages?.["headline-sub"] || PackagesHeadlineSub,
        "list": packageIds,
      },
    };

    await payload.create({
      collection: "rooms",
      data: roomSeedingData,
    });

    console.log(`🎉 Shawqi's room created successfully at /shawqi`);
    console.log(
      `📋 Connected ${serviceIds.length} services and ${packageIds.length} packages`,
    );

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding Shawqi's room failed:", error);
    console.error(
      error && typeof error === "object" && "data" in error && error?.data,
    );

    process.exit(1);
  }
};

doSeedingShawqiRoom();
