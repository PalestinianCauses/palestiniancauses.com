// REVIEWED
import { Access } from "payload";

import { isAdminOrSystemUser } from "./global";

export const isAdminOrSystemUserOrSelf: Access =
  function isAdminOrSystemUserOrSelf({ req }) {
    return isAdminOrSystemUser({ req }) || { id: { equals: req.user?.id } };
  };
