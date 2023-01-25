import { validateAlphanumericCharacters } from "./validate-alphanumeric-characters";

describe('Validate Alphanumeric Characters', () => {
  it('should be test return true', () => {
    const value = 'test123';
    const isValid = () => validateAlphanumericCharacters(value);
    expect(isValid()).toBeTruthy();
  });

  it('should be test throw error', () => {
    const value = 'test123!';
    const isValid = () => validateAlphanumericCharacters(value);
    expect(isValid).toThrow();
  });
});