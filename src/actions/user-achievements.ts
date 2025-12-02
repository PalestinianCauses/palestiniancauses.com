"use server";

// REVIEWED - 04

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { isObject } from "@/lib/types/guards";
import { User } from "@/payload-types";

import { getAuthentication } from "./auth";
import { getUser } from "./user";

export type Achievement = {
  id: string;
  type: "comment" | "diary" | "order";
  name: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  target?: number;
  unlockedAt?: string;
};

export const getUserAchievements = async function getUserAchievements(
  userId?: number,
): Promise<Achievement[]> {
  let user: User;

  if (userId) {
    const userResponse = await getUser(userId);
    if (!userResponse.data || userResponse.error) return [];
    if (!userResponse.data.privacySettings.showAchievements) return [];
    user = userResponse.data;
  } else {
    const auth = await getAuthentication();
    if (!auth) return [];
    user = auth;
  }

  // Only get counts, not full stats to avoid duplicate queries
  const [commentsCount, diaryEntriesCount, ordersCount] = await Promise.all([
    actionSafeExecute(
      payload.count({
        ...(!userId
          ? {
              req: { user: { collection: "users", ...user } },
              user,
              overrideAccess: false,
            }
          : {}),
        collection: "comments",
        where: {
          user: { equals: user.id },
          status: { equals: "approved" },
        },
        depth: 0,
      }),
      messages.http.serverError,
    ),
    actionSafeExecute(
      payload.count({
        ...(!userId
          ? {
              req: { user: { collection: "users", ...user } },
              user,
              overrideAccess: false,
            }
          : {}),
        collection: "diary-entries",
        where: {
          author: { equals: user.id },
          status: { equals: "approved" },
          isAnonymous: { equals: false },
        },
        depth: 0,
      }),
      messages.http.serverError,
    ),
    actionSafeExecute(
      payload.count({
        ...(!userId
          ? {
              req: { user: { collection: "users", ...user } },
              user,
              overrideAccess: false,
            }
          : {}),
        collection: "orders",
        where: { user: { equals: user.id } },
        depth: 0,
      }),
      messages.http.serverError,
    ),
  ]);

  const comments = commentsCount.data ? commentsCount.data.totalDocs : 0;
  const diaryEntries = diaryEntriesCount.data
    ? diaryEntriesCount.data.totalDocs
    : 0;
  const orders = ordersCount.data ? ordersCount.data.totalDocs : 0;

  const achievements: Achievement[] = [
    {
      id: "diary-1",
      type: "diary",
      name: "The First Light",
      description:
        "In the darkness, your voice emerged. The first pixel of truth that pierced through silence, igniting a flame that will never be extinguished.",
      unlocked: diaryEntries >= 1,
      progress: diaryEntries >= 1 ? 1 : 0,
      target: 1,
    },
    {
      id: "diary-5",
      type: "diary",
      name: "Foundation Builder",
      description:
        "Five stories strong, you've laid the first stones. From rubble to foundation, pixel by pixel, you're building something that will stand the test of time.",
      unlocked: diaryEntries >= 5,
      progress: diaryEntries >= 5 ? 5 : diaryEntries,
      target: 5,
    },
    {
      id: "diary-10",
      type: "diary",
      name: "Weaver of Truth",
      description:
        "Ten stories woven together, each pixel a thread in the tapestry of Gaza's narrative. You're not just telling stories—you're preserving history itself.",
      unlocked: diaryEntries >= 10,
      progress: diaryEntries >= 10 ? 10 : diaryEntries,
      target: 10,
    },
    {
      id: "diary-25",
      type: "diary",
      name: "Architect of Hope",
      description:
        "Twenty-five stories strong, you've become an architect. From the ground up, you're reconstructing truth, building dreams, and creating hope where it was lost.",
      unlocked: diaryEntries >= 25,
      progress: diaryEntries,
      target: 25,
    },
    {
      id: "diary-50",
      type: "diary",
      name: "Guardian of Stories",
      description:
        "Fifty stories stand as your testament. You've become a guardian, a protector of Gaza's authentic voice. Your words are a shield, your stories a sanctuary for truth.",
      unlocked: diaryEntries >= 50,
      progress: diaryEntries >= 50 ? 50 : diaryEntries,
      target: 50,
    },
    {
      id: "diary-100",
      type: "diary",
      name: "Master Story Teller",
      description:
        "One hundred stories—a century of truth. You've mastered the ancient art of story-telling, preserving Gaza's soul for generations to come. Your legacy is eternal.",
      unlocked: diaryEntries >= 100,
      progress: diaryEntries >= 100 ? 100 : diaryEntries,
      target: 100,
    },
    {
      id: "comment-1",
      type: "comment",
      name: "First Connection",
      description:
        "The first brick laid, the first bridge built. Your words reached across the divide, creating a connection that proves solidarity knows no boundaries.",
      unlocked: comments >= 1,
      progress: comments >= 1 ? 1 : 0,
      target: 1,
    },
    {
      id: "comment-5",
      type: "comment",
      name: "Weaver of Connections",
      description:
        "Five threads woven, five hearts connected. You're creating a web of unity that spans borders, proving that compassion and solidarity can bridge any distance.",
      unlocked: comments >= 5,
      progress: comments >= 5 ? 5 : comments,
      target: 5,
    },
    {
      id: "comment-10",
      type: "comment",
      name: "Community Builder",
      description:
        "Ten comments strong, you've become a builder. Every word you share strengthens the foundation of a community built on empathy, understanding, and un-wavering support.",
      unlocked: comments >= 10,
      progress: comments >= 10 ? 10 : comments,
      target: 10,
    },
    {
      id: "comment-25",
      type: "comment",
      name: "Pillar of Strength",
      description:
        "Twenty-five pillars of support, each comment a testament to your strength. You stand firm, holding up the community with words that inspire, comfort, and unite.",
      unlocked: comments >= 25,
      progress: comments >= 25 ? 25 : comments,
      target: 25,
    },
    {
      id: "comment-50",
      type: "comment",
      name: "Beacon of Hope",
      description:
        "Fifty beacons of light, fifty messages of hope. In the darkest moments, your words shine brightest, guiding others toward solidarity, understanding, and un-wavering support.",
      unlocked: comments >= 50,
      progress: comments >= 50 ? 50 : comments,
      target: 50,
    },
    {
      id: "comment-100",
      type: "comment",
      name: "Master Connector",
      description:
        "One hundred connections forged, one hundred bridges built. You've mastered the art of bringing people together, weaving unity through every word, healing hearts with every message.",
      unlocked: comments >= 100,
      progress: comments >= 100 ? 100 : comments,
      target: 100,
    },
    {
      id: "book-order",
      type: "order",
      name: "Truth Bearer",
      description:
        "You carry Gaza's truth in your hands. 'A Human But From Gaza' is more than a book—it's a testament, a promise, and a commitment to keeping these stories alive forever.",
      unlocked: false,
      progress: 0,
      target: 1,
    },
  ];

  if (orders !== 0) {
    const userOrders = await payload.find({
      ...(!userId
        ? {
            req: { user: { collection: "users", ...user } },
            user,
            overrideAccess: false,
          }
        : {}),
      collection: "orders",
      where: {
        user: { equals: user.id },
        orderType: { equals: "product" },
      },
      depth: 2,
    });

    if (userOrders.docs.length > 0) {
      const orderBook = userOrders.docs.find(
        (order) =>
          order.orderType === "product" &&
          order.items.some(
            (item) =>
              item.itemType === "product" &&
              isObject(item.product) &&
              item.product.slug === "a-human-but-from-gaza",
          ),
      );

      if (orderBook) {
        const bookAchievement = achievements.find((a) => a.id === "book-order");

        if (bookAchievement) {
          bookAchievement.unlocked = true;
          bookAchievement.progress = 1;
          bookAchievement.unlockedAt = orderBook.createdAt;
        }
      }
    }
  }

  return achievements;
};
