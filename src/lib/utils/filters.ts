// REVIEWED - 01

import { FiltersOptions } from "../types";

export const filtersOptionsDefaults: FiltersOptions = {
  page: 1,
  limit: 50,
  sort: ["-", "created", "At"].join(""),
  search: "",
};
