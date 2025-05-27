// REVIEWED

export const validateDateInRange = function validateDateInRange(
  value: Date | null | undefined,
  start: Date,
  end: Date,
  errorRequired: string,
  errorValid: string,
  errorRange: string,
) {
  if (!value) return errorRequired;

  const date = new Date(value);
  date.setUTCHours(0, 0, 0, 0);

  if (!(date instanceof Date) || Number.isNaN(date.getTime()))
    return errorValid;

  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(0, 0, 0, 0);

  if (date.getTime() < start.getTime() || date.getTime() > end.getTime())
    return errorRange;

  return true;
};
