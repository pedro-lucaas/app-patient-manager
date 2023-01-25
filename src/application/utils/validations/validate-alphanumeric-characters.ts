export function validateAlphanumericCharacters(value: string): boolean {
  const isValid = /^[a-zA-Z0-9]+$/.test(value);

  if (!isValid) {
    throw new Error('The field must contain only alphanumeric characters');
  }

  return isValid;
}