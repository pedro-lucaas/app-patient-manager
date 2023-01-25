import { validateLength } from "./validate-length";


describe('Validate Length', () => {
  it('should be test to throw error', () => {
    const value = 'test';
    const min = 4;
    const max = 10;
    const field = 'test';
    const isValid = () => validateLength(value, field, min, max)
    expect(isValid()).toBeTruthy();
  });

  it('should be test to throw error', () => {
    const value = 'test';
    const min = 5;
    const max = 10;
    const field = 'test';
    const isValid = () => validateLength(value, field, min, max)
    expect(isValid).toThrowError();
  });
});