// REVIEWED - 04

import { getPayload } from "payload";

import configPromise from "@payload-config";

import { SelectOptions } from "../types";

export const payload = await getPayload({ config: configPromise });

export const selectOptionsDefaults: SelectOptions = {
  page: 1,
  limit: 50,
  sort: ["-", "created", "At"].join(""),
  search: "",
};
