export function validateLength(value: string, field: string, min: number, max: number): boolean {
  const isValid = value.length >= min && value.length <= max;
  field = field[0].toUpperCase() + field.slice(1);
  if (!isValid) {
    throw new Error(`${field} must be between ${min} and ${max} characters`);
  }
  return isValid;
}