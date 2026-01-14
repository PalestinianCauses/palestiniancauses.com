// REVIEWED - 05

import { Permission, Role, User } from "@/payload-types";

import { isConditionsObject, isDefined, isObject } from "./types/guards";

export const hasConditions = function hasConditions(
  permissionConditions: Permission["conditions"],
  requestConditions: Permission["conditions"],
): boolean {
  if (!isDefined(permissionConditions) || !isDefined(requestConditions))
    return true;

  if (
    !isConditionsObject(permissionConditions) ||
    !isConditionsObject(requestConditions)
  )
    return true;

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(permissionConditions))
    if (!(key in requestConditions) || requestConditions[key] !== value)
      return false;

  return true;
};

export const hasPermission = function hasPermission(
  user: User | null,
  permission: Omit<
    Permission,
    "id" | "name" | "description" | "createdAt" | "updatedAt"
  >,
): boolean {
  if (!user || !user.roles || user.roles.length === 0) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const role of user.roles) {
    if (isObject(role)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const permissionUser of role.permissions) {
        if (
          isObject(permissionUser) &&
          permissionUser.resource === permission.resource &&
          permissionUser.action === permission.action
        ) {
          if (permissionUser.conditions && permission.conditions) {
            const hasCondition = hasConditions(
              permissionUser.conditions,
              permission.conditions,
            );

            // eslint-disable-next-line no-continue
            if (!hasCondition) continue;
          }

          return true;
        }
      }
    }
  }

  return false;
};

export const hasAnyPermission = async function hasAnyPermission(
  user: User | null,
  permissions: Permission[],
): Promise<boolean> {
  if (!user || !user.roles || user.roles.length === 0) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const permission of permissions)
    if (
      // eslint-disable-next-line no-await-in-loop
      await hasPermission(user, permission)
    )
      return true;

  return false;
};

export const hasEveryPermissions = async function hasEveryPermissions(
  user: User | null,
  permissions: Permission[],
): Promise<boolean> {
  if (!user || !user.roles || user.roles.length === 0) return false;

  // eslint-disable-next-line no-restricted-syntax
  for (const permission of permissions)
    if (
      // eslint-disable-next-line no-await-in-loop
      !(await hasPermission(user, permission))
    )
      return false;

  return true;
};

export const hasRole = function hasRole(
  user: User | null,
  role: string,
): boolean {
  if (!user || !user.roles || user.roles.length === 0) return false;
  return user.roles.some((r) => isObject(r) && r.name === role);
};

export const hasAnyRole = function hasAnyRole(
  user: User | null,
  roles: string[],
): boolean {
  if (!user || !user.roles || user.roles.length === 0) return false;
  return user.roles.some((role) => isObject(role) && roles.includes(role.name));
};

export const getHighestPriorityRole = function getHighestPriorityRole(
  user: User | null,
): Role | null {
  if (!user || !user.roles || user.roles.length === 0) return null;

  let highestPriorityRole: Role | null = null;

  // eslint-disable-next-line no-restricted-syntax
  for (const role of user.roles)
    if (
      isObject(role) &&
      isDefined(role.priority) &&
      (highestPriorityRole === null ||
        (isDefined(highestPriorityRole.priority) &&
          role.priority > highestPriorityRole.priority))
    )
      highestPriorityRole = role;

  return highestPriorityRole;
};
