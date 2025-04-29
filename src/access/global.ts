// REVIEWED - 01
import { Access, FieldAccess } from "payload";

export const isAuthenticated: Access = function isAuthenticated({
  req: { user },
}) {
  return Boolean(user);
};

export const isAdmin: Access = function isAdmin({ req }) {
  return isAuthenticated({ req }) && req.user?.role === "admin";
};

export const isAdminOrSystemUser: Access = function isAdminOrSystemUser({
  req,
}) {
  return isAdmin({ req }) || req.user?.role === "system-user";
};

export const isAdminOrSystemUserOrSelf: Access =
  function isAdminOrSystemUserOrSelf({ req }) {
    return isAdminOrSystemUser({ req }) || { user: { equals: req.user?.id } };
  };

export const isAdminField: FieldAccess = function isAdminField({ req }) {
  return isAuthenticated({ req }) && req.user?.role === "admin";
};

export const isAdminOrSystemUserField: FieldAccess =
  function isAdminOrSystemUserField({ req }) {
    return isAdminField({ req }) || req.user?.role === "system-user";
  };
