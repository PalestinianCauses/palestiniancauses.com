"use client";

// REVIEWED - 02

import { useMemo } from "react";

import { User } from "@/payload-types";

export const useProfileCompletion = function useProfileCompletion({
  user,
}: {
  user: User;
}) {
  const { completion, suggestions } = useMemo(() => {
    if (!user) return { completion: 0, suggestions: [] };

    const checks = [
      {
        name: "First Name",
        completed: Boolean(user.firstName),
        suggestion: "Introduce yourself by sharing your first name.",
        link: "/profile/settings",
      },
      {
        name: "Last Name",
        completed: Boolean(user.lastName),
        suggestion: "Provide your last name to help others recognize you.",
        link: "/profile/settings",
      },
      {
        name: "Bio",
        completed: Boolean(user.bio),
        suggestion:
          "Enrich your profile with a brief biography so our community can get to know you.",
        link: "/profile/settings",
      },
      {
        name: "Avatar",
        completed: Boolean(user.avatar),
        suggestion: "Make a strong impression by uploading a profile picture.",
        link: "/profile/settings",
      },
      {
        name: "Email Verified",
        completed: Boolean(user.accountVerified),
        suggestion:
          "Enhance your account security by verifying your email address.",
        link: "/profile/settings",
      },
    ];

    const total = checks.length;

    const completed = checks.filter((check) => check.completed).length;
    const percentageCompletion = Math.round((completed / total) * 100);

    const arraySuggestions = checks.filter((check) => !check.completed);

    return { completion: percentageCompletion, suggestions: arraySuggestions };
  }, [user]);

  return { completion, suggestions };
};
