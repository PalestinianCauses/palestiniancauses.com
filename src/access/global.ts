// REVIEWED - 03

import { Access, FieldAccess } from "payload";

import {
  hasAnyPermission,
  hasEveryPermissions,
  hasPermission,
  hasRole,
} from "@/lib/permissions";
import { Permission } from "@/payload-types";

export const isAuthenticated: Access = function isAuthenticated({
  req: { user },
}) {
  return Boolean(user);
};

export const isAdmin: Access = function isAdmin({ req }) {
  return isAuthenticated({ req }) && hasRole(req.user, "admin");
};

export const isAdminOrSystemUser: Access = function isAdminOrSystemUser({
  req,
}) {
  return isAdmin({ req }) || hasRole(req.user, "system-user");
};

export const isAdminOrSelf: Access = function isAdminOrSelf({ req }) {
  return isAdmin({ req }) || { user: { equals: req.user?.id } };
};

export const isAdminOrSystemUserOrSelf: Access =
  function isAdminOrSystemUserOrSelf({ req }) {
    return isAdminOrSystemUser({ req }) || { user: { equals: req.user?.id } };
  };

export const isAdminField: FieldAccess = function isAdminField({ req }) {
  return isAuthenticated({ req }) && hasRole(req.user, "admin");
};

export const isAdminOrSystemUserField: FieldAccess =
  function isAdminOrSystemUserField({ req }) {
    return isAdminField({ req }) || hasRole(req.user, "system-user");
  };

export const hasPermissionAccess = (permission: Permission) => {
  const hasPermissionAccessCB: Access = async function hasPermissionAccessCB({
    req,
  }) {
    if (!isAuthenticated({ req })) return false;
    return hasPermission(req.user, permission);
  };

  return hasPermissionAccessCB;
};

export const hasAnyPermissionAccess = (permissions: Permission[]) => {
  const hasAnyPermissionAccessCB: Access =
    async function hasAnyPermissionAccessCB({ req }) {
      if (!isAuthenticated({ req })) return false;
      return hasAnyPermission(req.user, permissions);
    };

  return hasAnyPermissionAccessCB;
};

export const hasEveryPermissionsAccess = (permissions: Permission[]) => {
  const hasEveryPermissionsAccessCB: Access =
    async function hasEveryPermissionsAccessCB({ req }) {
      if (!isAuthenticated({ req })) return false;
      return hasEveryPermissions(req.user, permissions);
    };

  return hasEveryPermissionsAccessCB;
};

export const hasRoleAccess = (role: string) => {
  const hasRoleAccessCB: Access = function hasRoleAccessCB({ req }) {
    return isAuthenticated({ req }) && hasRole(req.user, role);
  };

  return hasRoleAccessCB;
};

export const hasAnyRoleAccess = (roles: string[]) => {
  const hasAnyRoleAccessCB: Access = function hasAnyRoleAccessCB({ req }) {
    return (
      isAuthenticated({ req }) && roles.some((role) => hasRole(req.user, role))
    );
  };

  return hasAnyRoleAccessCB;
};
