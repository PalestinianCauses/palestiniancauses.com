// REVIEWED - 01
import { CollectionBeforeChangeHook } from "payload";

import { DiaryEntry } from "@/payload-types";

export const populateUser: CollectionBeforeChangeHook<DiaryEntry> =
  async function populateUser({ req, data, operation }) {
    if (req.user)
      if (operation === "create") return { ...data, author: req.user.id };

    return data;
  };
