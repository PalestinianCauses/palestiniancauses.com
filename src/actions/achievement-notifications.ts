"use server";

// REVIEWED

import { payload } from "@/lib/payload";

import { getAuthentication } from "./auth";
import { getUserAchievements } from "./user-achievements";

export const checkingPlusNotifyingAchievements =
  async function checkingPlusNotifyingAchievements(): Promise<
    Array<{ id: string; name: string; description: string }>
  > {
    const auth = await getAuthentication();

    if (!auth) return [];

    // Get user achievements
    const achievements = await getUserAchievements();

    // Get all existing notification records for this user
    const notificationsExisting = await payload.find({
      collection: "achievement-notifications",
      where: { user: { equals: auth.id } },
      depth: 0,
    });

    // Create a map of achievement ID to notification record
    const notificationMap = new Map(
      notificationsExisting.docs.map((n) => [n.achievement, n]),
    );

    // Find newly unlocked achievements that haven't been notified yet
    const achievementsNew = achievements.filter(
      (achievement) =>
        achievement.unlocked &&
        (!notificationMap.has(achievement.id) ||
          !notificationMap.get(achievement.id)?.notified),
    );

    // Update or create notification records for new achievements
    if (achievementsNew.length !== 0) {
      const now = new Date().toISOString();

      await Promise.all(
        achievementsNew.map(async (achievement) => {
          const existing = notificationMap.get(achievement.id);

          if (existing)
            await payload.update({
              collection: "achievement-notifications",
              id: existing.id,
              data: { notified: true, notifiedAt: now },
            });
          else
            await payload.create({
              collection: "achievement-notifications",
              data: {
                user: auth.id,
                achievement: achievement.id,
                notified: true,
                notifiedAt: now,
              },
            });
        }),
      );
    }

    return achievementsNew.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
    }));
  };
