import { SuffixValidatorAdapter } from './suffix-validator-adapter';

describe('SuffixValidatorAdapter', () => {
  it('Should invalidate suffix', () => {
    const invalidSuffix = '';
    const sut = new SuffixValidatorAdapter();
    const valid = sut.isValid(invalidSuffix);
    expect(valid).toBe(false);
  });
});
