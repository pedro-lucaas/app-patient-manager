export function validateAlphabetCharacters(value: string): boolean {
  const isValid = /^[a-zA-Z]+$/.test(value);

  if (!isValid) {
    throw new Error('The field must contain only alphabet characters');
  }

  return isValid;
}