"use server";

// REVIEWED

// Re-export from user-achievements to maintain compatibility
export { getUserAchievements as getPublicUserAchievements } from "./user-achievements";
export type { Achievement } from "./user-achievements";
