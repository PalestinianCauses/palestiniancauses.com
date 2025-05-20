// REVIEWED

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
