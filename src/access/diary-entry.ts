// REVIEWED
import { Access } from "payload";

import { isAdminOrSystemUser } from "./global";

export const isAdminOrSystemUserOrSelf: Access =
  function isAdminOrSystemUserOrSelf({ req }) {
    return isAdminOrSystemUser({ req }) || { author: { equals: req.user?.id } };
  };
