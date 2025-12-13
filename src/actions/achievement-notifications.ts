"use server";

// REVIEWED - 05

import { messages } from "@/lib/messages";
import { actionSafeExecute } from "@/lib/network";
import { payload } from "@/lib/payload";
import { ResponseSafeExecute } from "@/lib/types";

import { getAuthentication } from "./auth";
import { getUserAchievements } from "./user-achievements";

export const checkingPlusNotifyingAchievements =
  async function checkingPlusNotifyingAchievements(): Promise<
    ResponseSafeExecute<
      Array<{ id: string; name: string; description: string }>
    >
  > {
    const auth = await getAuthentication();

    if (!auth) return { data: [], error: null };

    // Get user achievements
    const achievements = await getUserAchievements();

    // Get all existing notification records for this user
    const notificationsExisting = await actionSafeExecute(
      payload.find({
        req: { user: { ...auth, collection: "users" } },
        user: auth,
        collection: "achievement-notifications",
        where: { user: { equals: auth.id } },
        depth: 0,
        overrideAccess: false,
      }),
      messages.http.serverError,
    );

    if (!notificationsExisting.data || notificationsExisting.error)
      return { data: [], error: null };

    // Create a map of achievement ID to notification record
    const notificationMap = new Map(
      notificationsExisting.data.docs.map((n) => [n.achievement, n]),
    );

    // Find newly unlocked achievements that haven't been notified yet
    const achievementsNew = achievements.filter(
      (achievement) =>
        achievement.unlocked &&
        (!notificationMap.has(achievement.id) ||
          !notificationMap.get(achievement.id)?.notified),
    );

    // Update or create notification records for new achievements and create notifications
    if (achievementsNew.length !== 0) {
      const now = new Date().toISOString();

      const responses = await Promise.all(
        achievementsNew.map(async (achievement) => {
          const existing = notificationMap.get(achievement.id);

          // Update achievement notification record
          const notificationAchievementResponse = existing
            ? await actionSafeExecute(
                payload.update({
                  req: { user: { ...auth, collection: "users" } },
                  user: auth,
                  collection: "achievement-notifications",
                  id: existing.id,
                  data: { notified: true, notifiedAt: now },
                  overrideAccess: false,
                }),
                messages.http.serverError,
              )
            : await actionSafeExecute(
                payload.create({
                  req: { user: { ...auth, collection: "users" } },
                  user: auth,
                  collection: "achievement-notifications",
                  data: {
                    user: auth.id,
                    achievement: achievement.id,
                    notified: true,
                    notifiedAt: now,
                  },
                  overrideAccess: false,
                }),
                messages.http.serverError,
              );

          if (
            !notificationAchievementResponse.data ||
            notificationAchievementResponse.error
          )
            return notificationAchievementResponse;

          // Create notification in notifications collection
          const notificationResponse = await actionSafeExecute(
            payload.create({
              req: { user: { ...auth, collection: "users" } },
              user: auth,
              collection: "notifications",
              data: {
                user: auth.id,
                type: "achievement",
                title: "Achievement Attained! 🎉",
                message: `${achievement.name}: ${achievement.description}`,
                read: false,
              },
              overrideAccess: false,
            }),
            messages.http.serverError,
          );

          return notificationResponse;
        }),
      );

      if (responses.some((r) => !r.data || r.error))
        return {
          data: null,
          error: messages.http.serverError,
        };
    }

    return {
      data: achievementsNew.map((a) => ({
        id: a.id,
        name: a.name,
        description: a.description,
      })),
      error: null,
    };
  };
