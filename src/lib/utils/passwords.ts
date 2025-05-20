// REVIEWED

export const isResilientPassword = function isResilientPassword(
  password: string,
  minimumLength = 8,
) {
  if (!password || typeof password !== "string") return false;

  if (password.length < minimumLength) return false;

  const hasLowerCase = /[a-z]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasCharacterSpecial = /[!@#$%^&*()_+\-=`]/.test(password);

  return hasLowerCase && hasUpperCase && hasDigit && hasCharacterSpecial;
};
