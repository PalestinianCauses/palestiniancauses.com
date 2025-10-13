"use client";

// REVIEWED - 02
// NEEDS IMPROVEMENT

import {
  getHighestPriorityRole,
  getUserPermissions,
  hasAnyRole,
  hasPermission,
  hasRole,
} from "@/lib/permissions";
import { Permission, User } from "@/payload-types";

export const usePermissions = function usePermissions(user: User | null) {
  return {
    hasPermission: async (permission: Permission) =>
      hasPermission(user, permission),
    hasRole: (role: string) => hasRole(user, role),
    hasAnyRole: (roles: string[]) => hasAnyRole(user, roles),
    getHighestPriorityRole: () => getHighestPriorityRole(user),
    getUserPermissions: () => getUserPermissions(user),
  };
};
