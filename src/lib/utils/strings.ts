// REVIEWED - 01

export const ensureStartsWith = function ensureStartsWith(
  stringToCheck: string,
  startsWith: string,
) {
  return stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : [startsWith, stringToCheck].join("");
};

export const splitByFlexibleNewLines = function splitByFlexibleNewLines(
  string: string,
) {
  if (!string.trim()) return [];

  const separateRegex = /\s*\n+\s*/;
  const stringFiltered = string.split(separateRegex).filter(Boolean);
  return stringFiltered;
};

export const HumansButFromGazaPageLink = [
  "/humans-but-from-gaza",
  [
    ["limit", 50].join("="),
    ["page", 1].join("="),
    ["sort", "-date"].join("="),
  ].join("&"),
].join("?");
