// REVIEWED
import { CollectionBeforeChangeHook } from "payload";

export const populateUser: CollectionBeforeChangeHook =
  async function populateUser({ req, data, operation }) {
    if (req.user)
      if (operation === "create") return { ...data, author: req.user.id };

    return data;
  };
