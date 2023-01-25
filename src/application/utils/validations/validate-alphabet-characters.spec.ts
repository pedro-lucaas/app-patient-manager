import { validateAlphabetCharacters } from "./validate-alphabet-characters";

describe('Validate Alphabet Characters', () => {
  it('should be test return true', () => {
    const value = 'test';
    const isValid = () => validateAlphabetCharacters(value);
    expect(isValid()).toBeTruthy();
  });

  it('should be test throw error', () => {
    const value = 'test123';
    const isValid = () => validateAlphabetCharacters(value);
    expect(isValid).toThrow();
  });
});