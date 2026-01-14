// REVIEWED - 03

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
    ["limit", 100].join("="),
    ["page", 1].join("="),
    ["sort", "-date"].join("="),
  ].join("&"),
].join("?");
