// REVIEWED

/* eslint-disable camelcase */

import * as migration_20250401_231101 from "./20250401_231101";
import * as migration_20250420_225253 from "./20250420_225253";
import * as migration_20250427_213203 from "./20250427_213203";
import * as migration_20250429_025646 from "./20250429_025646";
import * as migration_20250429_123448 from "./20250429_123448";
import * as migration_20250508_183800 from "./20250508_183800";
import * as migration_20250527_013127 from "./20250527_013127";

export const migrations = [
  {
    up: migration_20250401_231101.up,
    down: migration_20250401_231101.down,
    name: "20250401_231101",
  },
  {
    up: migration_20250420_225253.up,
    down: migration_20250420_225253.down,
    name: "20250420_225253",
  },
  {
    up: migration_20250427_213203.up,
    down: migration_20250427_213203.down,
    name: "20250427_213203",
  },
  {
    up: migration_20250429_025646.up,
    down: migration_20250429_025646.down,
    name: "20250429_025646",
  },
  {
    up: migration_20250429_123448.up,
    down: migration_20250429_123448.down,
    name: "20250429_123448",
  },
  {
    up: migration_20250508_183800.up,
    down: migration_20250508_183800.down,
    name: "20250508_183800",
  },
  {
    up: migration_20250527_013127.up,
    down: migration_20250527_013127.down,
    name: "20250527_013127",
  },
];
