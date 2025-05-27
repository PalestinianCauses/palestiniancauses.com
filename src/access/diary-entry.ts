// REVIEWED - 01
import { Access } from "payload";

import { isAdminOrSystemUser } from "./global";

export const isAdminOrSystemUserOrSelf: Access =
  function isAdminOrSystemUserOrSelf({ req }) {
    return isAdminOrSystemUser({ req }) || { author: { equals: req.user?.id } };
  };

export const isAdminOrSystemUserOrSelfOrPublished: Access =
  function isAdminOrSystemUserOrSelfOrPublished({ req }) {
    return (
      isAdminOrSystemUserOrSelf({ req }) || { status: { equals: "approved" } }
    );
  };
