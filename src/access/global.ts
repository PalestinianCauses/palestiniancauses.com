// REVIEWED - 06

import { Access, FieldAccess } from "payload";

import {
  hasAnyPermission,
  hasAnyRole,
  hasEveryPermissions,
  hasPermission,
  hasRole,
} from "@/lib/permissions";
import { Permission } from "@/payload-types";

export const isSelf = function isSelf(field: string) {
  const isSelfCB: Access = function isSelfCB({ req }) {
    return { [field]: { equals: req.user?.id } };
  };

  return isSelfCB;
};

// Roles and Permissions Access
export const hasRoleAccess = (role: string) => {
  const hasRoleAccessCB: Access = function hasRoleAccessCB({ req }) {
    return hasRole(req.user, role);
  };

  return hasRoleAccessCB;
};

export const hasAnyRoleAccess = (roles: string[]) => {
  const hasAnyRoleAccessCB: Access = function hasAnyRoleAccessCB({ req }) {
    return hasAnyRole(req.user, roles);
  };

  return hasAnyRoleAccessCB;
};

export const hasRoleFieldAccess = (role: string) => {
  const hasRoleFieldAccessCB: FieldAccess = function hasRoleFieldAccessCB({
    req,
  }) {
    return hasRole(req.user, role);
  };

  return hasRoleFieldAccessCB;
};

export const hasAnyRoleFieldAccess = (roles: string[]) => {
  const hasAnyRoleFieldAccessCB: FieldAccess =
    function hasAnyRoleFieldAccessCB({ req }) {
      return hasAnyRole(req.user, roles);
    };

  return hasAnyRoleFieldAccessCB;
};

export const hasPermissionAccess = (
  permission: Omit<
    Permission,
    "id" | "name" | "description" | "createdAt" | "updatedAt"
  >,
) => {
  const hasPermissionAccessCB: Access = function hasPermissionAccessCB({
    req,
  }) {
    return hasPermission(req.user, permission);
  };

  return hasPermissionAccessCB;
};

export const hasAnyPermissionAccess = (permissions: Permission[]) => {
  const hasAnyPermissionAccessCB: Access =
    async function hasAnyPermissionAccessCB({ req }) {
      return hasAnyPermission(req.user, permissions);
    };

  return hasAnyPermissionAccessCB;
};

export const hasEveryPermissionsAccess = (permissions: Permission[]) => {
  const hasEveryPermissionsAccessCB: Access =
    async function hasEveryPermissionsAccessCB({ req }) {
      return hasEveryPermissions(req.user, permissions);
    };

  return hasEveryPermissionsAccessCB;
};

export const hasPermissionFieldAccess = (
  resource: Permission["resource"],
  action: Permission["action"],
) => {
  const hasPermissionFieldAccessCB: FieldAccess =
    function hasPermissionFieldAccessCB({ req }) {
      return hasPermission(req.user, { resource, action });
    };

  return hasPermissionFieldAccessCB;
};
