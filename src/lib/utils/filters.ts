// REVIEWED

import { SelectOptions } from "../types";

export const selectOptionsDefaults: SelectOptions = {
  page: 1,
  limit: 50,
  sort: ["-", "created", "At"].join(""),
  search: "",
};
