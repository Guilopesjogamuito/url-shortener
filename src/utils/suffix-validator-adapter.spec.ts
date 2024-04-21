import { SuffixValidatorAdapter } from './suffix-validator-adapter';

describe('SuffixValidatorAdapter', () => {
  it('Should invalidate suffix', () => {
    const invalidSuffix = '';
    const sut = new SuffixValidatorAdapter();
    const valid = sut.isValid(invalidSuffix);
    expect(valid).toBe(false);
  });

  it('Should validate suffix', () => {
    const validSuffix = 'aBcDe';
    const sut = new SuffixValidatorAdapter();
    const valid = sut.isValid(validSuffix);
    expect(valid).toBe(true);
  });
});
