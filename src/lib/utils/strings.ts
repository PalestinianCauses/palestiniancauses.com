// REVIEWED - 02

export const ensureStartsWith = function ensureStartsWith(
  stringToCheck: string,
  startsWith: string,
) {
  return stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : [startsWith, stringToCheck].join("");
};

export const HumansButFromGazaPageLink = [
  "/humans-but-from-gaza",
  [
    ["limit", 50].join("="),
    ["page", 1].join("="),
    ["sort", "-date"].join("="),
  ].join("&"),
].join("?");
