// REVIEWED - 01

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { User } from "@/payload-types";

import { Achievement, unlockingAchievements } from "../achievements";

export const getUserAchievements = async function getUserAchievements(
  isPublicProfile: boolean,
  user: User,
): Promise<{
  achievementsGained: Achievement[];
  achievementsLocked: Achievement[];
}> {
  // Only get counts, not full stats to avoid duplicate queries
  const [commentsCount, diaryEntriesCount, ordersCount] = await Promise.all([
    actionSafeExecute(
      payload.count({
        ...(!isPublicProfile
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
        ...(!isPublicProfile
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
        ...(!isPublicProfile
          ? {
              req: { user: { collection: "users", ...user } },
              user,
              overrideAccess: false,
            }
          : {}),
        collection: "orders",
        where: {
          "user": { equals: user.id },
          "orderType": { equals: "product" },
          "and": [
            { productOrderType: { equals: "paid" } },
            { orderStatus: { equals: "completed" } },
            { productOrderStatus: { equals: "paid" } },
          ],
          "items.itemType": { equals: "product" },
          "items.product.slug": { equals: "a-human-but-from-gaza" },
        },
        depth: 0,
      }),
      messages.http.serverError,
    ),
  ]);

  const achievements = unlockingAchievements(
    commentsCount.data?.totalDocs || 0,
    diaryEntriesCount.data?.totalDocs || 0,
    ordersCount.data?.totalDocs || 0,
  );

  const achievementsGained = achievements?.filter((a) => a.unlocked) || [];
  const achievementsLocked = achievements?.filter((a) => !a.unlocked) || [];

  return {
    achievementsGained,
    achievementsLocked,
  };
};
