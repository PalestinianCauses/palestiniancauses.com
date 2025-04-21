// REVIEWED

/* eslint-disable camelcase */

import * as migration_20250401_231101_02_04_2025 from "./20250401_231101_02_04_2025";
import * as migration_20250420_225253_remove_frappe_columns_and_update_status_enum from "./20250420_225253_remove_frappe_columns_and_update_status_enum";

export const migrations = [
  {
    up: migration_20250401_231101_02_04_2025.up,
    down: migration_20250401_231101_02_04_2025.down,
    name: "20250401_231101_02_04_2025",
  },
  {
    up: migration_20250420_225253_remove_frappe_columns_and_update_status_enum.up,
    down: migration_20250420_225253_remove_frappe_columns_and_update_status_enum.down,
    name: "20250420_225253_remove_frappe_columns_and_update_status_enum",
  },
];
